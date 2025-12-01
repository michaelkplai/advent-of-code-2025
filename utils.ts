import fs from "fs";

export function getInput(fileName: string): string {
  return fs.readFileSync(fileName, "utf8");
}
