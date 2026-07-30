'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createRecipe } from '@/actions/recipes/createRecipe';
import { updateRecipe } from '@/actions/recipes/updateRecipe';

import { Button } from '@/components/ui/button';

import type { RecipeWizardData, UpdateRecipeInput } from '@/types/recipe';

type Props = {
  /**
   * Données collectées pendant
   * les différentes étapes du wizard.
   */
  data: RecipeWizardData;

  /**
   * Retour vers l'étape précédente.
   */
  onBack: () => void;

  /**
   * Mode du wizard.
   *
   * create : nouvelle recette
   * edit   : modification
   */
  mode: 'create' | 'edit';

  /**
   * Identifiant de la recette.
   *
   * Obligatoire uniquement
   * en mode édition.
   */
  recipeId?: string;
};

/**
 * Dernière étape du wizard.
 *
 * Permet :
 * - de vérifier les informations saisies ;
 * - de créer une recette ;
 * - de modifier une recette existante.
 */
export default function StepSummary({ data, onBack, mode, recipeId }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  async function saveRecipe() {
    /**
     * Vérification minimale avant envoi.
     */
    if (!data.title) {
      setMessage('Le titre de la recette est obligatoire');
      return;
    }

    /**
     * En mode édition,
     * l'identifiant est obligatoire.
     */
    if (mode === 'edit' && !recipeId) {
      setMessage('Identifiant de recette manquant');
      return;
    }

    try {
      setIsLoading(true);

      setMessage(null);

      let result;

      /**
       * Création d'une nouvelle recette.
       */
      if (mode === 'create') {
        result = await createRecipe({
          ...data,

          title: data.title,
        });
      } else {

      /**
       * Modification d'une recette existante.
       */
        const updateData: UpdateRecipeInput = {
          ...data,

          title: data.title,

          id: recipeId!,
        };

        result = await updateRecipe(updateData);
      }

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setMessage(result.message);

      /**
       * Retour vers la liste
       * après quelques instants.
       */
      setTimeout(() => {
        router.push('/dashboard/recipes');
      }, 1000);
    } catch (error) {
      console.error('Erreur enregistrement recette :', error);

      setMessage("Une erreur est survenue lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Résumé de la recette</h2>

        <p className="text-muted-foreground text-sm">
          Vérifie les informations avant de sauvegarder.
        </p>
      </div>

      <section className="border-border/70 bg-background/70 space-y-4 rounded-lg border p-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Informations générales</h3>

          <p>
            <strong>Titre :</strong> {data.title}
          </p>

          <p>
            <strong>Difficulté :</strong> {data.difficulty}
          </p>

          {data.description && (
            <p>
              <strong>Description :</strong> {data.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold">Ingrédients</h3>

          {data.ingredients && data.ingredients.length > 0 ? (
            <ul className="space-y-2">
              {data.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="border-border/70 bg-muted/70 rounded-md border px-3 py-2"
                >
                  {ingredient.name}{' '}
                  {ingredient.quantity ? `${ingredient.quantity} ` : ''}
                  {ingredient.unit}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              Aucun ingrédient ajouté
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold">Préparation</h3>

          {data.instructions && <p>{data.instructions}</p>}

          <p>Temps préparation : {data.prepTime ?? 0} min</p>

          <p>Temps cuisson : {data.cookTime ?? 0} min</p>

          <p>Temps repos : {data.restTime ?? 0} min</p>

          <p>Portions : {data.servings ?? 0}</p>
        </div>
      </section>

      {message && (
        <div className="border-border/70 bg-background/70 text-muted-foreground rounded-md border px-4 py-3 text-sm">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Retour
        </Button>

        <Button type="button" onClick={saveRecipe} disabled={isLoading}>
          {isLoading
            ? 'Enregistrement...'
            : mode === 'create'
              ? 'Créer la recette'
              : 'Modifier la recette'}
        </Button>
      </div>
    </div>
  );
}
