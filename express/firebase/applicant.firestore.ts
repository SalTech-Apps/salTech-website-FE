import { type QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { Applicant } from "../models/applicant.model.ts";
import { firebaseAdminDb } from "./admin-db.ts";

type StoredApplicant = Omit<Applicant, "id">;

const applicantsCollection = firebaseAdminDb.collection("applicants");

function toApplicant(snapshot: QueryDocumentSnapshot): Applicant {
	const data = snapshot.data() as StoredApplicant;
	return {
		id: snapshot.id,
		...data,
	};
}

function cleanUndefined(
	value: Record<string, unknown>,
): Record<string, unknown> {
	return Object.fromEntries(
		Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined),
	);
}

export async function listApplicantDocuments(): Promise<Applicant[]> {
	const snapshot = await applicantsCollection.get();
	return snapshot.docs.map(toApplicant);
}

export async function listApplicantsByJobId(
	jobId: string,
): Promise<Applicant[]> {
	const snapshot = await applicantsCollection.where("jobId", "==", jobId).get();
	return snapshot.docs.map(toApplicant);
}

export async function readApplicantDocumentById(
	id: string,
): Promise<Applicant | null> {
	const snapshot = await applicantsCollection.doc(id).get();
	if (!snapshot.exists) return null;

	const data = snapshot.data() as StoredApplicant;
	return {
		id: snapshot.id,
		...data,
	};
}

export async function createApplicantDocument(
	id: string,
	payload: StoredApplicant,
): Promise<void> {
	await applicantsCollection.doc(id).set(payload);
}

export async function mergeApplicantDocument(
	id: string,
	patch: Partial<StoredApplicant>,
): Promise<Applicant | null> {
	const docRef = applicantsCollection.doc(id);
	const existingSnapshot = await docRef.get();
	if (!existingSnapshot.exists) return null;

	await docRef.set(cleanUndefined(patch as Record<string, unknown>), {
		merge: true,
	});

	const updatedSnapshot = await docRef.get();
	if (!updatedSnapshot.exists) return null;

	const updatedData = updatedSnapshot.data() as StoredApplicant;
	return {
		id: updatedSnapshot.id,
		...updatedData,
	};
}

export async function removeApplicantDocument(id: string): Promise<boolean> {
	const docRef = applicantsCollection.doc(id);
	const snapshot = await docRef.get();
	if (!snapshot.exists) return false;

	await docRef.delete();
	return true;
}
