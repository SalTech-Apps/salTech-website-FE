import path from "node:path";
import {
	BlobServiceClient,
	type BlockBlobUploadOptions,
} from "@azure/storage-blob";

type UploadInput = {
	buffer: Buffer;
	originalName: string;
	mimeType: string;
	name?: string;
	folder?: string;
};

type UploadResult = {
	url: string;
	blobName: string;
	size: number;
	mimeType: string;
};

let blobServiceClient: BlobServiceClient | null = null;

function sanitizePart(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9-_]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function sanitizeFolder(value: string): string {
	return value
		.split("/")
		.map((part) => sanitizePart(part))
		.filter(Boolean)
		.join("/");
}

function buildBlobName(name: string | undefined, originalName: string): string {
	const ext = path.extname(originalName).toLowerCase();
	const fallbackBase = path.parse(originalName).name || "file";
	const rawBase = name && name.trim().length > 0 ? name : fallbackBase;
	const safeBase = sanitizePart(rawBase) || "file";
	const uniqueSuffix = Date.now().toString(36);
	return `${safeBase}-${uniqueSuffix}${ext}`;
}

function getAzureStorageConfig(): {
	connectionString: string;
	containerName: string;
} {
	const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
	const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

	if (!connectionString || !containerName) {
		throw new Error(
			"Azure Blob Storage is not configured. Set AZURE_STORAGE_CONNECTION_STRING and AZURE_STORAGE_CONTAINER_NAME",
		);
	}

	return { connectionString, containerName };
}

function getBlobServiceClient(): BlobServiceClient {
	if (blobServiceClient) {
		return blobServiceClient;
	}

	const { connectionString } = getAzureStorageConfig();
	blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
	return blobServiceClient;
}

async function uploadToAzureStorage(input: UploadInput): Promise<UploadResult> {
	const { containerName } = getAzureStorageConfig();
	const containerClient =
		getBlobServiceClient().getContainerClient(containerName);
	await containerClient.createIfNotExists();

	const folder = sanitizeFolder(input.folder ?? "saltech/uploads");
	const blobName = `${folder}/${buildBlobName(input.name, input.originalName)}`;
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	const options: BlockBlobUploadOptions = {
		blobHTTPHeaders: {
			blobContentType: input.mimeType,
		},
	};

	await blockBlobClient.uploadData(input.buffer, options);

	return {
		url: blockBlobClient.url,
		blobName,
		size: input.buffer.length,
		mimeType: input.mimeType,
	};
}

export async function uploadResume(input: UploadInput): Promise<UploadResult> {
	return uploadToAzureStorage({
		...input,
		folder: input.folder ?? "saltech/resumes",
	});
}

export async function uploadTeamMemberImage(
	input: UploadInput,
): Promise<UploadResult> {
	return uploadToAzureStorage({
		...input,
		folder: input.folder ?? "saltech/team-members",
	});
}
