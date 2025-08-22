"use client"

import ContinueWithGoogleButton from "@/components/continue-with-google";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUserSchema } from "../../../../validation/registerUser";
import { registerUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// This component is used to register a new user
// It uses react-hook-form for form handling and zod for validation
// The form includes fields for name, email, password, and password confirmation
// The form will be submitted to the server for processing
// The form also includes a button to continue with Google authentication

export default function RegisterForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
        },
    });

    const handleSubmit = async (data:z.infer<typeof registerUserSchema>) => {
        const response = await registerUser(data)
        
        if(!!response?.error) {
            toast.error("Error!",{
                description: response.message,
            });
            return;
        }

        toast.success("Success!", {
            description: "Your account was created successfully!",
        });

        router.push("/login");
    };

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
            <FormField  
                control={form.control} 
                name="name" 
                render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>
                            Your name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter your name" />
                        </FormControl>
                        <FormMessage  />
                    </FormItem>
                )
            }} />
            <FormField  
                control={form.control} 
                name="email" 
                render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage  />
                    </FormItem>
                )
            }} />
            <FormField  
                control={form.control} 
                name="password" 
                render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Password" type="password" />
                        </FormControl>
                        <FormMessage  />
                    </FormItem>
                )
            }} />
            <FormField  
                control={form.control} 
                name="passwordConfirm" 
                render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>
                            Confirm Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Confirm Password" type="password" />
                        </FormControl>
                        <FormMessage  />
                    </FormItem>
                )
            }} />
            <Button type="submit">
                Register
            </Button>
            <div className="text-center pb-4">or</div>
            </fieldset>
        </form>
        <ContinueWithGoogleButton  />
    </Form>
}