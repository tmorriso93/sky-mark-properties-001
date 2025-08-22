"use client"

import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import { useAuth } from "../../../../context/auth";
import { removeFavourite } from "@/app/property-search/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RemoveFavouriteButton({propertyId}: {
    propertyId: string
}) {
    const auth = useAuth();
     const router = useRouter();
    return (
        // this button will remove properties from the list of favourites
        <Button variant="outline" onClick={async () => {
            const tokenResult = await auth?.currentUser?.getIdTokenResult();
            if(!tokenResult) {
                return;
            }
            await removeFavourite(propertyId, tokenResult.token);
            // toaster popup notification when property is removed
            toast.success("Property removed from favourites");
            router.refresh();
        }}>
                <Trash2Icon />
        </Button>
    )
}