# 2. 项目文件结构规范

## 2.1. 目录结构
- **节点目录**: 所有的节点逻辑文件 (`.ts`) 和描述文件 (`.json`) 必须放在项目根目录下的 `nodes/` 目录中。
- **凭证目录**: 所有的凭证定义文件 (`.ts`) 必须放在项目根目录下的 `credentials/` 目录中。

## 2.2. 文件命名
- **节点主文件**: 必须以节点名称命名，并以 `.node.ts` 结尾。例如: `MyNode.node.ts`。
- **凭证文件**: 必须以凭证名称命名，并以 `.credentials.ts` 结尾。例如: `MyApi.credentials.ts`。

## 2.3. `package.json` 配置
- **包名称 (Package Name)**: npm 包的名称必须以 `n8n-nodes-` 开头。例如: `n8n-nodes-my-service`。
- **n8n 属性**: 必须在 `package.json` 文件中包含一个 `n8n` 属性，并正确列出所有的节点和凭证文件的路径。

### 示例 `package.json`:
```json
{
  "name": "n8n-nodes-my-service",
  "version": "0.1.0",
  "main": "dist/index.js",
  "n8n": {
    "n8nNodes": [
      "dist/nodes/MyNode/MyNode.node.js"
    ],
    "credentials": [
      "dist/credentials/MyApi.credentials.js"
    ]
  },
  ...
}
