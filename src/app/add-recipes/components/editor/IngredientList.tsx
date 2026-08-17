'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IngredientUnitSelect from './IngredientUnitSelect';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

type Props = {
  preparationId: string;
};

/**
 * Liste des ingrédients
 * d'une préparation.
 */
export default function IngredientList({ preparationId }: Props) {
  const { data, addIngredient, updateIngredient, removeIngredient } =
    useRecipeEditor();

  const preparation = data.preparations.find(
    (item) => item.id === preparationId,
  );

  if (!preparation) {
    return null;
  }

  return (
    <div className="space-y-3">
      {preparation.ingredients
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((ingredient) => (
          <div
            key={ingredient.id}
            className="grid gap-2 sm:grid-cols-[100px_120px_1fr_1fr_auto]"
          >
            <Input
              type="number"
              min="0"
              step="any"
              value={ingredient.quantity ?? ''}
              placeholder="Quantité"
              onChange={(event) => {
                const value = event.target.value;

                updateIngredient(preparation.id, ingredient.id, {
                  quantity: value === '' ? undefined : Number(value),
                });
              }}
            />

            <IngredientUnitSelect
              value={ingredient.unit}
              onChange={(unit) =>
                updateIngredient(preparation.id, ingredient.id, {
                  unit,
                })
              }
            />
            <Input
              value={ingredient.name}
              placeholder="Ex. Farine T55"
              onChange={(event) =>
                updateIngredient(preparation.id, ingredient.id, {
                  name: event.target.value,
                })
              }
            />

            <Input
              value={ingredient.note ?? ''}
              placeholder="Note"
              onChange={(event) =>
                updateIngredient(preparation.id, ingredient.id, {
                  note: event.target.value,
                })
              }
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeIngredient(preparation.id, ingredient.id)}
              aria-label="Supprimer l'ingrédient"
            >
              ×
            </Button>
          </div>
        ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => addIngredient(preparation.id)}
      >
        Ajouter un ingrédient
      </Button>
    </div>
  );
}
