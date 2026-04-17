import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, functions, httpsCallable } from "@/lib/firebase.client";
import { COLLECTION } from "./survey.constants";
import { emailToDocPart, markWeekAsSubmitted } from "./survey.device";
import type { FormValues } from "./survey.schema";

type DuplicateReason = "email" | "device";
export type SubmitSurveyOutcome =
  | { kind: "submitted" }
  | { kind: "duplicate"; reason: DuplicateReason };

function isPermissionDeniedError(error: unknown): boolean {
  return (error as { code?: unknown } | undefined)?.code === "permission-denied";
}

export async function submitSurveyResponse({
  data,
  deviceId,
  deviceFingerprint,
}: {
  data: FormValues;
  deviceId: string;
  deviceFingerprint: string;
}): Promise<SubmitSurveyOutcome> {
  const technicalDetailsTrimmed = (data.technicalPerformanceDetails ?? "").trim();
  const docId = `${emailToDocPart(data.email)}_${data.weekKey}`;
  const emailDocRef = doc(db, COLLECTION, docId);

  let emailDocSnap;
  try {
    emailDocSnap = await getDoc(emailDocRef);
  } catch (checkEmailErr) {
    if (isPermissionDeniedError(checkEmailErr)) {
      emailDocSnap = null;
    } else {
      throw checkEmailErr;
    }
  }
  if (emailDocSnap?.exists()) {
    markWeekAsSubmitted(data.weekKey);
    return { kind: "duplicate", reason: "email" };
  }

  let duplicateDeviceIdSnap = null;
  if (deviceId !== "unknown_device") {
    try {
      duplicateDeviceIdSnap = await getDocs(
        query(
          collection(db, COLLECTION),
          where("weekKey", "==", data.weekKey),
          where("deviceId", "==", deviceId),
          limit(1),
        ),
      );
    } catch (duplicateDeviceErr) {
      if (isPermissionDeniedError(duplicateDeviceErr)) {
        duplicateDeviceIdSnap = null;
      } else {
        throw duplicateDeviceErr;
      }
    }
  }

  let duplicateFingerprintSnap = duplicateDeviceIdSnap;
  if (!duplicateDeviceIdSnap || duplicateDeviceIdSnap.empty) {
    try {
      duplicateFingerprintSnap = await getDocs(
        query(
          collection(db, COLLECTION),
          where("weekKey", "==", data.weekKey),
          where("deviceFingerprint", "==", deviceFingerprint),
          limit(1),
        ),
      );
    } catch (duplicateFingerprintErr) {
      if (isPermissionDeniedError(duplicateFingerprintErr)) {
        duplicateFingerprintSnap = null;
      } else {
        throw duplicateFingerprintErr;
      }
    }
  }
  if (duplicateFingerprintSnap && !duplicateFingerprintSnap.empty) {
    markWeekAsSubmitted(data.weekKey);
    return { kind: "duplicate", reason: "device" };
  }

  const writePayload = {
    email: data.email,
    weekKey: data.weekKey,
    deviceId,
    deviceFingerprint,
    deviceInfo: data.deviceInfo,
    firstImpression: data.firstImpression,
    navigationEaseRating: data.navigationEaseRating,
    contentDepth: data.contentDepth,
    technicalPerformance: data.technicalPerformance,
    ...(data.technicalPerformance === "significant_issues"
      ? { technicalPerformanceDetails: technicalDetailsTrimmed }
      : {}),
    investorLensText: data.investorLensText.trim(),
    futureInterest: data.futureInterest,
    sectionsVisited: data.sectionsVisited,
    likelihoodToInvest: data.likelihoodToInvest,
    missingMostText: data.missingMostText.trim(),
    createdAt: serverTimestamp(),
  };

  await setDoc(emailDocRef, writePayload);

  try {
    const sendSurveySubmissionEmail = httpsCallable<{ email: string }, { success: boolean }>(
      functions,
      "sendSurveySubmissionEmail",
    );
    await sendSurveySubmissionEmail({ email: data.email }).then(() => {
      markWeekAsSubmitted(data.weekKey);
    });

  } catch {
    // Ignore email notification failures; submission is already saved.
  }

  return { kind: "submitted" };
}
