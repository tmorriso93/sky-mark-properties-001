"use client"

import { HeartIcon } from "lucide-react"
import { addFavourite, removeFavourite } from "./actions"
import { useAuth } from "../../../context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function ToggleFavouriteButton({
    propertyId, 
    isFavourite
}: {
    propertyId: string;
    isFavourite: boolean;
}) {
    const auth = useAuth();
    const router = useRouter();
    return (

        <button 
        className="absolute top-0 right-0 z-10 p-2 bg-white/60 rounded-md" //You can add bg-white for white background
        //on click check if user is logged in      
        onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if(!tokenResult){
            //navigate user to /login
            router.push("/login");
            return;
        }
        if(isFavourite){
            await removeFavourite(propertyId, tokenResult.token);
        } else { 
        await addFavourite(propertyId, tokenResult.token)
        } 
        // router.refresh();

        toast.success(
             `Property ${isFavourite ? "removed from" : "added to"} favourites`
        )


        router.refresh();
    }}
    >
        <HeartIcon 
            className="text-slate-600" 
            fill={isFavourite ? "#db2777" : "white"}
             />
    </button>
    );
}