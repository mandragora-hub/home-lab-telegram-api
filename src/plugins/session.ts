import { Composer, session } from "grammy";
import { freeStorage } from "@grammyjs/storage-free";
import { MyBotContext, SessionData } from "../types";

const composer = new Composer<MyBotContext>();

composer.use(
  session({
    initial: () => ({ pizzaCount: 0 }),
    storage: freeStorage<SessionData>(process.env.BOT_TOKEN),
  })
);

composer.command("hunger", async (ctx) => {
  const count = ctx.session.pizzaCount;
  await ctx.reply(`Your hunger level is ${count}!`);
});

composer.command("reset", async (ctx) => {
  ctx.session.pizzaCount = 0;
});

composer.hears(/.*🍕.*/, (ctx) => ctx.session.pizzaCount++);

export { composer };
