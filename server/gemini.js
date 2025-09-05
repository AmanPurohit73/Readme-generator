import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateSection(prompt) {
  try {
    const result = await model.generateContent(prompt);
    // console.log("Gemini response:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate content.";
  }
}
