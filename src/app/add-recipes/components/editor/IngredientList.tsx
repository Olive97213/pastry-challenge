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
            className="border-border/70 bg-background/50 grid gap-2 rounded-xl border p-2 md:grid-cols-[minmax(0,1.6fr)_minmax(80px,0.7fr)_minmax(120px,0.9fr)_minmax(0,1.2fr)_auto]"
          >
            <Input
              value={ingredient.name}
              placeholder="Ex. Farine T55"
              className="h-10 rounded-lg"
              onChange={(event) =>
                updateIngredient(preparation.id, ingredient.id, {
                  name: event.target.value,
                })
              }
            />
            <Input
              type="number"
              min="0"
              step="any"
              value={ingredient.quantity ?? ''}
              placeholder="Qté"
              className="h-10 rounded-lg"
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
              value={ingredient.note ?? ''}
              placeholder="Note"
              className="h-10 rounded-lg"
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
              className="h-10 w-10 rounded-lg"
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
        className="w-full sm:w-auto"
        onClick={() => addIngredient(preparation.id)}
      >
        Ajouter un ingrédient
      </Button>
    </div>
  );
}
