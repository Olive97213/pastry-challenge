"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export async function loginUser(
  formData: FormData
) {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;


try {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });

  console.log("LOGIN SUCCESS");

} catch (error) {

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Email ou mot de passe incorrect",
      };
    }

    throw error;
  }


  return {
    success: true,
  };
}