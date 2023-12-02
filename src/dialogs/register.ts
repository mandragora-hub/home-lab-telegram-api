import type { MyBotContext, MyBotConversation } from "../types";
import db from "../db/models";

export async function dailyReportSubscription(
  conversation: MyBotConversation,
  ctx: MyBotContext
) {
  await ctx.reply("Hi there! What is your name?");
  const {
    msg: { text },
  } = await conversation.waitFor("message:text");

  await conversation.external(async () => {
    db.users
      .create({
        name: text,
        chatId: ctx.chat!.id,
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  await ctx.reply(`Welcome to the chat, ${text}!`);
}

