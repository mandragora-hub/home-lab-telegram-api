import type { MyBotContext, MyBotConversation } from "../types";

export async function changeUsername(
  conversation: MyBotConversation,
  ctx: MyBotContext
) {
  await ctx.reply("Hi there! What is your name?");
  const {
    msg: { text },
  } = await conversation.waitFor("message:text");
  await ctx.reply(`Welcome to the chat, ${text}!`);
}
