import fs from "fs/promises";
import path from "path";
import process from "process";
import Mustache from "mustache";
import { HtmlRenderer, Parser } from "commonmark";
import { QuoteType } from "./types";

export const createTemplate = async (name: string, view: any | undefined) => {
  const buffer = await fs.readFile(
    path.join(process.cwd(), `./templates/${name}.md`)
  );
  const template = buffer.toString();
  const res = Mustache.render(template, view);

  // clean up the template by adding the escape char
  // https://core.telegram.org/bots/api#markdownv2-style
  const result = res.replace(/[!.-]/g, "\\$&")
  return result;
};


export const createHtmlTemplate = async (
  name: string,
  view: any | undefined
) => {
  const template = await createTemplate(name, view);
  const reader = new Parser();
  const writer = new HtmlRenderer();
  const parsed = reader.parse(template);
  const result = writer.render(parsed);
  return escapeHTML(result);
};

function escapeHTML(str: string) {
  const initialTag = new RegExp("<p>", "g");
  const endTag = new RegExp("</p>", "g");
  return str.replace(initialTag, "").replace(endTag, "");
}

export async function getQuote(): Promise<QuoteType> {
  const category = "happiness";
  const Url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  const response = await fetch(Url, {
    headers: {
      "X-Api-Key": process.env.API_NINJA_TOKEN,
    },
  });
  const result = await response.json();

  return result[0];

  // function (error, response, body) {
  //   if (error) return console.error("Request failed:", error);
  //   else if (response.statusCode != 200)
  //     return console.error(
  //       "Error:",
  //       response.statusCode,
  //       body.toString("utf8")
  //     );
  //   else console.log(body);
  // }
}
