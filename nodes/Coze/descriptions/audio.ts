import { INodeProperties } from 'n8n-workflow';

export const audioProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['audio'],
			},
		},
		options: [
			{
				name: 'Text to Speech',
				value: 'speech',
				action: 'Synthesize speech from text',
			},
			{
				name: 'Audio Transcription',
				value: 'transcriptions',
				action: 'Transcribe audio to text',
			},
		],
		default: 'speech',
	},
	// --- Audio: Speech ---
	{
		displayName: 'Input Text',
		name: 'inputText',
		type: 'string',
		default: '',
		required: true,
		description: 'The text to synthesize into speech (UTF-8 encoded, max 1024 bytes)',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['speech'],
			},
		},
	},
	{
		displayName: 'Voice Name or ID',
		name: 'voiceId',
		type: 'options',
		default: '',
		required: true,
		description: 'The ID of the voice to use for the audio file. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getVoices',
		},
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['speech'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		options: [
			{ name: 'MP3', value: 'mp3' },
			{ name: 'WAV', value: 'wav' },
			{ name: 'PCM', value: 'pcm' },
			{ name: 'Opus', value: 'ogg_opus' },
		],
		default: 'mp3',
		description: 'The encoding format for the audio file',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['speech'],
			},
		},
	},
	{
		displayName: 'Speed',
		name: 'speed',
		type: 'number',
		typeOptions: {
			minValue: 0.2,
			maxValue: 3,
		},
		default: 1,
		description: 'The speed of the speech, from 0.2 to 3',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['speech'],
			},
		},
	},
	{
		displayName: 'Sample Rate',
		name: 'sampleRate',
		type: 'options',
		options: [
			{ name: '8000 Hz', value: 8000 },
			{ name: '16000 Hz', value: 16000 },
			{ name: '22050 Hz', value: 22050 },
			{ name: '24000 Hz', value: 24000 },
			{ name: '32000 Hz', value: 32000 },
			{ name: '44100 Hz', value: 44100 },
			{ name: '48000 Hz', value: 48000 },
		],
		default: 24000,
		description: 'The sample rate of the audio in Hz',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['speech'],
			},
		},
	},
	// --- Audio: Transcriptions ---
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property which contains the audio file to transcribe',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['transcriptions'],
			},
		},
	},
];
