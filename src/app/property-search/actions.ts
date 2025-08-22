"use server"

import { FieldValue } from "firebase-admin/firestore";
import { auth, firestore } from "../../../firebase/server";

export const removeFavourite = async (propertyId: string, authToken: string) => {
     const verifiedToken = await auth.verifyIdToken(authToken);

    if(!verifiedToken) {
        return {
            error: true,
            message: "Unauthrized"
        }
    }

    await firestore
        .collection("favourites")
        .doc(verifiedToken.uid)
        .update({
            [propertyId]: FieldValue.delete(),
        })
}

export const addFavourite = async (propertyId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if(!verifiedToken) {
        return {
            error: true,
            message: "Unauthrized"
        }
    }

    await firestore
        .collection("favourites")
        .doc(verifiedToken.uid)
        .set(
            {
            [propertyId]: true,
    },
    {
        merge: true,
    }
    );
}