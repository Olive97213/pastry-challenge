'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteRecipe } from '@/actions/recipes/deleteRecipe';

import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  recipeId: string;
};

/**
 * Bouton de suppression
 * d'une recette.
 */
export default function DeleteRecipeButton({ recipeId }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);

      const result = await deleteRecipe(recipeId);

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error('Erreur suppression recette :', error);

      toast.error('Une erreur est survenue lors de la suppression.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer cette recette ?</AlertDialogTitle>

          <AlertDialogDescription>
            Cette action est définitive. Tous les ingrédients associés seront
            également supprimés.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
