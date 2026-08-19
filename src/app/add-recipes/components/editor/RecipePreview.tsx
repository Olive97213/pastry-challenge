'use client';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

/**
 * Aperçu de la recette.
 *
 * Ce composant affiche la recette telle qu'elle
 * pourrait apparaître sur sa page publique.
 *
 * Il ne modifie aucune donnée :
 * il utilise uniquement les informations
 * actuellement présentes dans l'éditeur.
 */
export default function RecipePreview() {
  const { data } = useRecipeEditor();

  return (
    <div className="space-y-8">
      {/* En-tête de la recette */}
      <section className="space-y-4">
        {data.image && (
          <div className="overflow-hidden rounded-xl border">
            <img
              src={data.image}
              alt={data.title || 'Image de la recette'}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{data.title || 'Sans titre'}</h2>

          {data.description && (
            <p className="text-muted-foreground">{data.description}</p>
          )}
        </div>

        {/* Informations générales */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border px-3 py-1 text-sm">
            {getDifficultyLabel(data.difficulty)}
          </span>

          {data.prepTime !== undefined && (
            <span className="rounded-md border px-3 py-1 text-sm">
              Préparation : {data.prepTime} min
            </span>
          )}

          {data.cookTime !== undefined && (
            <span className="rounded-md border px-3 py-1 text-sm">
              Cuisson : {data.cookTime} min
            </span>
          )}

          {data.restTime !== undefined && (
            <span className="rounded-md border px-3 py-1 text-sm">
              Repos : {data.restTime} min
            </span>
          )}

          {data.servings !== undefined && (
            <span className="rounded-md border px-3 py-1 text-sm">
              {data.servings} portion
              {data.servings > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </section>

      {/* Préparations */}
      <section className="space-y-8">
        {data.preparations.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Aucune préparation n&apos;a encore été ajoutée.
            </p>
          </div>
        ) : (
          data.preparations
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((preparation) => (
              <article key={preparation.id} className="space-y-5 border-t pt-6">
                <div>
                  <h3 className="text-xl font-semibold">
                    {preparation.title || 'Sans titre'}
                  </h3>

                  {preparation.description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {preparation.description}
                    </p>
                  )}
                </div>

                {/* Ingrédients */}
                {preparation.ingredients.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Ingrédients</h4>

                    <ul className="space-y-2">
                      {preparation.ingredients
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((ingredient) => (
                          <li
                            key={ingredient.id}
                            className="flex justify-between gap-4 border-b pb-2 text-sm"
                          >
                            <span>
                              {ingredient.name || 'Ingrédient sans nom'}

                              {ingredient.note && (
                                <span className="text-muted-foreground ml-2">
                                  ({ingredient.note})
                                </span>
                              )}
                            </span>

                            {(ingredient.quantity !== undefined ||
                              ingredient.unit) && (
                              <span className="shrink-0 font-medium">
                                {ingredient.quantity ?? ''}
                                {ingredient.quantity !== undefined &&
                                ingredient.unit
                                  ? ' '
                                  : ''}
                                {formatUnit(ingredient.unit)}
                              </span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Étapes */}
                {preparation.steps.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Préparation</h4>

                    <ol className="space-y-3">
                      {preparation.steps
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((step, index) => (
                          <li key={step.id} className="flex gap-3 text-sm">
                            <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                              {index + 1}
                            </span>

                            <p className="pt-1">
                              {step.description || 'Étape non renseignée'}
                            </p>
                          </li>
                        ))}
                    </ol>
                  </div>
                )}
              </article>
            ))
        )}
      </section>
    </div>
  );
}

/**
 * Transforme la valeur technique
 * de la difficulté en libellé lisible.
 */
function getDifficultyLabel(
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
) {
  switch (difficulty) {
    case 'INTERMEDIATE':
      return 'Intermédiaire';

    case 'ADVANCED':
      return 'Avancé';

    case 'BEGINNER':
    default:
      return 'Débutant';
  }
}

/**
 * Transforme les unités techniques
 * en unités affichables.
 */
function formatUnit(
  unit:
    | 'g'
    | 'kg'
    | 'ml'
    | 'cl'
    | 'l'
    | 'piece'
    | 'feuille'
    | 'gousse'
    | 'pincee'
    | 'sachet'
    | 'cuillere-a-cafe'
    | 'cuillere-a-soupe'
    | undefined,
) {
  switch (unit) {
    case 'piece':
      return 'pièce';

    case 'pincee':
      return 'pincée';

    case 'cuillere-a-cafe':
      return 'c. à café';

    case 'cuillere-a-soupe':
      return 'c. à soupe';

    default:
      return unit ?? '';
  }
}
