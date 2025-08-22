"use client";

import { z } from "zod";
import { passwordValidation } from "../../validation/registerUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContinueWithGoogleButton from "@/components/continue-with-google";
import Link from "next/link";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().email(),
    password: passwordValidation,
})

export default function LoginForm({
    onSuccess
}: { 
    onSuccess?: () => void;
}) {
    
    // const {toast} = useToast();
    const auth = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",   
        }
    });



    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
        await auth?.loginWithEmail(data.email, data.password);
       onSuccess?.();
        
        toast.success("Success!", {
        description: "You have logged in successfully.",
        });
    } catch (e: any) {
        console.log({e});
        toast.error("Error!", {
        description:
            e.code === "auth/invalid-credential"
            ? "Incorrect credentials"
            : "An error occurred",
        });
    }
    };

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <fieldset disabled={form.formState.isSubmitting}>
                <div className="flex flex-col gap-2">
            <FormField 
            
            control={form.control} 
            name="email" 
            render={({field}) => {
                return (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Email" className=""/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }} 
            />
             <FormField 
             control={form.control} 
             name="password" 
             render={({field}) => {
                return (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Password" type="password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }} 
            />
            <Button type="submit" >
                Login
            </Button>
            </div>
              <div className="pt-4 ">
                Forgotten your passowrd?
                <Link href="/forgot-password" 
                className="pl-2  underline">Reset it here.
                </Link>
            </div>
              <div className="text-center pb-2">or</div>
              </fieldset>
        </form>
         <ContinueWithGoogleButton  />
    </Form>
    )
}