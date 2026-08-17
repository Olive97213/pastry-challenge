'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import IngredientList from './IngredientList';
import StepList from './StepList';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

/**
 * Éditeur d'une préparation.
 *
 * Permet de modifier les informations générales
 * d'une préparation avant d'ajouter ses ingrédients
 * et ses étapes.
 */
export default function PreparationEditor({
  preparationId,
}: {
  preparationId: string;
}) {
  const { data, updatePreparation, removePreparation, setSelectedView } =
    useRecipeEditor();

  /**
   * Recherche la préparation actuellement éditée.
   */
  const preparation = data.preparations.find(
    (item) => item.id === preparationId,
  );

  /**
   * La préparation peut ne plus exister si elle
   * vient d'être supprimée.
   */
  if (!preparation) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Cette préparation n'existe plus.
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={() => setSelectedView('preparations')}
        >
          Retour aux préparations
        </Button>
      </div>
    );
  }

  /**
   * Supprime la préparation après confirmation.
   */
  function handleRemove() {
    const confirmed = window.confirm(
      `Supprimer la préparation « ${preparation.title || 'Sans nom'} » ?`,
    );

    if (!confirmed) {
      return;
    }

    removePreparation(preparation.id);
  }

  return (
    <div className="space-y-8">
      {/* En-tête de la préparation. */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Modifier la préparation</h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Définis les informations de cette préparation.
          </p>
        </div>

        <Button type="button" variant="destructive" onClick={handleRemove}>
          Supprimer
        </Button>
      </div>

      {/* Informations générales. */}
      <section className="space-y-5 rounded-lg border p-5">
        <div className="space-y-2">
          <label
            htmlFor={`preparation-title-${preparation.id}`}
            className="text-sm font-medium"
          >
            Nom de la préparation
          </label>

          <Input
            id={`preparation-title-${preparation.id}`}
            value={preparation.title}
            onChange={(event) =>
              updatePreparation(preparation.id, {
                title: event.target.value,
              })
            }
            placeholder="Ex. Pâte sucrée"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`preparation-description-${preparation.id}`}
            className="text-sm font-medium"
          >
            Description
          </label>

          <Textarea
            id={`preparation-description-${preparation.id}`}
            value={preparation.description ?? ''}
            onChange={(event) =>
              updatePreparation(preparation.id, {
                description: event.target.value,
              })
            }
            placeholder="Décris brièvement cette préparation..."
            rows={4}
          />
        </div>
      </section>

      {/* Ingrédients. */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Ingrédients</h3>

          <p className="text-muted-foreground text-sm">
            Les ingrédients utilisés pour cette préparation.
          </p>
        </div>

        <IngredientList preparationId={preparation.id} />
      </section>

      {/* Étapes. */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Étapes</h3>

          <p className="text-muted-foreground text-sm">
            Décris les différentes étapes de cette préparation.
          </p>
        </div>

        <StepList preparationId={preparation.id} />
      </section>
    </div>
  );
}
