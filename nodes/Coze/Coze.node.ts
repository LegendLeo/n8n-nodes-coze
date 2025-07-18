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
						name: 'Bot',
						value: 'bot',
					},
				],
				default: 'bot',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'bot') {
					if (operation === 'get') {
						const botId = this.getNodeParameter('botId', i) as string;

						const options: IRequestOptions = {
							method: 'GET',
							uri: `https://api.coze.com/v1/bot/get_online_info`,
							qs: {
								bot_id: botId,
							},
							headers: {
								Accept: 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					} else if (operation === 'list') {
						const options: IRequestOptions = {
							method: 'GET',
							uri: `https://api.coze.com/v1/space/published_bots_list`,
							headers: {
								Accept: 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					}
				} else if (resource === 'chat') {
					if (operation === 'create') {
						const botId = this.getNodeParameter('botId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							bot_id: botId,
							user_id: userId,
						};

						if (additionalFields.stream) {
							body.stream = additionalFields.stream;
						}

						if (additionalFields.customVariables) {
							const variables = additionalFields.customVariables as IDataObject;
							if (variables.variable && Array.isArray(variables.variable)) {
								const customVars: IDataObject = {};
								for (const variable of variables.variable) {
									customVars[variable.key] = variable.value;
								}
								body.custom_variables = customVars;
							}
						}

						const options: IRequestOptions = {
							method: 'POST',
							uri: `https://api.coze.com/v1/chat`,
							body,
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					} else if (operation === 'sendMessage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							chat_id: chatId,
							query: message,
						};

						if (additionalFields.stream) {
							body.stream = additionalFields.stream;
						}

						const options: IRequestOptions = {
							method: 'POST',
							uri: `https://api.coze.com/v1/chat/submit`,
							body,
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					}
				} else if (resource === 'conversation') {
					if (operation === 'get') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;

						const options: IRequestOptions = {
							method: 'GET',
							uri: `https://api.coze.com/v1/conversation/retrieve`,
							qs: {
								conversation_id: conversationId,
							},
							headers: {
								Accept: 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					} else if (operation === 'listMessages') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;

						const options: IRequestOptions = {
							method: 'GET',
							uri: `https://api.coze.com/v1/conversation/message/list`,
							qs: {
								conversation_id: conversationId,
							},
							headers: {
								Accept: 'application/json',
							},
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'cozeApi',
							options,
						);
					}
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
