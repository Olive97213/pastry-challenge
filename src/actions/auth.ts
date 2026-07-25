"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";
import {
  registerSchema,
  type RegisterInput,
} from "@/schemas/auth.schema";

import type { ActionResponse } from "@/types/auth";


export async function registerUser(
  data: RegisterInput
): Promise<ActionResponse> {

  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Données invalides",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path[0]?.toString() ?? "",
        message: issue.message,
      })),
    };
  }

  const {
    username,
    email,
    password,
  } = validation.data;


  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);


  if (existingUser.length > 0) {
    return {
      success: false,
      message: "Cet email est déjà utilisé",
    };
  }


  const passwordHash = await hashPassword(password);


  await db.insert(users).values({
    username,
    email,
    passwordHash,
  });


  return {
    success: true,
    message: "Compte créé avec succès",
  };
}