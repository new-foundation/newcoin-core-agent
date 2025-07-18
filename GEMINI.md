
# Gemini CLI Agent instructions

This document outlines the capabilities and usage of the Gemini CLI agent for the `@newcoin-core/agent` repository.

## Core Functionality

The primary purpose of this agent is to assist developers in creating and managing bots (agents) on the Newcoin platform. The agent leverages the `@newcoin-core/agent` library, which provides a simple interface for interacting with the Newcoin ecosystem.

### Key Features:

*   **Agent Scaffolding:** The agent can generate boilerplate code for new bots, including the necessary imports and basic structure.
*   **Command Generation:** The agent can generate commands for interacting with the Newcoin API, using the `@newstackdev/iosdk-newgraph-client-js` library.
*   **Documentation Integration:** The agent has access to the Newcoin API documentation (Swagger) and can provide information on available endpoints and their usage.
*   **Local Command Execution:** The agent can execute local commands, such as running tests or building the project.

## Interacting with the Agent

When interacting with the agent, you can use natural language to describe your desired actions. The agent will interpret your requests and generate the appropriate commands or code.

### Examples:

*   "Create a new bot that responds to every message with 'Hello, world!'"
*   "How do I get the contents of a folder?"
*   "Generate a command to create a new post with the title 'My First Post' and the content 'This is my first post on Newcoin.'"

## Agent Implementation Details

The agent is built upon the `@newcoin-core/agent` library, which provides three main classes for interacting with the Newcoin platform:

*   `NewcoinReader`: Provides read-only access to the Newcoin API.
*   `NewcoinWriter`: Extends `NewcoinReader` with write access to the Newcoin API.
*   `NewcoinListener`: Extends `NewcoinWriter` with a WebSocket-based event listener for real-time message handling.

The agent will use these classes to generate code and commands based on your requests. It will also use the `@newstackdev/iosdk-newgraph-client-js` library for direct API interaction.

## Local Development

The agent can assist with local development tasks, such as:

*   **Running tests:** "Run the tests."
*   **Building the project:** "Build the project."
*   **Starting the development server:** "Start the development server."

The agent will use the scripts defined in the `package.json` file to execute these commands.

## Authentication

To interact with the Newcoin API, you will need to provide an authentication token. The agent will prompt you for this token when necessary. For more information on obtaining a token, please refer to the `README.md` file.

## External Tools

The agent can also interact with external tools, such as `ollama`, to provide additional functionality. For example, you could create a bot that uses `ollama` to generate creative text formats.
