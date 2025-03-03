import Groq from "groq-sdk";
import type { AiCardResponse, FilterType, MagicCard } from "../types/commander";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getGroqChatResponse(
  commander: MagicCard,
  filter?: FilterType
): Promise<AiCardResponse[] | null> {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Can you recommand magic the gathering card for my commander? My commander is ${
          commander.name
        }, oracle text is: ${commander.oracle_text}, colors are/is ${
          commander.colors
        }. Please provide the response in the following JSON format: List<Card> list = [{"name": 21, "explanation": "Explanation of why you use this card" }], not a another single word, 15 card, recommended cards colors must be: ${
          filter?.cardColor || commander.colors
        } and can be colorless but not the other colors. Explanation is must be about card text. ${
          filter?.cardType
            ? `Card type must be ${filter.cardType}, cannot be other card types.`
            : ""
        }. ${
          filter?.cardAggresive
            ? `Aggresive type must be ${filter.cardAggresive}, cannot be other aggresive types.`
            : ""
        }`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  const rawData = response.choices[0].message.content;
  if (!rawData) return null;
  return JSON.parse(rawData) as AiCardResponse[];
}
