import { INodeProperties } from 'n8n-workflow';

export const chatProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: '创建对话',
				value: 'create',
				action: 'Create a chat completion',
			},
			{
				name: '取消进行中的对话',
				value: 'cancel',
				action: 'Cancel a chat',
			},
			{
				name: '提交工具执行结果',
				value: 'submitToolOutputs',
				action: 'Submit tool outputs',
			},
			{
				name: '查看对话消息详情',
				value: 'listMessages',
				action: 'List chat messages',
			},
			{
				name: '查看对话详情',
				value: 'retrieve',
				action: 'Retrieve a chat completion',
			},
		],
		default: 'create',
	},
	{
		displayName: '智能体 ID（botId） Name or ID',
		name: 'botId',
		type: 'options',
		default: '',
		required: true,
		description: '用于对话的智能体 ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getBots',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '用户 ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: '代表您的最终用户的唯一标识符',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '消息内容',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		description: '用户的当前输入消息',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '会话 ID（conversationId）',
		name: 'conversationId',
		type: 'string',
		default: '',
		description: '指定对话发生在哪一次会话中',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create', 'retrieve', 'listMessages', 'submitToolOutputs', 'cancel'],
			},
		},
	},
	{
		displayName: '对话 ID（chatId）',
		name: 'chatId',
		type: 'string',
		default: '',
		required: true,
		description: '要查询的对话的 ID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['retrieve', 'listMessages', 'submitToolOutputs', 'cancel'],
			},
		},
	},
	{
		displayName: '工具执行结果',
		name: 'toolOutputs',
		type: 'json',
		default: '',
		required: true,
		description: '工具执行结果，格式为 JSON 字符串数组，例如：[{"tool_call_id": "...", "output": "..."}]',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['submitToolOutputs'],
			},
		},
	},
	{
		displayName: '流式响应',
		name: 'stream',
		type: 'boolean',
		default: false,
		description: 'Whether to enable streaming response',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['submitToolOutputs'],
			},
		},
	},
	{
		displayName: '附加消息',
		name: 'additionalMessages',
		type: 'json',
		default: '',
		description: '附加消息（历史消息），格式为 JSON 字符串数组，例如：[{"role": "user", "content": "你好"}]',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '自定义变量',
		name: 'customVariables',
		type: 'json',
		default: '',
		description: '智能体提示词中定义的变量，格式为 JSON 对象字符串',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '自动保存历史记录',
		name: 'autoSaveHistory',
		type: 'boolean',
		default: true,
		description: 'Whether to save the current conversation history (default true)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '元数据',
		name: 'metaData',
		type: 'json',
		default: '',
		description: '附加信息，通常用于封装一些业务相关的字段。查看对话详情时，扣子会透传此附加信息，查看消息列表时不会返回该附加信息。格式为自定义键值对，应指定为 JSON 对象格式。',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '附加参数',
		name: 'extraParams',
		type: 'json',
		default: '',
		description: '附加参数，如经纬度等，格式为 JSON 对象字符串',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '快捷指令',
		name: 'shortcutCommand',
		type: 'json',
		default: '',
		description: '快捷指令信息，格式为 JSON 对象字符串',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '自定义参数',
		name: 'parameters',
		type: 'json',
		default: '',
		description: '自定义参数，传给对话流，格式为 JSON 对象字符串',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '启用卡片返回',
		name: 'enableCard',
		type: 'boolean',
		default: false,
		description: 'Whether to return the content in card format (default false)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['create'],
			},
		},
	},
];
