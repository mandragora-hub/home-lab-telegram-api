import { Context, SessionFlavor } from "grammy";
import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";

// Define the shape of our session.
export interface SessionData {
  pizzaCount: number;
}

// Flavor the context type to include sessions.
export type MyBotContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor;

export type MyBotConversation = Conversation<MyBotContext>;

export type QuoteType = {
  quote: string;
  author: string;
  category: string;
};
