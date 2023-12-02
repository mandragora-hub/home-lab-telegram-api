import { Composer } from "grammy";
import { MyBotContext } from "../types";

export const composer = new Composer<MyBotContext>();

composer.command("status", async (ctx) => {
  const health = {
    uptime: process.uptime().toString().replace('.', '\\.'),
    message: "OK",
    timestamp: Date.now(),
  };

  const response = 
    `*Uptime:* ${health.uptime}\n*Message:* ${health.message}\n*Timestamp:* ${health.timestamp}`.trim();

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