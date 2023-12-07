import { Composer } from "grammy";
import { MyBotContext } from "../types";
import process from "process";
import { createTemplate } from "../lib";

export const composer = new Composer<MyBotContext>();

composer.command("start", async (ctx) => {
  const message = await createTemplate("welcome-message", null);
  await ctx.reply(message, { parse_mode: "MarkdownV2" });
});

composer.command("help", async (ctx) => {
  const message = await createTemplate("help", null);
  await ctx.reply(message, {
    parse_mode: "MarkdownV2",
  });
});

composer.command("status", async (ctx) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  const response = await createTemplate("healthcheck", healthcheck);

  await ctx.reply(response, {
    parse_mode: "MarkdownV2",
  });
});

composer.hears("ping", async (ctx) => {
  // `reply` is an alias for `sendMessage` in the same chat (see next section).
  await ctx.reply("pong", {
    // `reply_to_message_id` specifies the actual reply feature.
    reply_to_message_id: ctx.msg.message_id,
  });
});

// composer.on("message", async (ctx) => {
//   //Print to console
//   console.log(
//     `${ctx.from.first_name} wrote ${
//       "text" in ctx.message ? ctx.message.text : ""
//     }`
//   );

//   if (ctx.message.text) {
//     //Scream the message
//     await ctx.reply(ctx.message.text.toUpperCase(), {
//       entities: ctx.message.entities,
//     });
//   } else {
//     //This is equivalent to forwarding, without the sender's name
//     await ctx.copyMessage(ctx.message.chat.id);
//   }
// });
