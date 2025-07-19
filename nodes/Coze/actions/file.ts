import { IExecuteFunctions, IDataObject, IRequestOptions } from 'n8n-workflow';
import { Readable } from 'stream';

export async function executeFile(this: IExecuteFunctions, i: number): Promise<any> {
	const operation = this.getNodeParameter('operation', i) as string;
	const authentication = this.getNodeParameter('authentication', i) as string;

	if (operation === 'upload') {
		const credentials = await this.getCredentials(authentication);
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
		const item = this.getInputData(i)[0]; // Correctly get the first item of the current iteration

		if (item.binary === undefined || item.binary[binaryPropertyName] === undefined) {
			throw new Error('No binary data found to upload!');
		}

		const binaryData = item.binary[binaryPropertyName];
		const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const stream = Readable.from(buffer);

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v1/files/upload`,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			formData: {
				file: {
					value: stream,
					options: {
						filename: binaryData.fileName,
						contentType: binaryData.mimeType,
					},
				},
			},
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	} else if (operation === 'retrieve') {
		const credentials = await this.getCredentials(authentication);
		const fileId = this.getNodeParameter('fileId', i) as string;
		const qs: IDataObject = {
			file_id: fileId,
		};

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'GET',
			url: `/v1/files/retrieve`,
			qs,
			json: true,
		};

		return this.helpers.requestWithAuthentication.call(this, authentication, options);
	}
}
