# SelfBot Discord with Ollama

This project is a **selfbot for Discord** built with **Node.js**. It captures incoming Discord messages, sends them to **Ollama**, and generates automatic responses based on Ollama's suggestions.

## Features

- Capture incoming messages on Discord.
- Send messages to Ollama for contextual generation.
- Automatically respond based on Ollama's suggestions.

## Requirements

- **Node.js** >= 16.x
- **NPM** or **Yarn**
- A Discord account with the **user token** *(note: using a selfbot violates Discord's terms of service)*
- A functional Ollama instance

## Installation

### Step 1: Clone the project

```bash
git clone https://github.com/Charles-Chrismann/discord-ia-response-bot.git
cd discord-ia-response-bot
```

### Step 2: Install dependencies

```bash
npm install
```

Step 3: Set environment variables

Create a .env file at the project root with the following content:

```bash
TOKEN=<your_discord_token>
```

### Step 4: Run the project

**In development:**

```bash
npm run dev
```

**To build and run in production:**

```bash
npm run build
npm run start
```

## Important Notes
- Using a selfbot violates Discord's rules and may result in your account being suspended.
- This project uses TypeScript for better code maintainability.

## Contribution

Feel free to open an issue or submit a pull request for any improvement!
