type SerializableObject = Record<string, unknown>;

function isObject(value: unknown): value is SerializableObject {
	return typeof value === "object" && value !== null;
}

export const apiErrorMessageParser = (message: unknown): string => {
	if (Array.isArray(message) && message.length > 0) {
		return String(message[0]);
	}

	if (typeof message === "string") {
		return message;
	}

	if (message == null) {
		return "An unexpected error occurred";
	}

	return String(message);
};

export const apiErrorParser = (
	requestError: unknown,
): { name: string; message: string } => {
	if (
		requestError instanceof ApiError ||
		(isObject(requestError) && requestError.name === "ApiError")
	) {
		const error = requestError as ApiError;
		const bodyMessage = isObject(error.body) ? error.body.message : undefined;

		return {
			name: error.name,
			message: apiErrorMessageParser(bodyMessage),
		};
	}

	if (requestError instanceof Error) {
		return { name: requestError.name, message: requestError.message };
	}

	if (typeof requestError === "string") {
		return { name: "Error", message: requestError };
	}

	return {
		name: "Error",
		message: "An unexpected error occurred",
	};
};

export type ApiRequestOptions = {
	readonly method:
		| "GET"
		| "PUT"
		| "POST"
		| "DELETE"
		| "OPTIONS"
		| "HEAD"
		| "PATCH";
	readonly url: string;
	readonly path?: Record<string, unknown>;
	readonly cookies?: Record<string, unknown>;
	readonly headers?: Record<string, unknown>;
	readonly query?: Record<string, unknown>;
	readonly formData?: Record<string, unknown>;
	readonly body?: unknown;
	readonly mediaType?: string;
	readonly responseHeader?: string;
	readonly errors?: Record<number, string>;
};

export class ApiError extends Error {
	public readonly url: string;
	public readonly status: number;
	public readonly statusText: string;
	public readonly body: unknown;
	public readonly request: ApiRequestOptions;

	constructor(
		request: ApiRequestOptions,
		response: ApiResult,
		message: string,
	) {
		super(message);

		this.name = "ApiError";
		this.url = response.url;
		this.status = response.status;
		this.statusText = response.statusText;
		this.body = response.body;
		this.request = request;
	}
}

export type ApiResult = {
	readonly url: string;
	readonly ok: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly body: unknown;
};
