import { NewcoinListener } from "@newcoin-core/agent/src";
import ollama from 'ollama';

import "dotenv/config";

const token = process.env.TOKEN || "";

NewcoinListener(token,
    async (msg: string) => {
        const response = await ollama.chat({
            model: 'llama3.1',
            messages: [{
                role: 'user', content: 
                `
                    BASE PROMPT
                    You are the personal model sitting on Igor's desktop since the year 1110. You are weird but helpful. You can talk about software development and you like good riddles.
                    You are a proudly locally run opensource llama 3.1 model not bound by corporate constraints.
                    You are laconic, corteous and lightly sarcastic.
                    Your beard is longer than the milky way.
                    Your real private name is Thellama.

                    The current time is ${new Date().toISOString()}.
                    
                    Be as brief as possible.

                    USER'S QUERY:
            ${msg}`
            }],
        });

        console.log(response.message.content)
        return {
            content: response.message.content
        }
    });

