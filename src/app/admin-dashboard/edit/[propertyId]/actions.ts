"use server"

import { revalidatePath } from "next/cache";
import { auth, firestore } from "../../../../../firebase/server";
import { Property } from "../../../../../types/property"
import { propertyDataSchema } from "../../../../../validation/propertySchema";

// This file contains server actions for editing properties in the admin dashboard.
export const deleteProperty = async (propertyId: string, authToken: string) => {
   const verifiedToken = await auth.verifyIdToken(authToken);

   if(!verifiedToken.admin) {
    return {
        error: true,
        message: "Unauthorized",
    };
   }

   await firestore.collection("properties").doc(propertyId).delete();
} 

// This function updates a property in the database.
// It first verifies the admin token, then validates the property data,
// and finally updates the property in the Firestore database.
// If any step fails, it returns an error message.
export const updateProperty = async (data: Property, authToken: string) => {
     const { id, ...propertyData} = data;
   const verifiedToken = await auth.verifyIdToken(authToken);

   if(!verifiedToken.admin) {
    return {
        error: true,
        message: "Unauthorized",
    };
   }

   const validation = propertyDataSchema.safeParse(propertyData);
   if(!validation.success){
    return {
        error: true,
        message: validation.error.issues[0]?.message ?? "An error occurred",
    };
   }

   await firestore
    .collection("properties")
    .doc(id)
    .update({
     ...propertyData,
     updated: new Date(),
   });

   revalidatePath(`/property/${id}`);
}