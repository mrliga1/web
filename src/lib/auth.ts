"use client";

import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged as onAuthStateChangedFn, User } from "firebase/auth";
import { ref, set, get, child } from "firebase/database";
import { firebaseDatabase } from "./firebase";

export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: unknown) {
    console.error("Auth signIn error:", err);
    throw err;
  }
}

export async function register(email: string, password: string, role = "editor") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const u = cred.user;
  if (!firebaseDatabase) {
    throw new Error("Firebase database is not configured");
  }
  await set(ref(firebaseDatabase, `users/${u.uid}`), { email: u.email, role });
  return u;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return onAuthStateChangedFn(auth, cb);
}

export async function getUserRole(uid: string) {
  if (!firebaseDatabase) {
    return null;
  }
  const snapshot = await get(child(ref(firebaseDatabase), `users/${uid}/role`));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function getIdToken(forceRefresh = false) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated");
  }
  return await user.getIdToken(forceRefresh);
}

export async function setUserRole(uid: string, role: string) {
  if (!firebaseDatabase) {
    throw new Error("Firebase database is not configured");
  }
  await set(ref(firebaseDatabase, `users/${uid}/role`), role);
}
