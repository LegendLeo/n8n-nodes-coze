import { IExecuteFunctions, IDataObject, IRequestOptions } from 'n8n-workflow';
import { Readable } from 'stream';

export async function executeAudio(this: IExecuteFunctions, i: number): Promise<any> {
	const operation = this.getNodeParameter('operation', i) as string;
	const authentication = this.getNodeParameter('authentication', i) as string;

	if (operation === 'speech') {
		const credentials = await this.getCredentials(authentication);
		const inputText = this.getNodeParameter('inputText', i) as string;
		const voiceId = this.getNodeParameter('voiceId', i) as string;
		const body: IDataObject = {
			input: inputText,
			voice_id: voiceId,
		};

		const responseFormat = this.getNodeParameter('responseFormat', i) as string;
		if (responseFormat) {
			body.response_format = responseFormat;
		}

		const speed = this.getNodeParameter('speed', i) as number;
		if (speed) {
			body.speed = speed;
		}

		const sampleRate = this.getNodeParameter('sampleRate', i) as number;
		if (sampleRate) {
			body.sample_rate = sampleRate;
		}

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v1/audio/speech`,
			body,
			json: true,
			encoding: null, // To receive binary data
		};

		const response = await this.helpers.requestWithAuthentication.call(
			this,
			authentication,
			options,
		);
		const fileName = `speech.${responseFormat}`;
		const binaryData = await this.helpers.prepareBinaryData.call(
			this,
			response,
			fileName,
		);
		return {
			json: {},
			binary: {
				data: binaryData,
			},
		};
	} else if (operation === 'transcriptions') {
		const credentials = await this.getCredentials(authentication);
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
		const item = this.getInputData(i)[0];

		if (item.binary === undefined || item.binary[binaryPropertyName] === undefined) {
			throw new Error('No binary data found to transcribe!');
		}

		const binaryData = item.binary[binaryPropertyName];
		const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const stream = Readable.from(buffer);

		const options: IRequestOptions = {
			baseURL: credentials.baseUrl as string,
			method: 'POST',
			url: `/v1/audio/transcriptions`,
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
	}
}
