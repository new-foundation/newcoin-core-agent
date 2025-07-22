#!/usr/bin/env node
import { NewcoinReaderAgent, NewcoinWriterAgent } from "./agents";
import { NewcoinListener } from "./agents/listener";
import fs from "fs";
import path from "path";

export { NewcoinListener, NewcoinReaderAgent, NewcoinWriterAgent };
export default NewcoinListener;

const args = process.argv.slice(2);
const templateArgIndex = args.findIndex((arg) => arg === "--template");

if (templateArgIndex !== -1 && args.length > templateArgIndex + 1) {
  const templateName = args[templateArgIndex + 1];
  const projectName = args[templateArgIndex + 2];
  const templateDir = path.resolve(__dirname, "..", "templates", templateName);
  const targetDir = projectName ? path.join(process.cwd(), projectName) : process.cwd();

  if (fs.existsSync(templateDir)) {
    if (projectName) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    console.log(`Creating a new project in ${targetDir} from template ${templateName}...`);
    fs.cpSync(templateDir, targetDir, { recursive: true });

    if (projectName) {
        const packageJsonPath = path.join(targetDir, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            packageJson.name = projectName;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        }
    }

    console.log("Done.");
  } else {
    console.error(`Template ${templateName} not found.`);
  }
}

export const _ = "hi";