import { Composer, InlineKeyboard } from "grammy";
import { MyBotContext } from "../types";
import { createHtmlTemplate } from "../lib";

export const composer = new Composer<MyBotContext>();

// Pre-assign menu text
const dailyReportSubscriptionButton = "daily_report_subscription";
const cancelButton = "cancel";

composer.command("register", async (ctx) => {
  const markupMenu = await createHtmlTemplate("subscription-menu", null);
  await ctx.reply(markupMenu, {
    parse_mode: "HTML",
    reply_markup: firstMenuMarkup,
  });
});

//Build keyboards
const firstMenuMarkup = new InlineKeyboard()
  .text("Cancel", cancelButton)
  .text("Daily Report Subscription", dailyReportSubscriptionButton);
composer.callbackQuery(dailyReportSubscriptionButton, async (ctx) => {
  await ctx.conversation.enter("daily_report_subscription");
});
