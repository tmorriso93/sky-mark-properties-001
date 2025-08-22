"use client"

import Link from "next/link";
import { useAuth } from "../../context/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
    const router = useRouter();
    const auth = useAuth();

    return (
        <div>
           {!!auth?.currentUser && (
           <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {!!auth.currentUser.photoURL && (
                    <Image
                        src={auth.currentUser.photoURL}
                        alt={`${auth.currentUser.displayName} avatar`} 
                        width={70}
                        height={70}
                    />
                    )}
                    <AvatarFallback className="text-sky-950">
                        {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div>{auth.currentUser.displayName}</div>
                    <div className="font-normal text-xs">{auth.currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                {!!auth.customClaims?.admin && (
                <DropdownMenuItem asChild>
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
                )}
                {!auth.customClaims?.admin && (
                <DropdownMenuItem asChild>
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
                )} 
                <DropdownMenuItem asChild>
                    <Link href="/account/my-favourites">My Favourites</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={async () => {
                    await auth.logout();
                    router.refresh();
                 }}
                 >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
        )}
        {!auth?.currentUser && 
             <div className="flex gap-2 items-center">
                <Link href={"/login"} 
                className="uppercase tracking-widest hover:underline">
                  Login
                </Link>
                <div className="h-8 w-[1px] bg-white/50" />
                <Link href={"/register"} 
                className="uppercase tracking-widest hover:underline">
                  Signup
                </Link>
        </div>
        }
        </div>
    )
}