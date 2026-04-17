import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase.client";

export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadPropertyImages(
  propertyId: string,
  mainImage: File | null,
  thumbnailFiles: File[]
): Promise<{ mainUrl: string | null; thumbnailUrls: string[] }> {
  let mainUrl: string | null = null;
  if (mainImage) {
    mainUrl = await uploadImage(
      mainImage,
      `images/properties/${propertyId}/main_${Date.now()}_${mainImage.name}`
    );
  }

  const thumbnailUrls = await Promise.all(
    thumbnailFiles.map((file, i) =>
      uploadImage(
        file,
        `images/properties/${propertyId}/thumb_${Date.now()}_${i}_${file.name}`
      )
    )
  );

  return { mainUrl, thumbnailUrls };
}

export async function uploadInsightImage(
  insightId: string,
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/insights/${insightId}/cover_${Date.now()}_${file.name}`
  );
}

/** Upload banner image for a page. Use pageId or "new" / draft id for new pages. */
export async function uploadPageBannerImage(
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/pages/banner_${Date.now()}_${file.name}`
  );
}

/** Upload in-editor image for page content. Use pageId or draft id for new pages. */
export async function uploadPageContentImage(
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/pages/content_${Date.now()}_${file.name}`
  );
}

export async function uploadProjectImage(
  projectId: string,
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/projects/${projectId}/cover_${Date.now()}_${file.name}`
  );
}

export async function uploadTeamMemberImage(
  teamMemberId: string,
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/team/${teamMemberId}/profile_${Date.now()}_${file.name}`
  );
}

export async function uploadOffPlanImage(
  offPlanId: string,
  file: File
): Promise<string> {
  return uploadImage(
    file,
    `images/offPlan/${offPlanId}/cover_${Date.now()}_${file.name}`
  );
}

export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch {
    // Ignore if file doesn't exist
  }
}

/**
 * Extract storage path from a Firebase Storage download URL.
 * URL format: .../v0/b/BUCKET/o/ENCODED_PATH?alt=media&token=...
 */
export function getStoragePathFromDownloadUrl(url: string): string | null {
  try {
    const m = url.match(/\/o\/([^?]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

/** Delete a file in our storage by its download URL (e.g. from editor content). */
export async function deleteImageByUrl(url: string): Promise<void> {
  const path = getStoragePathFromDownloadUrl(url);
  if (path) await deleteImage(path);
}

/** Extract image URLs that point to our Firebase Storage from markdown/HTML content. */
export function extractStorageImageUrls(content: string): string[] {
  const urls: string[] = [];
  const storageHost = "firebasestorage.googleapis.com";
  // Markdown images: ![alt](url) or ![](url)
  const mdRe = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = mdRe.exec(content)) !== null) {
    if (m[1].includes(storageHost)) urls.push(m[1].split("?")[0]);
  }
  // HTML img: <img ... src="url" ...> or src='url'
  const imgRe = /<img[^>]+src=["'](https?:\/\/[^"'\s]+)["']/gi;
  while ((m = imgRe.exec(content)) !== null) {
    if (m[1].includes(storageHost)) urls.push(m[1].split("?")[0]);
  }
  return [...new Set(urls)];
}
