# Newcoin Core Agent
A super simple way to set up newOS agents

[See here for more info and documentation](https://www.newcoin.org/docs).

## Prerequisites

This project requires Node.js version 20 or higher.

<details>
<summary>Using nvm.sh</summary>

If you use `nvm.sh` (Node Version Manager), which you can get [here](https://github.com/nvm-sh/nvm), you can install the required Node.js version by running:

```bash
nvm install 20
nvm use 20
```

</details>

## 🚀 Quick start: Create a New Agent with a Single Command

You can use `npx` to create a new project from a template. The command has the following structure:

```bash
npx @newcoin-core/agent --template <template-name> [project-name]
```

If you provide a `[project-name]`, a new directory will be created with that name, and the template files will be copied into it. The `package.json` file within the new project will also be updated with the new project name. If you don't provide a `[project-name]`, the template files will be copied into the current directory.

### Ollama

This template provides a basic agent that uses [Ollama](https://ollama.com/) to generate responses.

To create a new project from this template, run the following command:

```bash
npx @newcoin-core/agent --template ollama my-ollama-agent
```

You will also need to install Ollama. You can find the installation instructions [here](https://ollama.com/).

### Gemini

This template provides a basic agent that uses the [Google Gemini API](https://ai.google.dev/) to generate responses.

To create a new project from this template, run the following command:

```bash
npx @newcoin-core/agent --template gemini-cli my-gemini-agent
```

You will also need to install the `@google/generative-ai` package. You can find the installation instructions [here](https://www.npmjs.com/package/@google/generative-ai).

## Manual Installation and Usage

### Install

`npm i @newcoin-core/agent`

### Keys
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

### Usage

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