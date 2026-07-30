import { notFound } from 'next/navigation';

import { getRecipe } from '@/actions/recipes/getRecipe';
import RecipeWizard from '@/app/add-recipes/components/RecipeWizard';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import type { RecipeWizardData } from '@/types/recipe';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**

* Page d'édition d'une recette.
*
* Récupère les données existantes puis
* initialise le wizard avec celles-ci.
  */
export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;

  const result = await getRecipe(id);

  /**

* La recette n'existe pas ou n'appartient
* pas à l'utilisateur connecté.
  */
  if (!result) {
    notFound();
  }

  const { recipe, ingredients } = result;

  /**

* Conversion des données de la base
* vers le format utilisé par le wizard.
  */
  const initialData: RecipeWizardData = {
    title: recipe.title,

    description: recipe.description ?? '',

    difficulty: recipe.difficulty,

    instructions: recipe.instructions ?? '',

    prepTime: recipe.prepTime ?? undefined,

    cookTime: recipe.cookTime ?? undefined,

    restTime: recipe.restTime ?? undefined,

    servings: recipe.servings ?? undefined,

    ingredients: ingredients.map((ingredient) => ({
      name: ingredient.name,

      quantity: ingredient.quantity ?? undefined,

      unit: ingredient.unit ?? '',
    })),
  };

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-2 px-4 py-4 sm:px-6">
            <div>
              <CardTitle className="text-2xl">Modifier la recette</CardTitle>
              <CardDescription>
                Ajuste les détails de ta recette puis enregistre tes
                modifications.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-6 sm:px-6">
            <RecipeWizard
              initialData={initialData}
              mode="edit"
              recipeId={recipe.id}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
