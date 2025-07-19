# n8n-nodes-coze

[![npm version](https://img.shields.io/npm/v/n8n-nodes-coze.svg)](https://www.npmjs.com/package/n8n-nodes-coze)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-coze.svg)](https://www.npmjs.com/package/n8n-nodes-coze)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n-nodes-coze](https://img.shields.io/badge/n8n-nodes-brightgreen.svg)](https://n8n.io)

This is an unofficial node for [n8n](https://n8n.io) to interact with the [Coze](https://www.coze.com/) platform. It allows you to seamlessly leverage Coze's powerful AI features within your n8n workflows, including intelligent chat, workflow automation, file processing, and text-to-speech.

**中文版本: [README_CN.md](./README_CN.md)**

---

## Key Features

This node aims to cover the full range of Coze API's core functionalities, providing you with powerful automation capabilities:

*   **🤖 Chat**
    *   Engage in interactive conversations with any Coze Bot you've created.
    *   Supports **streaming responses** for real-time data handling.
    *   Supports **Tool Calls**, enabling n8n workflows to execute actions based on AI instructions and return the results to the AI for complex business logic.
    *   Manage conversation history and pass custom variables.

*   **Workflow**
    *   Trigger and run **workflows** you have published on the Coze platform.
    *   Supports both **synchronous** and **asynchronous** execution modes.
    *   Pass input parameters to workflows and retrieve the execution results.

*   **📁 File Handling**
    *   Upload files to Coze for your Bots to use in conversations (e.g., knowledge base files, documents for analysis).

*   **🗣️ Audio Synthesis**
    *   Implement **Text-to-Speech (TTS)** functionality to convert specified text into high-quality audio files.

*   **🏢 Workspace Management**
    *   Dynamically fetch your workspaces and bots list within n8n for easy reference in different nodes.

*   **🔐 Dual Authentication Methods**
    *   **Personal Access Token**: Simple and quick, ideal for personal projects and rapid testing.
    *   **OAuth2**: Standard and secure, suitable for team and enterprise-level applications.

## Installation

1.  Go to your n8n instance.
2.  Navigate to **Settings > Community Nodes**.
3.  Click **Install**.
4.  Search for `n8n-nodes-coze`.
5.  Click the install button to complete the installation.

## Development Guide

If you wish to contribute to this project or test it in your local environment:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/LegendLeo/n8n-nodes-coze.git
    cd n8n-nodes-coze
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the code**:
    ```bash
    npm run build
    ```

4.  **Link to your n8n environment**:
    In your n8n installation directory (usually `~/.n8n/`), run the link command:
    ```bash
    npm link /path/to/your/n8n-nodes-coze
    ```
    This will create a symbolic link in your n8n to your local development code.

5.  **Start n8n**:
    During development, you can use `npm run dev` to start a watcher that will automatically recompile the code upon changes.

## License

This project is licensed under the [MIT](LICENSE.md) License.
