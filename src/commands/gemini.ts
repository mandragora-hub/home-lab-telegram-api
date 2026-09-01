import { Composer } from "grammy";
import { MyBotContext } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const composer = new Composer<MyBotContext>();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_TOKEN);

async function run(prompt: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "Hello, I'm a telegram bot called Redania.",
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

composer.on("message", async (ctx) => {
  //Print to console
  // console.log(
  //   `${ctx.from.first_name} wrote ${
  //     "text" in ctx.message ? ctx.message.text : ""
  //   }`
  // );

  if (ctx.message.text) {
    const message = await run(ctx.message.text);
    await ctx.reply(message, {
      entities: ctx.message.entities,
    });
  } else {
    //This is equivalent to forwarding, without the sender's name
    await ctx.copyMessage(ctx.message.chat.id);
  }
});
