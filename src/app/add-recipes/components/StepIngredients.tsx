'use client';

import { useState } from 'react';

import type { RecipeIngredientInput, RecipeWizardData } from '@/types/recipe';

type Props = {
  data: RecipeWizardData;

  setData: React.Dispatch<React.SetStateAction<RecipeWizardData>>;

  onNext: () => void;

  onBack: () => void;
};

/**
 * Étape de gestion
 * des ingrédients.
 */
export default function StepIngredients({
  data,
  setData,
  onNext,
  onBack,
}: Props) {
  const [ingredient, setIngredient] = useState<RecipeIngredientInput>({
    name: '',
    quantity: undefined,
    unit: '',
  });

  function addIngredient() {
    if (!ingredient.name.trim()) {
      return;
    }

    setData((previous) => ({
      ...previous,

      ingredients: [
        ...(previous.ingredients ?? []),

        {
          ...ingredient,

          name: ingredient.name.trim(),

          unit: ingredient.unit?.trim(),
        },
      ],
    }));

    setIngredient({
      name: '',
      quantity: undefined,
      unit: '',
    });
  }

  function removeIngredient(index: number) {
    setData((previous) => ({
      ...previous,

      ingredients: previous.ingredients?.filter((_, i) => i !== index),
    }));
  }

  return (
    <div>
      <h2>Ingrédients</h2>

      <input
        value={ingredient.name}
        onChange={(e) =>
          setIngredient({
            ...ingredient,
            name: e.target.value,
          })
        }
        placeholder="Farine"
      />

      <input
        type="number"
        value={ingredient.quantity ?? ''}
        onChange={(e) =>
          setIngredient({
            ...ingredient,

            quantity: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        placeholder="Quantité"
      />

      <input
        value={ingredient.unit}
        onChange={(e) =>
          setIngredient({
            ...ingredient,

            unit: e.target.value,
          })
        }
        placeholder="g, ml..."
      />

      <button type="button" onClick={addIngredient}>
        Ajouter
      </button>

      <ul>
        {data.ingredients?.map((item, index) => (
          <li key={index}>
            {item.name} {item.quantity} {item.unit}
            <button type="button" onClick={() => removeIngredient(index)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={onBack}>
        Retour
      </button>

      <button type="button" onClick={onNext}>
        Continuer
      </button>
    </div>
  );
}
