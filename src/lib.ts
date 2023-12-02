import fs from "fs/promises";
import path from "path";
import process from "process";
import Mustache from "mustache";

export const createTemplate = async (name: string, view: any) => {
  const buffer = await fs.readFile(
    path.join(process.cwd(), `./templates/${name}.md`)
  );
  const template = buffer.toString();
  const res = Mustache.render(template, view);
  return res;
};
