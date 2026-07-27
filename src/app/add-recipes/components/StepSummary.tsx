'use client';

import { useState } from 'react';

import { createRecipe } from '@/actions/recipes/createRecipe';

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
  /**
   * État du bouton de sauvegarde.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Message de retour utilisateur.
   */
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Enregistrement final
   * de la recette.
   */
  async function saveRecipe() {
    /**
     * Vérification minimale
     * avant envoi serveur.
     *
     * Le titre est obligatoire
     * dans la base de données.
     */
    if (!data.title) {
      setMessage('Le titre de la recette est obligatoire');

      return;
    }

    try {
      setIsLoading(true);

      setMessage(null);

      /**
       * On reconstruit l'objet envoyé
       * afin de garantir les types attendus
       * par createRecipe().
       */
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
    <div>
      <h2>Résumé de la recette</h2>

      <section>
        <h3>Informations générales</h3>

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
      </section>

      <section>
        <h3>Ingrédients</h3>

        {data.ingredients && data.ingredients.length > 0 ? (
          <ul>
            {data.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}{' '}
                {ingredient.quantity && `${ingredient.quantity} `}
                {ingredient.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun ingrédient ajouté</p>
        )}
      </section>

      <section>
        <h3>Préparation</h3>

        {data.instructions && <p>{data.instructions}</p>}

        <p>Temps préparation : {data.prepTime ?? 0} min</p>

        <p>Temps cuisson : {data.cookTime ?? 0} min</p>

        <p>Temps repos : {data.restTime ?? 0} min</p>

        <p>Portions : {data.servings ?? 0}</p>
      </section>

      {message && <p>{message}</p>}

      <div>
        <button type="button" onClick={onBack} disabled={isLoading}>
          Retour
        </button>

        <button type="button" onClick={saveRecipe} disabled={isLoading}>
          {isLoading ? 'Enregistrement...' : 'Enregistrer le brouillon'}
        </button>
      </div>
    </div>
  );
}
