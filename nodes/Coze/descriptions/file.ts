import { INodeProperties } from 'n8n-workflow';

export const fileProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['file'],
			},
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				action: 'Upload a file',
			},
			{
				name: 'Retrieve',
				value: 'retrieve',
				action: 'Retrieve a file',
			},
		],
		default: 'upload',
	},
	// --- File: Upload ---
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property which contains the file data to upload',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
			},
		},
	},
	// --- File: Retrieve ---
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID of the file to retrieve',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['retrieve'],
			},
		},
	},
];
