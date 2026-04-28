import { type QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { Job } from "../models/job.model.ts";
import { firebaseAdminDb } from "./admin-db.ts";

type StoredJob = Omit<Job, "id">;
const jobsCollection = firebaseAdminDb.collection("jobs");

function toJob(snapshot: QueryDocumentSnapshot): Job {
	const data = snapshot.data() as StoredJob;
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

export async function listJobDocuments(): Promise<Job[]> {
	const snapshot = await jobsCollection.get();
	return snapshot.docs.map(toJob);
}

export async function readJobDocumentById(id: string): Promise<Job | null> {
	const snapshot = await jobsCollection.doc(id).get();
	if (!snapshot.exists) return null;

	const data = snapshot.data() as StoredJob;
	return {
		id: snapshot.id,
		...data,
	};
}

export async function createJobDocument(
	id: string,
	payload: StoredJob,
): Promise<void> {
	await jobsCollection.doc(id).set(payload);
}

export async function mergeJobDocument(
	id: string,
	patch: Partial<StoredJob>,
): Promise<Job | null> {
	const docRef = jobsCollection.doc(id);
	const existingSnapshot = await docRef.get();
	if (!existingSnapshot.exists) return null;

	await docRef.set(cleanUndefined(patch as Record<string, unknown>), {
		merge: true,
	});

	const updatedSnapshot = await docRef.get();
	if (!updatedSnapshot.exists) return null;

	const updatedData = updatedSnapshot.data() as StoredJob;
	return {
		id: updatedSnapshot.id,
		...updatedData,
	};
}

export async function removeJobDocument(id: string): Promise<boolean> {
	const docRef = jobsCollection.doc(id);
	const snapshot = await docRef.get();
	if (!snapshot.exists) return false;

	await docRef.delete();
	return true;
}
