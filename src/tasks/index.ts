import db from "../db/models";
import bot from "../services/bot";

async function dailyReportServices() {
  const users = await db.users.findAll();
  for (const user of users) {
    bot.api.sendMessage(user.chatId, "asd");
  }
}

export default { dailyReportServices };
