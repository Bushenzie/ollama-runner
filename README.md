# Ollama-runner

- Electron app built to have minimal local UI for ollama chats instead of terminal
- There is currently support for compilation for MacOS and Linux

## Preview

![](https://github.com/user-attachments/assets/8bddd0a8-cd26-4c7f-96a3-b9f3a21b606d)

## Requirements

- Node.js v22
- pnpm v9
- Ollama _(and some installed model from ollama to run and select)_

## Installation

- Clone the repo
- Install all dependencies _(`pnpm i`)_
- Now you can either run in dev _(`pnpm dev`)_ mode or compile it _(`pnpm dist:{mac|linux}`)_
- After compilation you can open the app from generated `dist` folder.
