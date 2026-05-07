import type {
	TeamMember,
	CreateTeamMemberRequest,
	UpdateTeamMemberRequest,
	TeamMemberGroup,
} from "../models/team.model.ts";
import {
	createTeamMemberDocument,
	listTeamMemberDocuments,
	mergeTeamMemberDocument,
	readTeamMemberDocumentById,
	removeTeamMemberDocument,
} from "../firebase/team.firestore.ts";

const validGroups: TeamMemberGroup[] = [
	"leadership",
	"engineering-design",
	"product-operations",
];

function generateTeamMemberId(): string {
	return `team-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function normalizeCreateTeamMemberInput(
	body: Record<string, unknown>,
): CreateTeamMemberRequest {
	const groupValue = body.group as string | undefined;
	return {
		name: String(body.name ?? "").trim(),
		position: String(body.position ?? "").trim(),
		group:
			groupValue && validGroups.includes(groupValue as TeamMemberGroup)
				? (groupValue as TeamMemberGroup)
				: undefined,
		shortDescription: body.shortDescription
			? String(body.shortDescription).trim() || undefined
			: undefined,
		detailedDescription: body.detailedDescription
			? String(body.detailedDescription).trim() || undefined
			: undefined,
		profileImageUrl: body.profileImageUrl
			? String(body.profileImageUrl).trim() || undefined
			: undefined,
		email: body.email ? String(body.email).trim() || undefined : undefined,
		phone: body.phone ? String(body.phone).trim() || undefined : undefined,
		linkedinUrl: body.linkedinUrl
			? String(body.linkedinUrl).trim() || undefined
			: undefined,
		twitterUrl: body.twitterUrl
			? String(body.twitterUrl).trim() || undefined
			: undefined,
	};
}

export function normalizeUpdateTeamMemberInput(
	body: Record<string, unknown>,
): UpdateTeamMemberRequest {
	const patch: UpdateTeamMemberRequest = {};

	if ("name" in body) patch.name = String(body.name ?? "").trim();
	if ("position" in body) patch.position = String(body.position ?? "").trim();
	if ("group" in body) {
		const g = body.group as string | undefined;
		patch.group =
			g && validGroups.includes(g as TeamMemberGroup)
				? (g as TeamMemberGroup)
				: undefined;
	}
	if ("shortDescription" in body)
		patch.shortDescription = body.shortDescription
			? String(body.shortDescription).trim() || undefined
			: undefined;
	if ("detailedDescription" in body)
		patch.detailedDescription = body.detailedDescription
			? String(body.detailedDescription).trim() || undefined
			: undefined;
	if ("profileImageUrl" in body)
		patch.profileImageUrl = body.profileImageUrl
			? String(body.profileImageUrl).trim() || undefined
			: undefined;
	if ("email" in body)
		patch.email = body.email
			? String(body.email).trim() || undefined
			: undefined;
	if ("phone" in body)
		patch.phone = body.phone
			? String(body.phone).trim() || undefined
			: undefined;
	if ("linkedinUrl" in body)
		patch.linkedinUrl = body.linkedinUrl
			? String(body.linkedinUrl).trim() || undefined
			: undefined;
	if ("twitterUrl" in body)
		patch.twitterUrl = body.twitterUrl
			? String(body.twitterUrl).trim() || undefined
			: undefined;

	return patch;
}

export function validateCreateTeamMemberInput(
	input: CreateTeamMemberRequest,
): string | null {
	if (!input.name) return "name is required";
	if (!input.position) return "position is required";
	return null;
}

export async function listTeamMembers(): Promise<TeamMember[]> {
	return listTeamMemberDocuments();
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
	return readTeamMemberDocumentById(id);
}

export async function createTeamMember(
	input: CreateTeamMemberRequest,
): Promise<TeamMember> {
	const now = new Date().toISOString();
	const id = generateTeamMemberId();
	const payload = { ...input, createdAt: now, updatedAt: now };
	await createTeamMemberDocument(id, payload);
	return { id, ...payload };
}

export async function updateTeamMember(
	id: string,
	patch: UpdateTeamMemberRequest,
): Promise<TeamMember | null> {
	const updatedAt = new Date().toISOString();
	return mergeTeamMemberDocument(id, { ...patch, updatedAt });
}

export async function deleteTeamMember(id: string): Promise<boolean> {
	return removeTeamMemberDocument(id);
}
