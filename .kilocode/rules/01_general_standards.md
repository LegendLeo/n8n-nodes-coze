# 1. 编码通用标准与规范

## 1.1 语言和类型
- **必须使用 TypeScript**：项目中的所有代码都必须使用 TypeScript (`.ts`) 编写。
- **严格类型检查**：必须为所有变量、函数参数和返回值提供明确的类型定义。
- **禁止使用 `any` 类型**：除非在极特殊且无法避免的情况下，否则严禁使用 `any` 类型。应尽可能使用更具体的类型，或者 `unknown`。

## 1.2 命名约定
- **类 (Classes)**：必须使用大驼峰命名法 (PascalCase)。例如: `MyCustomNode`, `MyApiCredentials`。
- **方法和变量 (Methods & Variables)**：必须使用小驼峰命名法 (camelCase)。例如: `execute`, `nodeProperties`, `apiResponse`。
- **接口 (Interfaces)**：必须使用大驼峰命名法，并以 `I` 作为前缀。例如: `INodeType`, `IExecuteFunctions`。

## 1.3 代码质量与文档
- **遵循 Linter 规则**：代码必须通过项目配置的 ESLint 检查，不能有任何错误或警告。
- **代码注释**：对于复杂的业务逻辑、算法或关键步骤，必须添加清晰的注释来解释其目的和工作方式。
- **JSDoc 文档**：所有在节点类中公开的方法（尤其是 `execute` 方法）都必须有标准的 JSDoc 注释，说明其功能、参数和返回值。

## 1.4 参考资料
- 使用 `context7` 的 `get-library-docs` MCP 工具引入 n8n 官方文档（/n8n-io/n8n-docs）作为开发参考。

## 1.5 语言要求
- 在所有交流、代码注释和功能描述中，请统一使用中文。

## 1.6 错误处理
- 在使用 `fetch` MCP 失败时，尝试使用浏览器进行浏览。
- 当访问 API 文档失败时，切勿臆测 API 参数，直接提示用户需要更多相关信息。
