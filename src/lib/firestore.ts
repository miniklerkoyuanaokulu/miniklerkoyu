import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { PreApplication } from "./types";

export async function savePreApplication(input: Omit<PreApplication, "status" | "createdAt">) {
  const doc = await addDoc(collection(db, "preApplications"), {
    ...input,
    status: "new",
    createdAt: serverTimestamp(),
  });
  return doc.id;
}


