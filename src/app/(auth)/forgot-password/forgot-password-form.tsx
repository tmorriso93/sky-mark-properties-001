"use client"

import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../../firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// This component renders a form for users to enter their email address to reset their password.
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="w-full" type="submit">
        Reset Password
      </Button>
    </form>
  );
}