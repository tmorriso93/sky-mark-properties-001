"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";
import { useAuth } from "../../../../../context/auth";
import { removeToken } from "../../../../../context/actions";
import { deleteObject, ref, UploadTask } from "firebase/storage";
import { storage } from "../../../../../firebase/client";
import { deleteProperty } from "./actions";
import { useRouter } from "next/navigation";

// This component renders a button to delete a property
// It uses an alert dialog to confirm the action and deletes the property from Firestore and its images from Firebase Storage.
export default function DeletePropertyButton({

  propertyId,
  images = [],              
}: {
  propertyId: string;
//   images?: string[];        
  images: string[];        
}) {

    const router = useRouter()
    const auth = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);


    const handleDeleteClick = async () => {
        const token = await auth?.currentUser?.getIdToken();

        if(!token) {
            return;
        }

        setIsDeleting(true);

        const storageTasks: Promise<void>[] = [];

         images.forEach((image) => {
            storageTasks.push(deleteObject(ref(storage, image)));
          });

          await Promise.all(storageTasks);

          await deleteProperty(propertyId, token);
          setIsDeleting(false);
          router.push("/admin-dashboard");

        };

        // Render the delete property button with an alert dialog
    return ( 
         <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <TrashIcon  />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this property?
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                         <div>
                        This action cannot be undone. This will permanently delete this property. 
                       
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleDeleteClick} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Property"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
    )
}