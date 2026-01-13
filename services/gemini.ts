
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
// MUST use named parameter { apiKey: process.env.API_KEY }.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to Gemini and returns a first aid professional response.
 * Uses 'gemini-3-flash-preview' as recommended for basic Q&A tasks.
 */
export const getGeminiAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "אתה עוזר עזרה ראשונה מקצועי, מהיר ומדויק. ספק הנחיות בעברית בלבד. תמיד תזכיר למשתמש להתקשר ל-101 במקרה של מצב חירום מסכן חיים. היה תמציתי וברור.",
      },
    });

    // Extract text from the response object directly as per guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("נכשלה קבלת תשובה מהבינה המלאכותית.");
  }
};
