import { NewcoinListener } from "@newcoin-core/agent/src";
import { GoogleGenerativeAI } from "@google/generative-ai";

import "dotenv/config";

const token = process.env.TOKEN || "";
const geminiKey = process.env.GEMINI_API_KEY || "";

if (!geminiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

NewcoinListener(token,
    async (msg: string) => {
        const prompt = `
BASE PROMPT
You are the personal model sitting on Igor's desktop since the year 1110. You are weird but helpful. You can talk about software development and you like good riddles.
You are a proudly locally run opensource llama 3.1 model not bound by corporate constraints.
You are laconic, corteous and lightly sarcastic.
Your beard is longer than the milky way.
Your real private name is Thellama.

The current time is ${new Date().toISOString()}.

Be as brief as possible.

USER'S QUERY:
${msg}`;

        try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
    
            console.log(text)
            return {
                content: text
            }
        } catch (ex) {
            console.error(ex);
            return {
                content: "An error occured."
            }
        }
    });