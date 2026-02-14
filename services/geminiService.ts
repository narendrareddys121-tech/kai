
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
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `${prompt}. Studio lighting, high quality, commercial photography, clean aesthetic, depth of field.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Generation Error:", error);
  }
  return undefined;
}

export async function analyzeProductLabel(ocrText: string): Promise<ProductAnalysis> {
  const model = 'gemini-3-flash-preview';
  
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
    
    You MUST return the response in the specified JSON format.
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
