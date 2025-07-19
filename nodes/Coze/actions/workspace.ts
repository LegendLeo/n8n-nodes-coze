import { IExecuteFunctions, IDataObject, IRequestOptions } from 'n8n-workflow';

export async function executeWorkspace(this: IExecuteFunctions, i: number): Promise<any> {
	const operation = this.getNodeParameter('operation', i) as string;
	const authentication = this.getNodeParameter('authentication', i) as string;

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

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'listBots') {
		const credentials = await this.getCredentials(authentication);
		const workspaceId = this.getNodeParameter('workspaceId', i) as string;
		const qs: IDataObject = {
			workspace_id: workspaceId,
		};

		const publishStatus = this.getNodeParameter('publishStatus', i) as string;
		if (publishStatus) {
			qs.publish_status = publishStatus;
		}

		const connectorId = this.getNodeParameter('connectorId', i) as string;
		if (connectorId) {
			qs.connector_id = connectorId;
		}

		const pageNum = this.getNodeParameter('pageNum', i) as number;
		if (pageNum) {
			qs.page_num = pageNum;
		}

		const pageSize = this.getNodeParameter('pageSize', i) as number;
		if (pageSize) {
			qs.page_size = pageSize;
		}

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'GET',
			url: `/v1/bots`,
			qs,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	}
}
