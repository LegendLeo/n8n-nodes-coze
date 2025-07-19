import { IExecuteFunctions, IDataObject, IRequestOptions } from 'n8n-workflow';

export async function executeWorkflow(this: IExecuteFunctions, i: number): Promise<any> {
	const operation = this.getNodeParameter('operation', i) as string;
	const authentication = this.getNodeParameter('authentication', i) as string;

	if (operation === 'run') {
		const credentials = await this.getCredentials(authentication);
		const workflowId = this.getNodeParameter('workflowId', i) as string;
		const body: IDataObject = {
			workflow_id: workflowId,
		};

		const parameters = this.getNodeParameter('parameters', i, {}) as IDataObject;
		if (Object.keys(parameters).length > 0) {
			body.parameters = parameters;
		}

		const botId = this.getNodeParameter('botId', i) as string;
		if (botId) {
			body.bot_id = botId;
		}

		const ext = this.getNodeParameter('ext', i, {}) as IDataObject;
		if (Object.keys(ext).length > 0) {
			body.ext = ext;
		}

		const isAsync = this.getNodeParameter('isAsync', i) as boolean;
		if (isAsync) {
			body.is_async = isAsync;
		}

		const appId = this.getNodeParameter('appId', i) as string;
		if (appId) {
			body.app_id = appId;
		}

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v1/workflow/run`,
			body,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	}
}
