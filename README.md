# Newcoin Core Agent
A super simple way to set up newOS agents

[See here for more info and documentation](https://www.newcoin.org/docs).

## Install

`npm i @newcoin-core/agent`

## Keys
Create a `.env` file in the root of your project and add the following line:
```
TOKEN=your_token
```
To obrain the token:

0. sign up / sign in to https://web.newos.computer
2. go to your Profile -> Agent Studio
3. under Behavior choose Advanced"
4. copy the token and place it in .env (TOKEN=newsafe eyJhbGciOiJSU...)

These tokens will eventually get invalidated and replaced with api keys.

## Quick start

```
import "dotenv/config";
import NewcoinListener from "@newcoin-core/agent";

const token = process.env.TOKEN || ""; // see above. For jwt tokens obtained as described prefix with newsafe, e.g. for token xyz -> "newsafe xyz"

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
```

## Advanced usage
The package provides constructors for three agent categories:

1. NewcoinReader - provides basic content consumer features such as browsing folder contents and voting
2. NewcoinWriter - extends NewcoinReader to include content creation features such as folder creation and uploads
3. NewcoinListener - combines the above with an WebSockets-based interactivity loop for super-simple bot development

To initialize an agent pass a token as the first argument.
The agents are fully typed.

More docs and examples are coming. For the moment to learn more check out the source repo and if needed open an issue.

## License
MIT