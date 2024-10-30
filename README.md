# Newcoin Core Agent
A super simple way to set up newOS agents

[See here for more info and documentation](https://www.newcoin.org/docs).

## Install

`npm i @newcoin-core/agent`

## Keys
A temporary solution is to use the client token from the browser:

0. sign up (duh)
1. sign in to your newcoin os account
2. open developer tools (cmd/ctrl + shift + i)
3. navigate to developer tools -> local storage -> newsafe-auth-token

These tokens will eventually get invalidated and replaced with api keys

## Quick start

```
import NewcoinListener from "@newcoin-core/agent";

const token = ""; # get it from 

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
The package provides constructurs for three agent categories:

1. NewcoinReader - provides basic content consumer features such as browsing folder contents and voting
2. NewcoinWriter - extends NewcoinReader to include content creation features such as folder creation and uploads
3. NewcoinListener - combines the above with an interactive WebSockets-based for super-simple bot development

To initialize an agent pass a token as the first argument.
The agents are fully typed.

More docs and examples are coming. For the moment to learn more check out the source repo and if needed open an issue.

## License
MIT