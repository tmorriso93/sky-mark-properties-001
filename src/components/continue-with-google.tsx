"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/navigation";

export default function ContinueWithGoogleButton() {
    const auth = useAuth();
    const router = useRouter();

    return (
        <Button 
        variant="outline"
            onClick={async () => {
                try{
                     await auth?.loginWithGoogle();
                    router.refresh();
                }catch(e) {}
        }}
        className="w-full"
        >
            Continue with Google
        </Button>
    )
}