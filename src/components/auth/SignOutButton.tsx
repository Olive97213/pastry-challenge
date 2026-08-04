'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

/**
 * Bouton de déconnexion.
 */
export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    try {
      setIsLoading(true);

      toast.success('À bientôt !');

      await signOut({
        callbackUrl: '/',
      });
    } catch (error) {
      console.error(error);

      toast.error('Impossible de se déconnecter.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="destructive" onClick={handleSignOut} disabled={isLoading}>
      <LogOut className="mr-2 h-4 w-4" />

      {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  );
}
