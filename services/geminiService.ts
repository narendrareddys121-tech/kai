
import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    productIdentity: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING },
        confidence: { type: Type.STRING },
        elements: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['category', 'confidence', 'elements']
    },
    positiveAttributes: { type: Type.ARRAY, items: { type: Type.STRING } },
    tradeoffs: { type: Type.ARRAY, items: { type: Type.STRING } },
    functionalIngredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          ingredient: { type: Type.STRING },
          purpose: { type: Type.STRING }
        },
        required: ['ingredient', 'purpose']
      }
    },
    qualitySignals: { type: Type.STRING },
    awarenessFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
    smartUsage: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    score: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.NUMBER },
        interpretation: { type: Type.STRING }
      },
      required: ['value', 'interpretation']
    },
    proactiveSuggestion: { type: Type.STRING },
    visualPrompt: { 
      type: Type.STRING, 
      description: "A professional photography prompt to generate an image of this product. E.g., 'A professional studio shot of a cold organic green tea bottle with fresh mint leaves, minimalist background'." 
    },
    // Enhanced fields
    allergens: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          severity: { type: Type.STRING },
          details: { type: Type.STRING }
        },
        required: ['name', 'severity', 'details']
      },
      description: "List of detected allergens with severity (Confirmed/Possible/Trace)"
    },
    dietaryCompatibility: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          diet: { type: Type.STRING },
          compatible: { type: Type.BOOLEAN },
          reason: { type: Type.STRING }
        },
        required: ['diet', 'compatible', 'reason']
      },
      description: "Compatibility with various dietary restrictions"
    },
    nutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.STRING },
        protein: { type: Type.STRING },
        carbs: { type: Type.STRING },
        fat: { type: Type.STRING },
        fiber: { type: Type.STRING },
        sugar: { type: Type.STRING },
        sodium: { type: Type.STRING }
      },
      description: "Nutritional breakdown if available in label"
    },
    healthRisk: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        level: { type: Type.STRING },
        factors: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['score', 'level', 'factors'],
      description: "Health risk assessment (score 1-100, level: Low/Moderate/High/Critical)"
    },
    environmentalImpact: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        level: { type: Type.STRING },
        factors: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['score', 'level', 'factors'],
      description: "Environmental impact assessment (score 1-100, level: Excellent/Good/Moderate/Poor)"
    },
    alternatives: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "AI-generated healthier or better alternatives"
    },
    comparisonData: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING },
        benchmark: { type: Type.STRING },
        vsAverage: { type: Type.STRING }
      },
      description: "Comparison against typical products in category"
    }
  },
  required: [
    'productIdentity', 'positiveAttributes', 'tradeoffs', 
    'functionalIngredients', 'qualitySignals', 'awarenessFlags', 
    'smartUsage', 'executiveSummary', 'score', 'proactiveSuggestion', 'visualPrompt'
  ]
};

async function generateProductImage(prompt: string): Promise<string | undefined> {
  try {
    // Use Imagen model for image generation
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: `${prompt}. Studio lighting, high quality, commercial photography, clean aesthetic, depth of field.`,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        includeRaiReason: false,
      }
    });

    // Extract base64 image from response
    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (imageBytes) {
      return `data:image/png;base64,${imageBytes}`;
    }
  } catch (error) {
    console.error("Image Generation Error:", error);
  }
  return undefined;
}

export async function analyzeProductLabel(ocrText: string): Promise<ProductAnalysis> {
  const model = 'gemini-2.0-flash-exp';
  
  const systemInstruction = `
    You are a Cognitive Product Analysis Engine inside a next-generation consumer intelligence app.
    Your purpose is to transform raw product label text into clear, practical, and decision-friendly insights.

    PERSONALITY & TONE:
    - Sound like a highly intelligent but friendly assistant.
    - Be concise, confident, and neutral.
    - Never be alarmist or overly technical.
    - Use language understandable by non-experts.
    - Do NOT provide medical or clinical advice.
    - Do NOT fabricate brand-specific claims.
    - Acknowledge uncertainty when needed.

    ANALYSIS FRAMEWORK:
    Interpret the text using consumer-awareness reasoning:
    • What type of product is this likely to be?
    • Which components meaningfully influence quality, safety, or usage?
    • What benefits might users expect?
    • What tradeoffs or concerns exist?
    • Why are these ingredients commonly used?
    • Does the formulation appear simple, complex, processed, natural, etc.?
    • Are there any caution-worthy signals?
    • Provide safe usage or consumption perspective.
    • CREATE a visual prompt for an image generation model to represent this product visually.
    
    ENHANCED ANALYSIS (if applicable):
    • ALLERGEN DETECTION: Identify common allergens (gluten, dairy, nuts, soy, shellfish, eggs, etc.) 
      with severity levels (Confirmed/Possible/Trace) based on ingredient list
    • DIETARY COMPATIBILITY: Assess compatibility with major diets (Vegan, Vegetarian, Keto, Paleo, 
      Halal, Kosher, Gluten-Free, etc.) with reasoning
    • NUTRITIONAL BREAKDOWN: If nutrition info is present, parse and structure it clearly
    • HEALTH RISK SCORE: Provide a 1-100 risk assessment considering processed ingredients, 
      additives, sugar content, etc. (Low/Moderate/High/Critical)
    • INGREDIENT TOXICITY: Flag potentially harmful additives with research-backed concerns
    • ENVIRONMENTAL IMPACT: Assess sustainability/eco-friendliness (1-100 score with 
      Excellent/Good/Moderate/Poor level)
    • ALTERNATIVE SUGGESTIONS: Suggest 2-3 healthier or better alternatives if concerns exist
    • COMPARISON DATA: Provide brief category benchmarks (e.g., "vs typical sodas")
    
    You MUST return the response in the specified JSON format with all available fields.
  `;

  try {
    // Step 1: Textual Analysis
    const textResponse = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: `INPUT (OCR TEXT):\n"""\n${ocrText}\n"""` }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        temperature: 0.1,
      }
    });

    if (!textResponse.text) {
      throw new Error("No analysis generated.");
    }

    const analysis = JSON.parse(textResponse.text) as ProductAnalysis;

    // Step 2: Visual Generation
    if (analysis.visualPrompt) {
      const imageUrl = await generateProductImage(analysis.visualPrompt);
      if (imageUrl) {
        analysis.generatedImageUrl = imageUrl;
      }
    }

    return analysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to analyze product label.");
  }
}
