import { Composer, InlineKeyboard } from "grammy";
import { MyBotContext } from "../types";

export const composer = new Composer<MyBotContext>();

// const setNameButton = "set_name";
// const cancelButton = "cancel";

// const menuMarkup = new InlineKeyboard()
//   .text("Cancel", cancelButton)
//   .text("Change you username", setNameButton);

// composer.callbackQuery(setNameButton, async (ctx) => {
//   await ctx.conversation.enter("change_username");
// });

// composer.command("setting", async (ctx) => {
//   await ctx.reply("Setting", {
//     reply_markup: menuMarkup,
//   });
// });


composer.command("setname", async (ctx) => {
  await ctx.conversation.enter("change_username");
});
