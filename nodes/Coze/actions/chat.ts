import { IExecuteFunctions, IDataObject, IRequestOptions } from 'n8n-workflow';

export async function executeChat(this: IExecuteFunctions, i: number): Promise<any> {
	const operation = this.getNodeParameter('operation', i) as string;
	const authentication = this.getNodeParameter('authentication', i) as string;
	const credentials = await this.getCredentials(authentication);

	if (operation === 'create') {
		const botId = this.getNodeParameter('botId', i) as string;
		const userId = this.getNodeParameter('userId', i) as string;
		const content = this.getNodeParameter('content', i) as string;

		const body: IDataObject = {
			bot_id: botId,
			user_id: userId,
		};

		const additionalMessagesParam = this.getNodeParameter('additionalMessages', i) as string;
		if (additionalMessagesParam) {
			const additionalMessages = JSON.parse(additionalMessagesParam);
			additionalMessages.push({
				role: 'user',
				content: content,
				content_type: 'text',
			});
			body.additional_messages = additionalMessages;
		} else {
			body.additional_messages = [
				{
					role: 'user',
					content: content,
					content_type: 'text',
				},
			];
		}

		const conversationId = this.getNodeParameter('conversationId', i) as string;
		if (conversationId) body.conversation_id = conversationId;

		const customVariablesParam = this.getNodeParameter('customVariables', i) as string;
		if (customVariablesParam) body.custom_variables = JSON.parse(customVariablesParam);

		body.auto_save_history = this.getNodeParameter('autoSaveHistory', i) as boolean;

		const metaDataParam = this.getNodeParameter('metaData', i) as string;
		if (metaDataParam) body.meta_data = JSON.parse(metaDataParam);

		const extraParamsParam = this.getNodeParameter('extraParams', i) as string;
		if (extraParamsParam) body.extra_params = JSON.parse(extraParamsParam);

		const shortcutCommandParam = this.getNodeParameter('shortcutCommand', i) as string;
		if (shortcutCommandParam) body.shortcut_command = JSON.parse(shortcutCommandParam);

		const parametersParam = this.getNodeParameter('parameters', i) as string;
		if (parametersParam) body.parameters = JSON.parse(parametersParam);

		body.enable_card = this.getNodeParameter('enableCard', i) as boolean;

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v3/chat`,
			body,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'retrieve') {
		const conversationId = this.getNodeParameter('conversationId', i) as string;
		const chatId = this.getNodeParameter('chatId', i) as string;

		const qs: IDataObject = {
			conversation_id: conversationId,
			chat_id: chatId,
		};

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'GET',
			url: `/v3/chat/retrieve`,
			qs,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'listMessages') {
		const conversationId = this.getNodeParameter('conversationId', i) as string;
		const chatId = this.getNodeParameter('chatId', i) as string;

		const qs: IDataObject = {
			conversation_id: conversationId,
			chat_id: chatId,
		};

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'GET',
			url: `/v3/chat/message/list`,
			qs,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'submitToolOutputs') {
		const conversationId = this.getNodeParameter('conversationId', i) as string;
		const chatId = this.getNodeParameter('chatId', i) as string;
		const toolOutputs = this.getNodeParameter('toolOutputs', i) as string;
		const stream = this.getNodeParameter('stream', i) as boolean;

		const qs: IDataObject = {
			conversation_id: conversationId,
			chat_id: chatId,
		};

		const body: IDataObject = {
			tool_outputs: JSON.parse(toolOutputs),
			stream,
		};

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v3/chat/submit_tool_outputs`,
			qs,
			body,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'cancel') {
		const conversationId = this.getNodeParameter('conversationId', i) as string;
		const chatId = this.getNodeParameter('chatId', i) as string;

		const qs: IDataObject = {
			conversation_id: conversationId,
			chat_id: chatId,
		};

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v3/chat/cancel`,
			qs,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	}
}
