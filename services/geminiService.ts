import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from "../types";

// Ensure API Key is available
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is missing from process.env.API_KEY");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

/**
 * Generates a structured Calculus lesson for a given topic.
 */
export const generateLessonContent = async (topicTitle: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert Calculus 1A professor. 
      Create a concise but comprehensive lesson for the topic: "${topicTitle}".
      
      Structure the response using Markdown:
      1. **Concept Definition**: Clear explanation of the concept.
      2. **Formulas/Theorems**: Key mathematical formulas. Use unicode math or clear text representation (e.g. d/dx) as LaTeX is not available.
      3. **Step-by-Step Example**: A standard problem solved step-by-step.
      4. **Common Mistakes**: One or two pitfalls to avoid.
      
      Keep the tone encouraging and academic.
    `;

    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and precise Math Tutor.",
        temperature: 0.3, // Lower temperature for more factual math content
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate lesson content. Please check your API key or try again.");
  }
};

/**
 * Generates a practice problem for the topic.
 */
export const generatePracticeProblem = async (topicTitle: string): Promise<string> => {
  try {
    const prompt = `
      Generate a single practice problem for Calculus topic: "${topicTitle}".
      Provide the problem statement first, followed by a hidden "Solution" section that is collapsible or clearly separated (use a horizontal rule '---' before the solution).
    `;

    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: prompt,
    });

    return response.text || "No problem generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

/**
 * Generates natural-sounding speech from text using Gemini 2.5 Flash TTS.
 * Returns raw PCM audio data as a base64 string.
 */
export const generateSpeech = async (text: string): Promise<string> => {
  try {
    // We prepend a style instruction to the text to guide the tone, 
    // though the primary voice characteristic comes from the voiceConfig.
    // 'Kore' is generally a warm, clear voice.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: { parts: [{ text: text }] },
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Enceladus' },
          },
        },
      },
    });

    // Extract the raw audio bytes (base64 encoded PCM)
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data returned from Gemini.");
    }

    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS API Error:", error);
    throw error;
  }
};