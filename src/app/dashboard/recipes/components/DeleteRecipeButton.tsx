'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { deleteRecipe } from '@/actions/recipes/deleteRecipe';

import { Button } from '@/components/ui/button';

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

export default function DeleteRecipeButton({ recipeId }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);

      const result = await deleteRecipe(recipeId);

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert('Une erreur est survenue.');
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
          <AlertDialogCancel>Annuler</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
