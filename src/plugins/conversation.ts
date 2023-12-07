import { Composer } from "grammy";
import {
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import type { MyBotContext } from "../types";
import dialogs from "../dialogs";

export const composer = new Composer<MyBotContext>();
composer.use(conversations());
composer.use(createConversation(dialogs.changeUsername, "change_username"));

