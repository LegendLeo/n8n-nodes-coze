import {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class CozeOAuth2Api implements ICredentialType {
  name = 'cozeOAuth2Api';
  displayName = 'Coze OAuth2 API';
  documentationUrl = 'https://www.coze.cn/open/docs/developer_guides/oauth_code';
  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://www.coze.cn/api/permission/oauth2/authorize',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://www.coze.cn/api/permission/oauth2/token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'string',
      default: '',
      description: 'Space-separated list of scopes for the Coze API (e.g. "bot.read bot.write")',
      required: false,
    },
    {
      displayName: 'Auth URI Query Parameters',
      name: 'authQueryParameters',
      type: 'hidden',
      default: '',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'body',
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      description: 'Your Coze OAuth2 Client ID',
      required: true,
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      description: 'Your Coze OAuth2 Client Secret',
      required: true,
    },
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
      displayName: 'Redirect URI',
      name: 'redirectUri',
      type: 'string',
      default: '',
      description: 'The redirect URI set in your Coze OAuth2 app',
      required: true,
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.baseUrl}}',
      url: '/v1/workspaces',
      method: 'GET',
      headers: {
        Authorization: 'Bearer {{$oauth2.access_token}}',
      },
    },
  };
}
