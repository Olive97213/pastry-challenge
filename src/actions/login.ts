'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import type { ActionResponse } from '@/types/auth';

/**
 * Authentifie un utilisateur avec Auth.js.
 *
 * Le contrôle du mot de passe est effectué
 * dans le provider Credentials de auth.ts.
 */
export async function loginUser(formData: FormData): Promise<ActionResponse> {
  /**
   * Récupération sécurisée des données du formulaire.
   */
  const email = formData.get('email');

  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      success: false,
      message: 'Données invalides',
    };
  }

  try {
    /**
     * Authentification via Auth.js.
     *
     * redirectTo permet de rediriger
     * après une connexion réussie.
     */
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    /**
     * Erreur générée par Auth.js
     * lorsque les identifiants sont incorrects.
     */
    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'Email ou mot de passe incorrect',
      };
    }

    /**
     * Les autres erreurs doivent remonter
     * pour être traitées comme erreurs serveur.
     */
    throw error;
  }

  return {
    success: true,
    message: 'Connexion réussie',
  };
}
