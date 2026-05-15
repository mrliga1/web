"use client";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, User } from "firebase/auth";
import { firebaseApp, firebaseDatabase } from "./firebase";
import { ref, set, get, child } from "firebase/database";

function getAuthInstance() {
  if (!firebaseApp) {
    throw new Error("Firebase app is not initialized");
  }
  return getAuth(firebaseApp);
}

export async function signIn(email: string, password: string) {
  const auth = getAuthInstance();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function register(email: string, password: string, role = "editor") {
  const auth = getAuthInstance();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const u = cred.user;
  if (!firebaseDatabase) {
    throw new Error("Firebase database is not configured");
  }
  await set(ref(firebaseDatabase, `users/${u.uid}`), { email: u.email, role });
  return u;
}

export async function signOut() {
  const auth = getAuthInstance();
  await firebaseSignOut(auth);
}

export function onAuthStateChanged(cb: (user: User | null) => void) {
  const auth = getAuthInstance();
  return auth.onAuthStateChanged(cb);
}

export async function getUserRole(uid: string) {
  if (!firebaseDatabase) {
    return null;
  }
  const snapshot = await get(child(ref(firebaseDatabase), `users/${uid}/role`));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function getIdToken(forceRefresh = false) {
  const auth = getAuthInstance();
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
