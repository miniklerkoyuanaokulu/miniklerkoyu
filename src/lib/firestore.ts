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
import type { PreApplication, InstagramPost } from "./types";

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
  
  // Basit query - sadece orderBy (index gerektirmez)
  const q = query(itemsRef, orderBy("createdAt", "desc"));
  
  const snapshot = await getDocs(q);
  let items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  // Client-side filtreleme (index gerekmez)
  if (type) {
    items = items.filter((item: any) => item.type === type);
  }
  
  return items;
}

export async function addMediaItem(input: {
  url: string;
  type: "image" | "video" | "press";
  caption?: string;
  tags?: string[];
}) {
  const docRef = await addDoc(collection(db, "mediaItems"), {
    ...input,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateMediaItem(
  id: string,
  input: Partial<{
    caption: string;
    tags: string[];
  }>
) {
  const docRef = doc(db, "mediaItems", id);
  await updateDoc(docRef, input);
}

export async function deleteMediaItem(id: string) {
  const docRef = doc(db, "mediaItems", id);
  await deleteDoc(docRef);
}


