# 4. API 调用与错误处理规范

## 4.1. API 请求
- **禁止使用通用 HTTP 库**: 在节点代码中，严禁直接使用如 `axios` 或 `node-fetch` 等通用 HTTP 请求库。
- **必须使用 n8n 辅助函数**: 所有对外部 API 的 HTTP 请求都 **必须** 使用 n8n 提供的 `this.helpers.request()` 或 `this.helpers.requestWithAuthentication()` 辅助函数。这能确保 n8n 正确处理用户配置的凭证、代理和重试逻辑。

## 4.2. 错误处理
为了在 n8n UI 中提供清晰、准确的错误信息，必须使用 n8n 提供的特定错误类。

- **操作失败 (Operational Failures)**: 如果错误是由于节点内部逻辑问题或无效的输入数据引起的（例如，必填字段缺失），**必须** `throw new NodeOperationError(this.getNode(), '错误描述信息', { itemIndex });`。
- **API 调用失败 (API Failures)**: 如果错误是由外部 API 返回的（例如，`4xx` 或 `5xx` 状态码），**必须** `throw new NodeApiError(this.getNode(), responseData, { itemIndex });`。`responseData` 应为 API 返回的原始错误对象。

### 错误处理示例:
```typescript
// ... 在 execute 方法内部 ...
const items = this.getInputData();

for (let i = 0; i < items.length; i++) {
    try {
        const name = this.getNodeParameter('name', i, '') as string;
        if (!name) {
            // 抛出操作错误
            throw new NodeOperationError(this.getNode(), 'Name 字段不能为空。', {
                itemIndex: i,
            });
        }

        const options: IHttpRequestOptions = {
            method: 'GET',
            url: `https://api.example.com/data?name=${name}`,
            json: true,
        };

        const response = await this.helpers.requestWithAuthentication.call(this, 'myApiCredentials', options);
        // ... 处理成功响应 ...

    } catch (error) {
        // 如果是 NodeApiError 或 NodeOperationError，n8n 会自动捕获并显示
        // 如果是其他错误，并且我们希望停止工作流，则需要重新抛出
        if (this.continueOnFail()) {
            // ... 根据配置决定是否继续 ...
        } else {
            throw error;
        }
    }
}
```
