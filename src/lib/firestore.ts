import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";
import type { PreApplication, InstagramPost, Announcement } from "./types";

export async function savePreApplication(input: Omit<PreApplication, "status" | "createdAt">) {
  const doc = await addDoc(collection(db, "preApplications"), {
    ...input,
    status: "new",
    createdAt: serverTimestamp(),
  });
  return doc.id;
}

// ========== Instagram Posts CRUD ==========

export async function getInstagramPosts(activeOnly = false) {
  const postsRef = collection(db, "instagramPosts");
  
  // Basit query - sadece orderBy (index gerektirmez)
  const q = query(postsRef, orderBy("order", "asc"));
  
  const snapshot = await getDocs(q);
  let posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as InstagramPost[];
  
  // Client-side filtreleme (index gerekmez)
  if (activeOnly) {
    posts = posts.filter((p) => p.isActive === true);
  }
  
  return posts;
}

export async function addInstagramPost(
  input: Omit<InstagramPost, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(collection(db, "instagramPosts"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateInstagramPost(
  id: string,
  input: Partial<Omit<InstagramPost, "id" | "createdAt">>
) {
  const docRef = doc(db, "instagramPosts", id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteInstagramPost(id: string) {
  const docRef = doc(db, "instagramPosts", id);
  await deleteDoc(docRef);
}

export async function getInstagramPost(id: string) {
  const docRef = doc(db, "instagramPosts", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as InstagramPost;
  }
  return null;
}

// ========== Media Items CRUD ==========

export async function getMediaItems(type?: "image" | "video" | "press") {
  const itemsRef = collection(db, "mediaItems");
  
  // Basit query - tüm dökümanları çek
  const snapshot = await getDocs(itemsRef);
  let items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  // Client-side filtreleme ve sıralama
  if (type) {
    items = items.filter((item: any) => item.type === type);
  }
  
  // Order field'ı varsa ona göre, yoksa createdAt'e göre sırala
  items.sort((a: any, b: any) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // Order yoksa createdAt'e göre sırala (yeni → eski)
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
  
  return items;
}

export async function addMediaItem(input: {
  url: string;
  type: "image" | "video" | "press";
  caption?: string;
  tags?: string[];
  order?: number;
}) {
  // Order belirtilmemişse, mevcut en büyük order + 1
  let order = input.order ?? 0;
  if (!input.order) {
    const items = await getMediaItems(input.type);
    if (items.length > 0) {
      const maxOrder = Math.max(...items.map((i: any) => i.order || 0));
      order = maxOrder + 1;
    }
  }
  
  const docRef = await addDoc(collection(db, "mediaItems"), {
    ...input,
    order,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateMediaItem(
  id: string,
  input: Partial<{
    caption: string;
    tags: string[];
    order: number;
  }>
) {
  const docRef = doc(db, "mediaItems", id);
  await updateDoc(docRef, input);
}

// Toplu order güncelleme (Drag & Drop için)
export async function updateMediaItemsOrder(items: { id: string; order: number }[]) {
  const promises = items.map((item) => {
    const docRef = doc(db, "mediaItems", item.id);
    return updateDoc(docRef, { order: item.order });
  });
  
  await Promise.all(promises);
}

export async function deleteMediaItem(id: string) {
  const docRef = doc(db, "mediaItems", id);
  await deleteDoc(docRef);
}

// ========== Announcements CRUD ==========

export async function getAnnouncements() {
  const announcementsRef = collection(db, "announcements");
  const q = query(announcementsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Announcement[];
}

export async function getAnnouncementBySlug(slug: string) {
  const announcementsRef = collection(db, "announcements");
  const q = query(announcementsRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Announcement;
}

export async function addAnnouncement(
  input: Omit<Announcement, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(collection(db, "announcements"), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateAnnouncement(
  id: string,
  input: Partial<Omit<Announcement, "id" | "createdAt">>
) {
  const docRef = doc(db, "announcements", id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteAnnouncement(id: string) {
  const docRef = doc(db, "announcements", id);
  await deleteDoc(docRef);
}


