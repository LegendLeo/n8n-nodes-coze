import { INodeProperties } from 'n8n-workflow';

export const workspaceProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['workspace'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List all workspaces',
				action: 'List a workspace',
			},
			{
				name: 'List Bots',
				value: 'listBots',
				description: 'List all bots in a workspace',
				action: 'List bots in a workspace',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Workspace Name or ID',
		name: 'workspaceId',
		type: 'options',
		default: '',
		required: true,
		description: 'ID of the workspace to list bots from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getWorkspaces',
		},
		displayOptions: {
			show: {
				resource: ['workspace', 'chat'],
				operation: ['listBots', 'create'],
			},
		},
	},
	{
		displayName: 'Publish Status',
		name: 'publishStatus',
		type: 'options',
		options: [
			{
				name: 'All',
				value: 'all',
			},
			{
				name: 'Published Online',
				value: 'published_online',
			},
			{
				name: 'Published Draft',
				value: 'published_draft',
			},
			{
				name: 'Unpublished Draft',
				value: 'unpublished_draft',
			},
		],
		default: 'published_online',
		description: 'Filter bots by publish status',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['listBots'],
			},
		},
	},
	{
		displayName: 'Connector ID',
		name: 'connectorId',
		type: 'string',
		default: '1024',
		description: 'The channel ID, required only for published_online or published_draft status. Default is 1024 for API channel.',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['listBots'],
			},
		},
	},
	{
		displayName: 'Page Number',
		name: 'pageNum',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'The page number for pagination',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['listBots'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 20,
		description: 'The size of each page for pagination',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['listBots'],
			},
		},
	},
	{
		displayName: 'Enterprise ID',
		name: 'enterpriseId',
		type: 'string',
		default: '',
		description: 'ID of the enterprise to list workspaces for',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		description: 'ID of the user to list workspaces for',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Coze Account ID',
		name: 'cozeAccountId',
		type: 'string',
		default: '',
		description: 'ID of the Coze account to list workspaces for',
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['list'],
			},
		},
	},
];
