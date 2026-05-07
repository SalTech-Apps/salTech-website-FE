import { atom } from "jotai";
import type { GetApiJobsByIdResponse } from "@/client";

export type JobResponseSchema = GetApiJobsByIdResponse["data"];

export const JobAtom = atom<null | JobResponseSchema>(null);
