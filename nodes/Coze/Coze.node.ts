import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { workspaceProperties } from './descriptions/workspace';
import { chatProperties } from './descriptions/chat';
import { executeWorkspace } from './actions/workspace';
import { executeChat } from './actions/chat';

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
			baseURL: 'https://api.coze.cn',
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
					{
						name: 'Chat',
						value: 'chat',
					},
				],
				default: 'workspace',
			},
			...workspaceProperties,
			...chatProperties,
		],
	};

	methods = {
		loadOptions: {
			async getWorkspaces(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const authentication = this.getCurrentNodeParameter('authentication') as string;
				const credentials = await this.getCredentials(authentication);
				const options: IRequestOptions = {
					baseURL: credentials.baseUrl as string,
					method: 'GET',
					url: `/v1/workspaces`,
					json: true,
				};
				const { code, data } = await this.helpers.requestWithAuthentication.call(
					this,
					authentication,
					options,
				);
				if (code === 0 && Array.isArray(data?.workspaces)) {
					return data.workspaces.map((workspace: any) => ({
						name: workspace.name,
						value: workspace.id,
					}));
				}
				return [];
			},

			async getBots(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const workspaceId = this.getCurrentNodeParameter('workspaceId') as string;
				if (!workspaceId) {
					return [];
				}
				const authentication = this.getCurrentNodeParameter('authentication') as string;
				const credentials = await this.getCredentials(authentication);
				const options: IRequestOptions = {
					baseURL: credentials.baseUrl as string,
					method: 'GET',
					url: `/v1/bots`,
					qs: {
						workspace_id: workspaceId,
					},
					json: true,
				};
				const { code, data } = await this.helpers.requestWithAuthentication.call(
					this,
					authentication,
					options,
				);
				if (code === 0 && Array.isArray(data?.items)) {
					return data.items.map((bot: any) => ({
						name: bot.name,
						value: bot.id,
					}));
				}
				return [];
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'workspace') {
					responseData = await executeWorkspace.call(this, i);
				} else if (resource === 'chat') {
					responseData = await executeChat.call(this, i);
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
