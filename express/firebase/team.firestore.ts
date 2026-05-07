import { type QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { TeamMember } from "../models/team.model.ts";
import { firebaseAdminDb } from "./admin-db.ts";

type StoredTeamMember = Omit<TeamMember, "id">;

const teamMembersCollection = firebaseAdminDb.collection("team-members");

function toTeamMember(snapshot: QueryDocumentSnapshot): TeamMember {
	const data = snapshot.data() as StoredTeamMember;
	return { id: snapshot.id, ...data };
}

function cleanUndefined(
	value: Record<string, unknown>,
): Record<string, unknown> {
	return Object.fromEntries(
		Object.entries(value).filter(([, v]) => v !== undefined),
	);
}

export async function listTeamMemberDocuments(): Promise<TeamMember[]> {
	const snapshot = await teamMembersCollection
		.orderBy("createdAt", "asc")
		.get();
	return snapshot.docs.map(toTeamMember);
}

export async function readTeamMemberDocumentById(
	id: string,
): Promise<TeamMember | null> {
	const snapshot = await teamMembersCollection.doc(id).get();
	if (!snapshot.exists) return null;
	const data = snapshot.data() as StoredTeamMember;
	return { id: snapshot.id, ...data };
}

export async function createTeamMemberDocument(
	id: string,
	payload: StoredTeamMember,
): Promise<void> {
	await teamMembersCollection.doc(id).set(payload);
}

export async function mergeTeamMemberDocument(
	id: string,
	patch: Partial<StoredTeamMember>,
): Promise<TeamMember | null> {
	const docRef = teamMembersCollection.doc(id);
	const existing = await docRef.get();
	if (!existing.exists) return null;

	await docRef.set(cleanUndefined(patch as Record<string, unknown>), {
		merge: true,
	});

	const updated = await docRef.get();
	if (!updated.exists) return null;

	return { id: updated.id, ...(updated.data() as StoredTeamMember) };
}

export async function removeTeamMemberDocument(id: string): Promise<boolean> {
	const docRef = teamMembersCollection.doc(id);
	const existing = await docRef.get();
	if (!existing.exists) return false;
	await docRef.delete();
	return true;
}
