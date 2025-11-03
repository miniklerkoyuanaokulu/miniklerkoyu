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
  let q = query(postsRef, orderBy("order", "asc"));
  
  if (activeOnly) {
    q = query(postsRef, where("isActive", "==", true), orderBy("order", "asc"));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as InstagramPost[];
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


