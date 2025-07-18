import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CozeTokenApi implements ICredentialType {
	name = 'cozeTokenApi';
	displayName = 'Coze Token API';
	documentationUrl = 'https://www.coze.cn/open/docs/developer_guides/service_token';
	properties: INodeProperties[] = [
    {
      displayName: '站点',
      name: 'baseUrl',
      type: 'options',
			options: [
				{
					name: '大陆站（Coze.cn）',
					value: 'https://api.coze.cn',
				},
				{
					name: '国际站（Coze.com）',
					value: 'https://api.coze.com',
				},
			],
      default: 'https://api.coze.cn',
      description: '站点分国内站和国际站，请确认您要使用的站点',
      required: true,
    },
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/v1/workspaces',
			method: 'GET',
		},
	};
}
