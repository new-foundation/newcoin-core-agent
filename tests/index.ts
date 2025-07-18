import { exec } from "child_process";
import { NewcoinListener } from "..";

import "dotenv/config";


// import { GoogleGenerativeAI } from "@google/generative-ai";
const token = process.env.TOKEN || "";

NewcoinListener(token, async (msg: string) => {
    // Some of your options here:

    // 1. fetch from an api...
    // 2. talk to ollama...
    // 3. ask your cat...
    // 4. all of the above

    // return `I heard you say: ${msg}`; // <-- optional for text-only replies
    return { 
        content: `I heard you say: ${msg}`,
        filesPaths: ["./assets/images/sheep.jpg"] // <-- path to a response image; will likely soon allow urls and buffers
    }
})

