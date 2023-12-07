import db from "../db/models";
import { createHtmlTemplate, getQuote } from "../lib";
import bot from "../services/bot";

async function dailyReportServices() {
  const quote = await getQuote();
  const users = await db.users.findAll();
  for (const user of users) {
    const view = { name: user.name, quote: quote };
    const message = await createHtmlTemplate("daily-report", view);
    await bot.api.sendMessage(user.chatId, message, {
      parse_mode: "HTML",
    });
  }
}

export default { dailyReportServices };
