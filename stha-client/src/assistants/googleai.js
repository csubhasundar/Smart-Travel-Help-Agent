import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    const gemini = googleai.getGenerativeModel({ model });

    // Add system instruction so Gemini knows the limits
    this.#chat = gemini.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are a travel assistant. 
You must only respond to questions related to travel, location details, famous travel recommendations, nearby place to visit, trip planning, food & restaurants, and weather. 
If the user asks about anything else, politely respond: 
"I can only answer travel, famous places, trip, food, and weather related quaries."`
            }
          ]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will follow the given restrictions." }]
        }
      ]
    });
  }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      throw error;
    }
  }

  async *chatStream(content) {
    try {
      const streamResult = await this.#chat.sendMessageStream(content);

      for await (const chunk of streamResult.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          yield chunkText;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
