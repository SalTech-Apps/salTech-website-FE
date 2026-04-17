import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import type { Page, PageListItem } from "@/types/firestore";

const PAGES_COLLECTION = "pages";
const PAGES_LIST_COLLECTION = "meta";
const PAGES_LIST_DOC_ID = "pagesList";

/**
 * Rebuild and write the lightweight pages list document from all pages.
 * Call this after create/update/delete of any page so the footer can load one doc.
 */
export async function syncPagesList(): Promise<void> {
  const snap = await getDocs(collection(db, PAGES_COLLECTION));
  const items: PageListItem[] = snap.docs
    .map((d) => {
      const data = d.data();
      const slug = data.slug ?? d.id;
      const title = data.title ?? slug;
      const order = typeof data.order === "number" ? data.order : 999;
      const showInFooter = data.showInFooter !== false;
      return { id: d.id, slug, title, order, showInFooter };
    })
    .sort((a, b) => a.order - b.order);

  await setDoc(doc(db, PAGES_LIST_COLLECTION, PAGES_LIST_DOC_ID), {
    items,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Read the pages list (for footer). Single document read.
 */
export async function getPagesList(): Promise<PageListItem[]> {
  const snap = await getDoc(doc(db, PAGES_LIST_COLLECTION, PAGES_LIST_DOC_ID));
  if (!snap.exists()) return [];
  const data = snap.data();
  return (data?.items ?? []) as PageListItem[];
}
