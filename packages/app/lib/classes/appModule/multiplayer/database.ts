import type { Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface User {
  username: string;
  createDate: Date;
}

export async function createUser(
  db: Firestore,
  userId: string,
  { username }: { username: string }
) {
  const userDocRef = doc(db, 'users', userId);
  const user = { username, createDate: new Date() };
  await setDoc(userDocRef, user);
  return user as User;
}

export async function getUser(
  db: Firestore,
  userId: string
): Promise<{ username: string; createDate: Date } | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data() as User;
  } else {
    return null;
  }
}

export async function hasUser(db: Firestore, userId: string) {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists();
}
