"use client"

import z from "zod"
import { passwordValidation } from "../../../validation/registerUser"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../context/auth";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { toast } from "sonner";

// Define the schema for the update password form
// It includes current password, new password, and confirm new password fields

const formSchema = z.object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    newPasswordConfirm: z.string(),
})
.superRefine((data, ctx) => {
    if(data.newPassword !== data.newPasswordConfirm) {
        ctx.addIssue({
            message: "Passwords do not match",
            path: ["newPasswordConfirm"],
            code: "custom",
        });
    }
});

export default function UpdatePasswordForm() {
    const auth = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const user = auth?.currentUser;
        if(!user?.email) {
            return;
        }

        try {
            // Reauthenticate the user with the current password
           await reauthenticateWithCredential(
            user, 
            EmailAuthProvider.credential(user.email, data.currentPassword)
        );
     await updatePassword(user, data.newPassword);
      toast.success("Password updated successfully");
      form.reset();
    } catch (e: any) {
      console.log({ e });
      toast(
        e.code === "auth/invalid-credential"
          ? "Your current password is incorrect"
          : "An error occurred"
      );
    }
  };

    return (
        <div className="pt-5 mt-5 border-t">
            <h2 className="text-2xl font-bold pb-2">
                Update Passsword
            </h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset className="flex flex-col gap-4" disabled={form.formState.isSubmitting}>
            <FormField control={form.control} 
            name="currentPassword" 
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Current Password
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Current Password" type="password" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
             <FormField control={form.control} 
             name="newPassword" 
             render={({field}) => (
                <FormItem>
                    <FormLabel>
                        New Password
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="New Password" type="password" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
                   <FormField control={form.control} 
             name="newPasswordConfirm" 
             render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Confirm New Password
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Confirm New Password" type="password" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
            <Button type="submit">
                Update Password
            </Button>
            </fieldset>
        </form>
    </Form>
    </div>
    );
};