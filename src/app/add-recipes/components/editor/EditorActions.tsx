'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { createRecipe } from '@/actions/recipes/createRecipe';

/**
 * Actions principales de l'éditeur.
 *
 * Ce composant gère :
 *
 * - l'enregistrement de la recette ;
 * - l'état de chargement pendant la sauvegarde ;
 * - l'affichage des messages de succès ou d'erreur ;
 * - la redirection vers le dashboard après création.
 */
export default function EditorActions() {
  /**
   * Récupération des données
   * actuellement présentes dans l'éditeur.
   */
  const { data } = useRecipeEditor();

  /**
   * Permet d'empêcher plusieurs
   * sauvegardes simultanées.
   */
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Permet de rediriger l'utilisateur
   * après la création de la recette.
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
       * Appel de l'action serveur.
       */
      const result = await createRecipe(data);

      /**
       * Gestion de l'échec retourné
       * par l'action serveur.
       */
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      /**
       * Confirmation de la sauvegarde.
       */
      toast.success('Recette enregistrée avec succès.');

      /**
       * Redirection directe vers la page
       * "Mes recettes" après la création.
       * Utiliser window.location garantit une navigation
       * immédiate même si l’état du router est encore stable.
       */
      window.location.assign('/dashboard/recipes');
    } catch (error) {
      /**
       * Gestion des erreurs inattendues.
       */
      console.error('Erreur lors de la sauvegarde de la recette :', error);

      toast.error("Une erreur est survenue lors de l'enregistrement.");
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
        {isSaving ? 'Enregistrement...' : 'Enregistrer la recette'}
      </Button>
    </div>
  );
}
