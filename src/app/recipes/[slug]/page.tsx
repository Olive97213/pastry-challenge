import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRecipeBySlug } from '@/data/recipes';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Page d'affichage d'une recette.
 */
export default async function RecipePage({ params }: Props) {
  const { slug } = await params;

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard/recipes" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </Button>

        <Card className="border-border/60 overflow-hidden shadow-sm">
          {recipe.image && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <CardHeader className="space-y-4 px-4 py-6 sm:px-6">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{recipe.title}</CardTitle>

              <CardDescription className="text-base">
                {recipe.description ?? 'Découvrez cette recette pas à pas.'}
              </CardDescription>
            </div>

            <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border px-3 py-1">
                Difficulté : {recipe.difficulty}
              </span>

              <span className="rounded-full border px-3 py-1">
                Statut : {recipe.status}
              </span>

              {recipe.servings && (
                <span className="rounded-full border px-3 py-1">
                  {recipe.servings} portions
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-4 py-6 sm:px-6">
            {/* Temps */}
            <section className="grid gap-4 sm:grid-cols-3">
              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Préparation</p>

                <p className="mt-1 font-semibold">{recipe.prepTime ?? 0} min</p>
              </div>

              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Cuisson</p>

                <p className="mt-1 font-semibold">{recipe.cookTime ?? 0} min</p>
              </div>

              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Repos</p>

                <p className="mt-1 font-semibold">{recipe.restTime ?? 0} min</p>
              </div>
            </section>

            {/* Préparations */}
            <section className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold">Préparation</h2>

                <p className="text-muted-foreground mt-1 text-sm">
                  Suivez les différentes préparations de la recette.
                </p>
              </div>

              {recipe.preparations.length > 0 ? (
                <div className="space-y-8">
                  {recipe.preparations.map((preparation) => (
                    <article
                      key={preparation.id}
                      className="space-y-6 rounded-xl border p-5"
                    >
                      {/* Titre préparation */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">
                          {preparation.title}
                        </h3>

                        {preparation.description && (
                          <p className="text-muted-foreground text-sm">
                            {preparation.description}
                          </p>
                        )}
                      </div>

                      {/* Ingrédients */}
                      <section className="space-y-3">
                        <h4 className="font-semibold">Ingrédients</h4>

                        {preparation.ingredients.length > 0 ? (
                          <ul className="space-y-2">
                            {preparation.ingredients.map((ingredient) => (
                              <li
                                key={ingredient.id}
                                className="bg-background/70 rounded-lg border p-3"
                              >
                                <span className="font-medium">
                                  {ingredient.name}
                                </span>

                                {ingredient.quantity !== null &&
                                  ingredient.quantity !== undefined && (
                                    <> — {ingredient.quantity}</>
                                  )}

                                {ingredient.unit && <> {ingredient.unit}</>}

                                {ingredient.note && (
                                  <span className="text-muted-foreground ml-2 text-sm">
                                    ({ingredient.note})
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Aucun ingrédient renseigné.
                          </p>
                        )}
                      </section>

                      {/* Étapes */}
                      <section className="space-y-3">
                        <h4 className="font-semibold">Étapes</h4>

                        {preparation.steps.length > 0 ? (
                          <ol className="space-y-3">
                            {preparation.steps.map((step, index) => (
                              <li key={step.id} className="flex gap-3">
                                <span className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                                  {index + 1}
                                </span>

                                <p className="pt-1 text-sm leading-6">
                                  {step.description}
                                </p>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Aucune étape renseignée.
                          </p>
                        )}
                      </section>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Aucune préparation renseignée.
                </p>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
