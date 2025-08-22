"use client"
import LoginForm from "@/components/login-form";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./actions";

// if user isn't logged in and clicks on a heart to favourite a home, a login modal will pop up
export default function LoginModal() {
    const router = useRouter();
    return (
    <Dialog 
        open 
        onOpenChange={() => {
            router.back();
    }}
    >
        {/* login modal */}
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Login
                </DialogTitle>
                <DialogDescription>
                    You must be loggin in to favourite a property
                </DialogDescription>
            </DialogHeader>
            <div>
                <LoginForm onSuccess={async () => {
                    await loginSuccess();
                    router.back();
                }} />
            </div>
            <DialogFooter className="block">
                Don&apos;t have an account?
                <Link className="underline pl-2" href="/register">Register here.</Link>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}