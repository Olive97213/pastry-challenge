'use client';

import { Button } from '@/components/ui/button';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

/**
 * Liste des préparations
 * de la recette.
 */
export default function PreparationList() {
  const { data, addPreparation, removePreparation, setSelectedView } =
    useRecipeEditor();

  return (
    <div className="space-y-6">
      {/* En-tête de la section. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Préparations
          </h2>

          <p className="text-muted-foreground text-sm">
            Organise les différentes préparations de ta recette.
          </p>
        </div>

        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={addPreparation}
        >
          + Ajouter
        </Button>
      </div>

      {/* Liste des préparations. */}
      {data.preparations.length > 0 ? (
        <div className="space-y-3">
          {data.preparations
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((preparation) => (
              <div
                key={preparation.id}
                className="border-border/70 bg-card/70 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() =>
                    setSelectedView({
                      type: 'preparation',
                      id: preparation.id,
                    })
                  }
                >
                  <p className="text-foreground font-medium">
                    {preparation.title || 'Sans nom'}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {preparation.ingredients.length} ingrédient
                    {preparation.ingredients.length !== 1 ? 's' : ''}
                    {' · '}
                    {preparation.steps.length} étape
                    {preparation.steps.length !== 1 ? 's' : ''}
                  </p>
                </button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => removePreparation(preparation.id)}
                >
                  Supprimer
                </Button>
              </div>
            ))}
        </div>
      ) : (
        <div className="border-border/80 bg-card/50 rounded-2xl border border-dashed p-8 text-center">
          <p className="font-medium">Aucune préparation</p>

          <p className="text-muted-foreground mt-1 text-sm">
            Commence par ajouter une préparation comme une pâte, une mousse ou
            un crémeux.
          </p>

          <Button type="button" className="mt-4" onClick={addPreparation}>
            Ajouter une préparation
          </Button>
        </div>
      )}
    </div>
  );
}
