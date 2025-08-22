"use server"

import { cookies } from "next/headers";
import { auth, firestore } from "../../../firebase/server";

// This function deletes the user's favourites from Firestore before their account is deleted
// It is called in the DeleteAccountButton component after the user is reauthenticated
// but before the account is deleted. It ensures that all user data is cleaned up properly    

export const deleteUserFavourites = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if(!token) {
        return;
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        await firestore.collection("favourites").doc(decodedToken.uid).delete();
    } catch(e) {}
}