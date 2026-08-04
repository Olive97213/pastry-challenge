'use server';

import { signOut } from '@/auth';

/**
 * Déconnecte l'utilisateur.
 */
export async function logout() {
  await signOut({
    redirectTo: '/',
  });
}
