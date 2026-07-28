'use client';

import { useState } from 'react';

import { createRecipe } from '@/actions/recipes/createRecipe';
import { Button } from '@/components/ui/button';
import type { RecipeWizardData } from '@/types/recipe';

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
};

/**
 * Dernière étape du wizard.
 *
 * Cette étape permet :
 * - de vérifier les informations saisies
 * - d'envoyer la recette au serveur
 */
export default function StepSummary({ data, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveRecipe() {
    if (!data.title) {
      setMessage('Le titre de la recette est obligatoire');
      return;
    }

    try {
      setIsLoading(true);
      setMessage(null);

      const result = await createRecipe({
        ...data,
        title: data.title,
      });

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setMessage('Recette enregistrée avec succès');
    } catch (error) {
      console.error('Erreur création recette :', error);
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
          Vérifie les informations avant de sauvegarder ta recette.
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
          {isLoading ? 'Enregistrement...' : 'Enregistrer la recette'}
        </Button>
      </div>
    </div>
  );
}
