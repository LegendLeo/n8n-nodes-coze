# 3. 节点核心实现规范

## 3.1. 节点类定义
- **实现接口**: 节点主类必须实现 `INodeType` 接口。
- **Description 对象**: 类中必须包含一个名为 `description` 的公共属性，其类型为 `INodeTypeDescription`。这个对象定义了节点在 n8n UI 中的所有可见信息。
- **必填描述属性**: `description` 对象中必须包含 `displayName`, `name`, `group`, `version`, `description` 等核心字段。

## 3.2. `execute` 方法
- **方法签名**: 节点的核心逻辑必须在 `async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>` 方法中实现。
- **获取输入数据**: 必须使用 `this.getInputData()` 来获取上游节点传入的数据。
- **返回数据结构**: 必须使用 `this.helpers.returnJsonArray()` 来包装节点的输出数据，确保返回格式为 n8n 标准的 `INodeExecutionData[][]`。严禁直接返回普通数组或对象。

### `execute` 方法骨架示例:
```typescript
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyNode implements INodeType {
    description: INodeTypeDescription = {
        // ... description a
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            // ... 核心逻辑 ...
            const someValue = items[i].json.someKey;
            
            // ... 处理后放入新对象 ...
            const newJsonData = { result: someValue };
            returnData.push({ json: newJsonData });
        }

        return [returnData]; // 或者使用 return this.prepareOutputData(returnData);
    }
}
```
