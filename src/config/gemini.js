
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [], // Keeps track of the conversation (empty for now)
    });

    try {
        const result = await chatSession.sendMessage(prompt);
        console.log("AI Response:", result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Error with Gemini API:", error);
    }
}

  
  export default runChat;