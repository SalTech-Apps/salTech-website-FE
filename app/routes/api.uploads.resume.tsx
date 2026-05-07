/* eslint-disable react-refresh/only-export-components -- resource route */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function getExtension(fileName: string, mimeType: string): string {
	const extFromName = path.extname(fileName).toLowerCase();
	if (
		extFromName === ".pdf" ||
		extFromName === ".doc" ||
		extFromName === ".docx"
	) {
		return extFromName;
	}

	if (mimeType === "application/pdf") return ".pdf";
	if (mimeType === "application/msword") return ".doc";
	return ".docx";
}

export async function action({ request }: { request: Request }) {
	if (request.method !== "POST") {
		return Response.json(
			{ message: "Method Not Allowed" },
			{ status: 405, headers: { Allow: "POST" } },
		);
	}

	const contentType = request.headers.get("content-type") ?? "";
	if (!contentType.includes("multipart/form-data")) {
		return Response.json(
			{ message: "Content-Type must be multipart/form-data" },
			{ status: 400 },
		);
	}

	try {
		const formData = await request.formData();
		const resume = formData.get("resume");

		if (!(resume instanceof File)) {
			return Response.json(
				{ message: "Resume file is required" },
				{ status: 400 },
			);
		}

		if (resume.size <= 0 || resume.size > MAX_RESUME_SIZE_BYTES) {
			return Response.json(
				{ message: "Resume must be between 1 byte and 10MB" },
				{ status: 400 },
			);
		}

		if (!ALLOWED_MIME_TYPES.has(resume.type)) {
			return Response.json(
				{ message: "Only PDF, DOC, and DOCX files are allowed" },
				{ status: 400 },
			);
		}

		const uploadsDir = path.resolve(process.cwd(), "public/uploads/resumes");
		await mkdir(uploadsDir, { recursive: true });

		const fileExtension = getExtension(resume.name, resume.type);
		const fileName = `${Date.now()}-${randomUUID()}${fileExtension}`;
		const filePath = path.join(uploadsDir, fileName);

		const bytes = await resume.arrayBuffer();
		await writeFile(filePath, Buffer.from(bytes));

		return Response.json(
			{
				message: "Resume uploaded successfully",
				data: {
					url: `/uploads/resumes/${fileName}`,
					fileName: resume.name,
					size: resume.size,
					mimeType: resume.type,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("[upload] failed to process resume", error);
		return Response.json(
			{ message: "Failed to upload resume" },
			{ status: 500 },
		);
	}
}
