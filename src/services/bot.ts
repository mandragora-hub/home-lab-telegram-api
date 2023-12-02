import { Bot, GrammyError, HttpError } from "grammy";
import plugins from "../plugins";
import commands from "../commands";
import { MyBotContext } from "../types";

//Create a new bot
const bot = new Bot<MyBotContext>(process.env.BOT_TOKEN);

bot.use(plugins.installSession);
bot.use(plugins.installConversation);

bot.use(commands.register);
bot.use(commands.utils);

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
