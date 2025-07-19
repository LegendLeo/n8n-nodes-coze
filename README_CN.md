# n8n-nodes-coze (扣子)

[![npm version](https://img.shields.io/npm/v/n8n-nodes-coze.svg)](https://www.npmjs.com/package/n8n-nodes-coze)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-coze.svg)](https://www.npmjs.com/package/n8n-nodes-coze)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n-nodes-coze](https://img.shields.io/badge/n8n-nodes-brightgreen.svg)](https://n8n.io)

这是一个为 [n8n](https://n8n.io) 设计的非官方节点，用于与 [Coze (扣子)](https://www.coze.cn/) 平台进行交互。它使你能够在 n8n 工作流中无缝地利用 Coze 强大的 AI 功能，包括智能聊天、工作流自动化、文件处理和语音合成。

**English version: [README.md](./README.md)**

---

## 核心功能

本节点旨在覆盖 Coze API 的全部核心功能，为你提供强大的自动化能力：

*   **🤖 智能聊天 (Chat)**
    *   与你创建的任何 Coze Bot 进行交互式对话。
    *   支持**流式响应**，可实时处理返回的数据。
    *   支持**工具调用 (Tool Calls)**，允许 n8n 工作流根据 AI 的指令执行相应操作，并将结果返回给 AI，实现复杂的业务逻辑。
    *   管理对话历史，传递自定义变量。

*   **工作流 (Workflow)**
    *   触发并运行你在 Coze 平台发布的**工作流**。
    *   支持**同步**和**异步**两种执行模式。
    *   向工作流传递输入参数，获取执行结果。

*   **📁 文件处理 (File)**
    *   上传文件到 Coze，供你的 Bot 在对话中使用（例如，知识库文件、待分析的文档等）。

*   **🗣️ 音频合成 (Audio)**
    *   实现**文本到语音 (TTS)** 功能，将指定的文本转换成高质量的音频文件。

*   **🏢 空间管理 (Workspace)**
    *   在 n8n 中动态获取你的工作空间和机器人列表，方便在不同节点中引用。

*   **🔐 两种认证方式**
    *   **个人访问令牌**: 简单快捷，适合个人项目和快速测试。
    *   **OAuth2**: 标准、安全，适合团队和企业级应用。

## 安装步骤

1.  前往你的 n8n 实例。
2.  进入 **Settings > Community Nodes**。
3.  点击 **Install**。
4.  在搜索框中输入 `n8n-nodes-coze`。
5.  点击安装按钮即可完成安装。

## 开发指南

如果你希望对本项目进行二次开发或在本地环境中测试：

1.  **克隆仓库**:
    ```bash
    git clone https://github.com/LegendLeo/n8n-nodes-coze.git
    cd n8n-nodes-coze
    ```

2.  **安装依赖**:
    ```bash
    npm install
    ```

3.  **编译代码**:
    ```bash
    npm run build
    ```

4.  **链接到你的 n8n 环境**:
    在你的 n8n 安装目录（通常是 `~/.n8n/`）下，运行链接命令：
    ```bash
    npm link /path/to/your/n8n-nodes-coze
    ```
    这将在你的 n8n 中创建一个指向本地开发代码的符号链接。

5.  **启动 n8n**:
    在开发过程中，你可以使用 `npm run dev` 来启动一个监听器，它会在代码变更时自动重新编译。

## 许可证

本项目采用 [MIT](LICENSE.md) 许可证。
