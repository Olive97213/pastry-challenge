'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

import { createRecipe } from '@/actions/recipes/createRecipe';
import { updateRecipe } from '@/actions/recipes/updateRecipe';

/**
 * Propriétés du composant.
 */
type Props = {
  /**
   * Identifiant de la recette.
   *
   * Présent uniquement en mode modification.
   */
  recipeId?: string;
};

/**
 * Actions principales de l'éditeur.
 *
 * Le composant fonctionne en deux modes :
 *
 * - création si recipeId est absent ;
 * - modification si recipeId est présent.
 */
export default function EditorActions({ recipeId }: Props) {
  /**
   * Récupération des données
   * actuellement présentes dans l'éditeur.
   */
  const { data } = useRecipeEditor();

  /**
   * Empêche plusieurs sauvegardes simultanées.
   */
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Permet de rediriger l'utilisateur.
   */
  const router = useRouter();

  /**
   * Enregistre la recette.
   */
  async function handleSave() {
    /**
     * Empêche un double clic
     * pendant une sauvegarde.
     */
    if (isSaving) {
      return;
    }

    /**
     * Vérification minimale du titre.
     */
    if (!data.title.trim()) {
      toast.error('Le titre de la recette est obligatoire.');
      return;
    }

    /**
     * Vérification minimale des préparations.
     */
    if (data.preparations.length === 0) {
      toast.error('Ajoute au moins une préparation à ta recette.');
      return;
    }

    try {
      /**
       * Active l'état de chargement.
       */
      setIsSaving(true);

      /**
       * Mode modification.
       */
      if (recipeId) {
        const result = await updateRecipe({
          id: recipeId,
          ...data,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Recette modifiée avec succès.');

        window.location.assign('/dashboard/recipes');

        return;
      }

      /**
       * Mode création.
       */
      const result = await createRecipe(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Recette enregistrée avec succès.');

      window.location.assign('/dashboard/recipes');
    } catch (error) {
      /**
       * Gestion des erreurs inattendues.
       */
      console.error('Erreur lors de la sauvegarde de la recette :', error);

      toast.error(
        "Une erreur est survenue lors de l'enregistrement de la recette.",
      );
    } finally {
      /**
       * Réactive le bouton après la tentative.
       */
      setIsSaving(false);
    }
  }

  return (
    <div className="border-border/70 flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-end">
      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto"
        disabled={isSaving}
        onClick={() => router.replace('/dashboard/recipes')}
      >
        Annuler
      </Button>

      <Button
        type="button"
        className="w-full sm:w-auto"
        disabled={isSaving}
        onClick={handleSave}
      >
        {isSaving
          ? 'Enregistrement...'
          : recipeId
            ? 'Enregistrer les modifications'
            : 'Enregistrer la recette'}
      </Button>
    </div>
  );
}
