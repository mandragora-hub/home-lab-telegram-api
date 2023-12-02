import { Bot, GrammyError, HttpError, InlineKeyboard } from "grammy";
import plugins from "../plugins";
import commands from "../commands";
import { MyBotContext } from "../types";

//Create a new bot
const bot = new Bot<MyBotContext>(process.env.BOT_TOKEN);

bot.use(plugins.installSession);
bot.use(plugins.installConversation);

bot.use(commands.utils)

let chatId: string | number = "";
bot.command('register', async (ctx) => {
  const chat   =await ctx.getChat();
  chatId = chat.id;
});




//Pre-assign menu text
// const firstMenu = "<b>Menu 1</b>En\nA beautiful menu with a shiny inline button.";
// const secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

//Pre-assign button text
// const nextButton = "Next";
// const backButton = "Back";
// const tutorialButton = "Tutorial";

//Build keyboards
// const firstMenuMarkup = new InlineKeyboard().text(nextButton, backButton);

// const secondMenuMarkup = new InlineKeyboard().text(backButton, backButton).text(tutorialButton, "https://core.telegram.org/bots/tutorial");

//This handler sends a menu with the inline buttons we pre-assigned above
// bot.command("menu", async (ctx) => {
//   await ctx.reply(firstMenu, {
//     parse_mode: "HTML",
//     reply_markup: firstMenuMarkup,
//   });
// });

// //This handler processes back button on the menu
// bot.callbackQuery(backButton, async (ctx) => {
//   //Update message content with corresponding menu section
//   await ctx.editMessageText(firstMenu, {
//     reply_markup: firstMenuMarkup,
//     parse_mode: "HTML",
//    });
//  });

// //This handler processes next button on the menu
// bot.callbackQuery(nextButton, async (ctx) => {
//   //Update message content with corresponding menu section
//   await ctx.editMessageText(secondMenu, {
//     reply_markup: secondMenuMarkup,
//     parse_mode: "HTML",
//    });
//  });

// Set bot commands suggestions
bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "menu", description: "display a list of available commands." },
  { command: "clear", description: "Clear chat." },
  { command: "help", description: "Show help text" },
]);

// Error handler
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// bot.catch((err) => console.error(err));

export default bot;