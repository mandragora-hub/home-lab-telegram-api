import fs from "fs/promises";
import path from "path";
import process from "process";
import Mustache from "mustache";
import { HtmlRenderer, Parser } from "commonmark";

export const createTemplate = async (name: string, view: any | undefined) => {
  const buffer = await fs.readFile(
    path.join(process.cwd(), `./templates/${name}.md`)
  );
  const template = buffer.toString();
  const res = Mustache.render(template, view);
  return res;
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
