import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	IRequestOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Coze implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Coze',
		name: 'coze',
		icon: 'file:coze.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Coze AI platform',
		defaults: {
			name: 'Coze',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'cozeTokenApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['cozeTokenApi'],
					},
				},
			},
			{
				name: 'cozeOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['cozeOAuth2Api'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://api.coze.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Service Token',
						value: 'cozeTokenApi',
					},
					{
						name: 'OAuth2',
						value: 'cozeOAuth2Api',
					},
				],
				default: 'cozeTokenApi',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Workspace',
						value: 'workspace',
					},
				],
				default: 'workspace',
			},
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
				],
				default: 'list',
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
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const authentication = this.getNodeParameter('authentication', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'workspace') {
					if (operation === 'list') {
						const credentials = await this.getCredentials(authentication);
						const qs: IDataObject = {};
						const enterpriseId = this.getNodeParameter('enterpriseId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const cozeAccountId = this.getNodeParameter('cozeAccountId', i) as string;

						if (enterpriseId) {
							qs.enterprise_id = enterpriseId;
						}
						if (userId) {
							qs.user_id = userId;
						}
						if (cozeAccountId) {
							qs.coze_account_id = cozeAccountId;
						}

						const options: IRequestOptions = {
							baseURL: credentials.baseUrl as string,
							method: 'GET',
							url: `/v1/workspaces`,
							qs,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							authentication,
							options,
						);
					}
				} else if (resource === 'chat') {
				} else if (resource === 'conversation') {
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData);
				} else {
					returnData.push(responseData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						error: error.message,
					});
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
