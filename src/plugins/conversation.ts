import { Composer } from "grammy";
import {
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import type { MyBotContext } from "../types";
import dialogs from "../dialogs";

export const composer = new Composer<MyBotContext>();
composer.use(conversations());
composer.use(createConversation(dialogs.dailyReportSubscription, "daily_report_subscription"));
composer.command("start", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("daily_report_subscription");
});

