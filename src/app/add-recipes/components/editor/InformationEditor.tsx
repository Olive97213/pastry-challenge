'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

import type { RecipeDifficulty } from '@/types/recipe';

/**
 * Éditeur des informations générales
 * de la recette.
 *
 * Cette section permet de modifier
 * les données principales de la recette :
 *
 * - titre ;
 * - description ;
 * - image ;
 * - difficulté ;
 * - temps de préparation ;
 * - temps de cuisson ;
 * - temps de repos ;
 * - nombre de portions.
 */
export default function InformationEditor() {
  /**
   * Récupération des données et de la fonction
   * permettant de les modifier.
   */
  const { data, setData } = useRecipeEditor();

  /**
   * Modifie une information générale
   * de la recette.
   */
  function updateData(values: Partial<typeof data>) {
    setData((previous) => ({
      ...previous,
      ...values,
    }));
  }

  /**
   * Convertit une valeur numérique provenant
   * d'un champ HTML en nombre ou undefined.
   */
  function parseNumber(value: string) {
    if (value === '') {
      return undefined;
    }

    const number = Number(value);

    return Number.isNaN(number) ? undefined : number;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Informations générales
        </h2>

        <p className="text-muted-foreground text-sm">
          Renseigne les informations principales de ta recette.
        </p>
      </div>

      {/* Informations principales */}
      <section className="border-border/70 bg-card/70 space-y-5 rounded-2xl border p-4 sm:p-5">
        <div className="space-y-2">
          <Label htmlFor="recipe-title" className="text-sm font-medium">
            Titre
          </Label>

          <Input
            id="recipe-title"
            value={data.title}
            placeholder="Ex. Tarte au citron meringuée"
            className="h-11 rounded-xl"
            onChange={(event) =>
              updateData({
                title: event.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipe-description" className="text-sm font-medium">
            Description
          </Label>

          <Textarea
            id="recipe-description"
            value={data.description ?? ''}
            placeholder="Présente brièvement ta recette..."
            rows={4}
            className="rounded-xl"
            onChange={(event) =>
              updateData({
                description: event.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipe-image" className="text-sm font-medium">
            Image
          </Label>

          <Input
            id="recipe-image"
            type="url"
            value={data.image ?? ''}
            placeholder="https://..."
            className="h-11 rounded-xl"
            onChange={(event) =>
              updateData({
                image: event.target.value,
              })
            }
          />

          <p className="text-muted-foreground text-xs">
            Pour le moment, indique l&apos;URL de l&apos;image.
          </p>
        </div>
      </section>

      {/* Difficulté */}
      <section className="border-border/70 bg-card/70 space-y-4 rounded-2xl border p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-semibold">Difficulté</h3>

          <p className="text-muted-foreground text-sm">
            Indique le niveau nécessaire pour réaliser la recette.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ['BEGINNER', 'Débutant'],
              ['INTERMEDIATE', 'Intermédiaire'],
              ['ADVANCED', 'Avancé'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                data.difficulty === value
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-background/60 text-foreground hover:border-primary/60 hover:bg-accent'
              }`}
              onClick={() =>
                updateData({
                  difficulty: value as RecipeDifficulty,
                })
              }
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Temps et portions */}
      <section className="border-border/70 bg-card/70 space-y-4 rounded-2xl border p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-semibold">Temps et portions</h3>

          <p className="text-muted-foreground text-sm">
            Ces informations permettront notamment d&apos;afficher les
            caractéristiques de la recette.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="prep-time" className="text-sm font-medium">
              Préparation (minutes)
            </Label>

            <Input
              id="prep-time"
              type="number"
              min="0"
              value={data.prepTime ?? ''}
              className="h-11 rounded-xl"
              onChange={(event) =>
                updateData({
                  prepTime: parseNumber(event.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cook-time" className="text-sm font-medium">
              Cuisson (minutes)
            </Label>

            <Input
              id="cook-time"
              type="number"
              min="0"
              value={data.cookTime ?? ''}
              className="h-11 rounded-xl"
              onChange={(event) =>
                updateData({
                  cookTime: parseNumber(event.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rest-time" className="text-sm font-medium">
              Repos (minutes)
            </Label>

            <Input
              id="rest-time"
              type="number"
              min="0"
              value={data.restTime ?? ''}
              className="h-11 rounded-xl"
              onChange={(event) =>
                updateData({
                  restTime: parseNumber(event.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servings" className="text-sm font-medium">
              Portions
            </Label>

            <Input
              id="servings"
              type="number"
              min="1"
              value={data.servings ?? ''}
              className="h-11 rounded-xl"
              onChange={(event) =>
                updateData({
                  servings: parseNumber(event.target.value),
                })
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
