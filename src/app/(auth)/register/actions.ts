"use server"

import { error } from "console";
import { auth } from "../../../../firebase/server";
import { registerUserSchema } from "../../../../validation/registerUser";

// This function is used to register a new user
// It takes an object with email, password, passwordConfirm, and name
export const registerUser = async (data: {
    email:string;
    password: string;
    passwordConfirm: string;
    name: string;
    }) => {
        const validation = registerUserSchema.safeParse(data);

        if(!validation.success) {
            return {
                error: true,
                message: validation.error.issues[0]?.message ?? "An error occurered"
            }
        }

        try{
        await auth.createUser({
            displayName: data.name,
            email: data.email,
            password: data.password,
        });
    }catch(e: any) {
        return {
            error: true,
            message: e.message ?? "Could not register user",
        }
    }
};