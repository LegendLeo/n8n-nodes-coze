import { INodeProperties } from 'n8n-workflow';

export const workflowProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['workflow'],
			},
		},
		options: [
			{
				name: 'Run',
				value: 'run',
				action: 'Run a workflow',
			},
		],
		default: 'run',
	},
	// --- Workflow: Run ---
	{
		displayName: 'Workflow ID',
		name: 'workflowId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID of the workflow to run. Must be a published workflow.',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Parameters',
		name: 'parameters',
		type: 'json',
		default: '',
		description: 'Input parameters for the start node of the workflow. Supports file parameters.',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Bot ID',
		name: 'botId',
		type: 'string',
		default: '',
		description: 'The bot ID to associate with the workflow. Required for some workflows (e.g., those with database or variable nodes).',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Extra Data',
		name: 'ext',
		type: 'json',
		default: '',
		description: 'Extra fields (like latitude, longitude, user_id) as a JSON object',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'Async Run',
		name: 'isAsync',
		type: 'boolean',
		default: false,
		description: 'Whether to run the workflow asynchronously. (Professional plan and above).',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		description: 'The ID of the application associated with this workflow',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['run'],
			},
		},
	},
];
