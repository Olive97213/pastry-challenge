'use client';

import { useState } from 'react';

import type { RecipeIngredientInput, RecipeWizardData } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function addIngredient() {
    if (!ingredient.name.trim()) {
      return;
    }

    if (editingIndex !== null) {
      setData((previous) => ({
        ...previous,
        ingredients: previous.ingredients?.map((item, index) =>
          index === editingIndex
            ? {
                ...ingredient,
                name: ingredient.name.trim(),
                unit: ingredient.unit?.trim(),
              }
            : item,
        ),
      }));
      setEditingIndex(null);
    } else {
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
    }

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

    if (editingIndex === index) {
      setEditingIndex(null);
      setIngredient({ name: '', quantity: undefined, unit: '' });
    }
  }

  function editIngredient(index: number) {
    const ingredientToEdit = data.ingredients?.[index];

    if (!ingredientToEdit) {
      return;
    }

    setIngredient({
      name: ingredientToEdit.name,
      quantity: ingredientToEdit.quantity,
      unit: ingredientToEdit.unit ?? '',
    });
    setEditingIndex(index);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Ingrédients</h2>
        <p className="text-muted-foreground text-sm">
          Ajoute les ingrédients un par un et choisis leur quantité.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          value={ingredient.name}
          onChange={(e) =>
            setIngredient({
              ...ingredient,
              name: e.target.value,
            })
          }
          placeholder="Farine"
        />
        <Input
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
        <Input
          value={ingredient.unit}
          onChange={(e) =>
            setIngredient({
              ...ingredient,
              unit: e.target.value,
            })
          }
          placeholder="g, ml..."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          className="w-full sm:w-fit"
          onClick={addIngredient}
        >
          {editingIndex !== null ? 'Mettre à jour' : 'Ajouter l’ingrédient'}
        </Button>
        {editingIndex !== null && (
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-fit"
            onClick={() => {
              setEditingIndex(null);
              setIngredient({ name: '', quantity: undefined, unit: '' });
            }}
          >
            Annuler
          </Button>
        )}
      </div>

      <div className="border-border/70 bg-background/70 space-y-3 rounded-lg border p-4">
        {data.ingredients?.length ? (
          data.ingredients.map((item, index) => (
            <div
              key={index}
              className="border-border/70 bg-muted/70 flex items-center justify-between gap-4 rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  {item.quantity ?? ''} {item.unit}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => editIngredient(index)}
                >
                  Modifier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            Aucun ingrédient ajouté.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="button" onClick={onNext}>
          Continuer
        </Button>
      </div>
    </div>
  );
}
