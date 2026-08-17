'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { RecipeEditorData } from '@/types/recipe';

/**
 * Les différentes zones
 * accessibles dans l'éditeur.
 */
export type RecipeEditorView =
  | 'information'
  | 'preparations'
  | 'preview'
  | {
      type: 'preparation';
      id: string;
    };

/**
 * Valeur disponible dans le contexte.
 */
type RecipeEditorContextValue = {
  /**
   * Ajouter une préparation.
   */
  addPreparation: () => void;

  /**
   * Supprimer une préparation.
   */
  removePreparation: (preparationId: string) => void;

  /**
   * Modifier une préparation.
   */
  updatePreparation: (
    preparationId: string,
    values: Partial<RecipeEditorData['preparations'][number]>,
  ) => void;
  data: RecipeEditorData;

  /**
   * Ajoute un ingrédient.
   */
  addIngredient: (preparationId: string) => void;

  /**
   * Modifie un ingrédient.
   */
  updateIngredient: (
    preparationId: string,
    ingredientId: string,
    values: Partial<
      RecipeEditorData['preparations'][number]['ingredients'][number]
    >,
  ) => void;

  /**
   * Supprime un ingrédient.
   */
  removeIngredient: (preparationId: string, ingredientId: string) => void;

  /**
   * Ajoute une étape.
   */
  addStep: (preparationId: string) => void;

  /**
   * Modifie une étape.
   */
  updateStep: (
    preparationId: string,
    stepId: string,
    values: Partial<RecipeEditorData['preparations'][number]['steps'][number]>,
  ) => void;

  /**
   * Supprime une étape.
   */
  removeStep: (preparationId: string, stepId: string) => void;

  /**
   * Mise à jour complète
   * des données.
   */
  setData: React.Dispatch<React.SetStateAction<RecipeEditorData>>;

  /**
   * Vue actuellement affichée.
   */
  selectedView: RecipeEditorView;

  /**
   * Modifier la vue active.
   */
  setSelectedView: React.Dispatch<React.SetStateAction<RecipeEditorView>>;
};

const RecipeEditorContext = createContext<RecipeEditorContextValue | null>(
  null,
);

type Props = {
  children: ReactNode;

  initialData: RecipeEditorData;
};

/**
 * Provider principal
 * de l'éditeur de recette.
 */
export function RecipeEditorProvider({ children, initialData }: Props) {
  const [data, setData] = useState<RecipeEditorData>(initialData);

  /**
   * Vue affichée par défaut.
   */
  const [selectedView, setSelectedView] =
    useState<RecipeEditorView>('information');
  /**
   * Ajoute une nouvelle préparation
   * à la recette.
   */
  function addPreparation() {
    const preparationId = crypto.randomUUID();

    setData((previous) => ({
      ...previous,

      preparations: [
        ...previous.preparations,

        {
          id: preparationId,

          title: 'Nouvelle préparation',

          description: '',

          position: previous.preparations.length,

          ingredients: [],

          steps: [],
        },
      ],
    }));

    /**
     * Ouvre immédiatement
     * la préparation nouvellement créée.
     */
    setSelectedView({
      type: 'preparation',
      id: preparationId,
    });
  }

  /**
   * Supprime une préparation.
   */
  function removePreparation(preparationId: string) {
    setData((previous) => {
      const preparations = previous.preparations
        .filter((preparation) => preparation.id !== preparationId)
        .map((preparation, index) => ({
          ...preparation,
          position: index,
        }));

      return {
        ...previous,
        preparations,
      };
    });

    /**
     * Si la préparation supprimée
     * était affichée, on revient
     * à la liste des préparations.
     */
    setSelectedView((current) => {
      if (
        typeof current === 'object' &&
        current.type === 'preparation' &&
        current.id === preparationId
      ) {
        return 'preparations';
      }

      return current;
    });
  }

  /**
   * Modifie les informations
   * d'une préparation.
   */
  function updatePreparation(
    preparationId: string,
    values: Partial<RecipeEditorData['preparations'][number]>,
  ) {
    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) =>
        preparation.id === preparationId
          ? {
              ...preparation,
              ...values,
            }
          : preparation,
      ),
    }));
  }
  /**
   * Ajoute un nouvel ingrédient
   * à une préparation.
   */
  function addIngredient(preparationId: string) {
    const ingredientId = crypto.randomUUID();

    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        return {
          ...preparation,

          ingredients: [
            ...preparation.ingredients,

            {
              id: ingredientId,

              name: '',

              quantity: undefined,

              unit: 'g',

              note: '',

              position: preparation.ingredients.length,
            },
          ],
        };
      }),
    }));
  }

  /**
   * Modifie un ingrédient existant.
   */
  function updateIngredient(
    preparationId: string,
    ingredientId: string,
    values: Partial<
      RecipeEditorData['preparations'][number]['ingredients'][number]
    >,
  ) {
    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        return {
          ...preparation,

          ingredients: preparation.ingredients.map((ingredient) =>
            ingredient.id === ingredientId
              ? {
                  ...ingredient,
                  ...values,
                }
              : ingredient,
          ),
        };
      }),
    }));
  }

  /**
   * Supprime un ingrédient.
   */
  function removeIngredient(preparationId: string, ingredientId: string) {
    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        const ingredients = preparation.ingredients
          .filter((ingredient) => ingredient.id !== ingredientId)
          .map((ingredient, index) => ({
            ...ingredient,
            position: index,
          }));

        return {
          ...preparation,
          ingredients,
        };
      }),
    }));
  }
  /**
   * Ajoute une nouvelle étape
   * à une préparation.
   */
  function addStep(preparationId: string) {
    const stepId = crypto.randomUUID();

    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        return {
          ...preparation,

          steps: [
            ...preparation.steps,

            {
              id: stepId,

              description: '',

              position: preparation.steps.length,
            },
          ],
        };
      }),
    }));
  }
  /**
   * Modifie une étape existante.
   */
  function updateStep(
    preparationId: string,
    stepId: string,
    values: Partial<RecipeEditorData['preparations'][number]['steps'][number]>,
  ) {
    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        return {
          ...preparation,

          steps: preparation.steps.map((step) =>
            step.id === stepId
              ? {
                  ...step,
                  ...values,
                }
              : step,
          ),
        };
      }),
    }));
  }
  /**
   * Supprime une étape.
   */
  function removeStep(preparationId: string, stepId: string) {
    setData((previous) => ({
      ...previous,

      preparations: previous.preparations.map((preparation) => {
        if (preparation.id !== preparationId) {
          return preparation;
        }

        const steps = preparation.steps
          .filter((step) => step.id !== stepId)
          .map((step, index) => ({
            ...step,
            position: index,
          }));

        return {
          ...preparation,
          steps,
        };
      }),
    }));
  }

  const value = useMemo(
    () => ({
      data,
      setData,

      selectedView,
      setSelectedView,

      addPreparation,
      removePreparation,
      updatePreparation,

      addIngredient,
      updateIngredient,
      removeIngredient,

      addStep,
      updateStep,
      removeStep,
    }),
    [data, selectedView],
  );

  return (
    <RecipeEditorContext.Provider value={value}>
      {children}
    </RecipeEditorContext.Provider>
  );
}

/**
 * Hook permettant d'utiliser
 * l'éditeur depuis n'importe quel composant.
 */
export function useRecipeEditor() {
  const context = useContext(RecipeEditorContext);

  if (!context) {
    throw new Error(
      'useRecipeEditor doit être utilisé dans RecipeEditorProvider.',
    );
  }

  return context;
}
