'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

type Props = {
  /**
   * Identifiant de la préparation
   * dont on édite les étapes.
   */
  preparationId: string;
};

/**
 * Liste des étapes d'une préparation.
 */
export default function StepList({ preparationId }: Props) {
  const { data, addStep, updateStep, removeStep } = useRecipeEditor();

  /**
   * Recherche la préparation actuellement éditée.
   */
  const preparation = data.preparations.find(
    (item) => item.id === preparationId,
  );

  /**
   * La préparation peut ne plus exister
   * si elle vient d'être supprimée.
   */
  if (!preparation) {
    return null;
  }

  return (
    <div className="space-y-4">
      {preparation.steps
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((step, index) => (
          <div key={step.id} className="flex gap-3">
            {/* Numéro de l'étape. */}
            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Contenu de l'étape. */}
            <div className="flex min-w-0 flex-1 gap-2">
              <Textarea
                value={step.description}
                onChange={(event) =>
                  updateStep(preparation.id, step.id, {
                    description: event.target.value,
                  })
                }
                placeholder="Décris cette étape..."
                rows={3}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeStep(preparation.id, step.id)}
                aria-label="Supprimer l'étape"
              >
                ×
              </Button>
            </div>
          </div>
        ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => addStep(preparation.id)}
      >
        + Ajouter une étape
      </Button>
    </div>
  );
}
