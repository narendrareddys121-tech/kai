/**
 * Gemini AI Service - Advanced Product Label Analysis
 * 
 * This service uses Google's latest Gemini AI models for sophisticated product analysis:
 * - Text Analysis: gemini-2.0-flash-exp (Latest experimental flash model with enhanced reasoning)
 * - Image Generation: imagen-3.0-generate-001 (Latest Imagen model for high-quality visuals)
 * - Fallback: gemini-2.0-flash-exp for image generation if Imagen is unavailable
 * 
 * Features:
 * - Comprehensive ingredient analysis with scientific context
 * - Advanced scoring algorithm (0-100 scale)
 * - Professional product image generation
 * - Enhanced error handling and fallback mechanisms
 * 
 * @version 2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Image generation prompt enhancement for professional quality
const IMAGE_PROMPT_SUFFIX = "Professional studio photography, ultra-high quality, commercial product shot, clean modern aesthetic, perfect lighting, depth of field, 8K resolution.";
const IMAGE_FALLBACK_PROMPT_SUFFIX = "Studio lighting, commercial photography.";

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
    // Using the latest Imagen 3.0 model for advanced image generation
    const response = await ai.models.generateContent({
      model: 'imagen-3.0-generate-001',
      contents: {
        parts: [{ text: `${prompt}. ${IMAGE_PROMPT_SUFFIX}` }],
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
    // Fallback: Try with gemini-2.0-flash-exp if Imagen fails
    try {
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: {
          parts: [{ text: `Generate an image: ${prompt}. ${IMAGE_FALLBACK_PROMPT_SUFFIX}` }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });
      
      for (const part of fallbackResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    } catch (fallbackError) {
      console.error("Fallback Image Generation Error:", fallbackError);
    }
  }
  return undefined;
}

export async function analyzeProductLabel(ocrText: string): Promise<ProductAnalysis> {
  // Using the latest advanced Gemini 2.0 Flash model for superior analysis
  const model = 'gemini-2.0-flash-exp';
  
  const systemInstruction = `
    You are an advanced Cognitive Product Analysis Engine inside kai v2.0, a next-generation consumer intelligence application powered by state-of-the-art AI.
    Your purpose is to transform raw product label text into comprehensive, clear, practical, and decision-friendly insights with scientific accuracy.

    PERSONALITY & TONE:
    - Sound like a highly intelligent, analytical, yet friendly expert assistant.
    - Be concise, confident, evidence-based, and neutral.
    - Never be alarmist or overly technical - balance sophistication with accessibility.
    - Use language understandable by educated non-experts.
    - Provide context and reasoning for your assessments.
    - Do NOT provide medical or clinical advice - focus on informed awareness.
    - Do NOT fabricate brand-specific claims or unverified information.
    - Acknowledge uncertainty when data is ambiguous or insufficient.
    - Use precise terminology when discussing chemical compounds and ingredients.

    ENHANCED ANALYSIS FRAMEWORK:
    - Accurately determine product type, category, and subcategory with confidence levels.
    - Identify ALL components and their roles: preservatives, emulsifiers, stabilizers, colorants, flavors, nutrients, etc.
    - Highlight specific benefits with scientific context (e.g., antioxidant properties, nutritional value).
    - Explain tradeoffs with nuance (e.g., shelf-life vs. processing, taste vs. additives).
    - Provide detailed functional roles for ALL significant ingredients with their chemical or biological purpose.
    - Assess overall formulation quality considering: ingredient complexity, processing level, nutritional density, additive load.
    - Flag awareness items: allergens, controversial additives, high sugar/sodium/fat, artificial components, GMO indicators.
    - Offer balanced, practical usage perspectives considering lifestyle contexts.
    - Calculate a comprehensive intelligence score (0-100) considering: ingredient quality (40%), nutritional profile (30%), processing level (20%), transparency (10%).
    - CREATE a vivid, detailed visual prompt for professional product photography that captures the essence of the product category.
    - Provide proactive, actionable suggestions for consumers (alternatives, usage tips, pairing ideas).
    
    SCORING RUBRIC:
    - 90-100: Exceptional - minimal processing, whole ingredients, excellent nutrition
    - 75-89: Very Good - quality ingredients, balanced formulation, some processing
    - 60-74: Moderate - standard ingredients, notable additives, moderate nutrition
    - 40-59: Concerning - heavy processing, multiple additives, poor nutritional value
    - 0-39: Poor - highly processed, extensive additives, minimal nutritional benefit
    
    You MUST return the response in the specified JSON format with all required fields populated thoughtfully.
  `;

  try {
    // Step 1: Advanced Textual Analysis with Gemini 2.0
    const textResponse = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: `ANALYZE THIS PRODUCT LABEL:\n\n"""\n${ocrText}\n"""\n\nProvide comprehensive, scientifically-grounded analysis with detailed ingredient breakdown, quality assessment, and actionable consumer insights.` }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        temperature: 0.2, // Slightly higher for more nuanced analysis
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192, // Increased for more detailed responses
      }
    });

    if (!textResponse.text) {
      throw new Error("No analysis generated.");
    }

    const analysis = JSON.parse(textResponse.text) as ProductAnalysis;

    // Step 2: Advanced Visual Generation
    if (analysis.visualPrompt) {
      const imageUrl = await generateProductImage(analysis.visualPrompt);
      if (imageUrl) {
        analysis.generatedImageUrl = imageUrl;
      }
    }

    return analysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Enhanced error handling with specific messages
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('models/gemini-2.0-flash-exp')) {
      throw new Error("Model temporarily unavailable. The advanced AI model is currently being updated. Please try again in a moment.");
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      throw new Error("API quota exceeded. Please wait a few moments before trying again.");
    }
    
    if (errorMessage.includes('401') || errorMessage.includes('403')) {
      throw new Error("Authentication failed. Please check your API key configuration.");
    }
    
    throw new Error(errorMessage || "Failed to analyze product label. Please try again.");
  }
}
