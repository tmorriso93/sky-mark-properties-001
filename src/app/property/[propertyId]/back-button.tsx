"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BackButton() {
    const router = useRouter();
    return (
        // Back button component to return to the previous page
        <Button variant="link" onClick={() => router.back()}>
                <ArrowLeftIcon /> Back
            </Button>
    );
}