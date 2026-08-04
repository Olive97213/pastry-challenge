import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getRecipeBySlug } from '@/data/recipes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Page publique d'une recette.
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
          <Link href="/" className="flex items-center gap-2">
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

          <CardHeader className="space-y-3 px-4 py-4 sm:px-6">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{recipe.title}</CardTitle>
              <CardDescription>
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
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-4 py-6 sm:px-6">
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

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Ingrédients</h2>

              {recipe.ingredients.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="bg-background/70 rounded-lg border p-3"
                    >
                      {ingredient.name}
                      {ingredient.quantity && <> - {ingredient.quantity}</>}
                      {ingredient.unit && <> {ingredient.unit}</>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  Aucun ingrédient renseigné.
                </p>
              )}
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Préparation</h2>

              {recipe.instructions ? (
                <p className="text-sm leading-7 whitespace-pre-line">
                  {recipe.instructions}
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Aucune instruction renseignée.
                </p>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
