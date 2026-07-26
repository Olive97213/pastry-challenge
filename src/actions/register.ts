"use server";

import { eq, or } from "drizzle-orm";

import { db } from "@/db/client";
import { users } from "@/db/schema";

import {
  registerSchema,
  type RegisterInput,
} from "@/schemas/auth.schema";

import {
  hashPassword,
} from "@/lib/password";

import type {
  ActionResponse,
} from "@/types/auth";


/**
 * Création d'un nouveau compte utilisateur.
 *
 * Étapes :
 * 1. Validation des données avec Zod
 * 2. Vérification de l'existence du compte
 * 3. Hash du mot de passe
 * 4. Création de l'utilisateur en base
 */
export async function registerUser(
  data: RegisterInput
): Promise<ActionResponse> {


  /**
   * Validation des données reçues.
   */
  const validation = registerSchema.safeParse(data);


  if (!validation.success) {

    return {
      success: false,
      message: "Données invalides",

      errors: validation.error.issues.map(
        (issue) => ({
          field: issue.path[0]?.toString() ?? "",
          message: issue.message,
        })
      ),
    };
  }


  const {
    username,
    email,
    password,
  } = validation.data;



  /**
   * Vérifie si un utilisateur existe déjà
   * avec le même email ou le même pseudo.
   */
  const existingUser =
    await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(
        or(
          eq(users.email, email),
          eq(users.username, username)
        )
      )
      .limit(1);



  if (existingUser.length > 0) {

    return {
      success: false,
      message:
        "Cet email ou ce pseudo est déjà utilisé",
    };
  }



  /**
   * Hash du mot de passe avant stockage.
   *
   * Le mot de passe en clair
   * n'est jamais enregistré en base.
   */
  const passwordHash =
    await hashPassword(password);



  /**
   * Création du nouvel utilisateur.
   *
   * Le champ username du formulaire
   * correspond à la colonne username
   * mais est exposé sous le nom "name"
   * par Drizzle.
   */
  await db.insert(users).values({

    username,

    email,

    passwordHash,

  });



  return {
    success: true,
    message:
      "Compte créé avec succès",
  };
}