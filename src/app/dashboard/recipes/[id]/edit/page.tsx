import { notFound, redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getRecipeById } from '@/data/recipes/getRecipeById';

import RecipeEditor from '@/app/add-recipes/components/RecipeEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { RecipeEditorData } from '@/types/recipe';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Transforme les données de la BDD
 * dans le format utilisé par l'éditeur.
 */
function mapRecipeToEditorData(
  recipe: NonNullable<Awaited<ReturnType<typeof getRecipeById>>>,
): RecipeEditorData {
  return {
    title: recipe.title,

    description: recipe.description ?? '',

    image: recipe.image ?? undefined,

    difficulty: recipe.difficulty,

    prepTime: recipe.prepTime ?? undefined,

    cookTime: recipe.cookTime ?? undefined,

    restTime: recipe.restTime ?? undefined,

    servings: recipe.servings ?? undefined,

    preparations: recipe.preparations.map((preparation) => ({
      id: preparation.id,

      title: preparation.title,

      description: preparation.description ?? '',

      position: preparation.position,

      ingredients: preparation.ingredients.map((ingredient) => ({
        id: ingredient.id,

        name: ingredient.name,

        quantity: ingredient.quantity ?? undefined,

        unit: ingredient.unit as RecipeEditorData['preparations'][number]['ingredients'][number]['unit'],

        note: ingredient.note ?? '',

        position: ingredient.position,
      })),

      steps: preparation.steps.map((step) => ({
        id: step.id,

        description: step.description,

        position: step.position,
      })),
    })),
  };
}

/**
 * Page de modification d'une recette.
 */
export default async function EditRecipePage({ params }: Props) {
  /**
   * Vérification de l'utilisateur connecté.
   */
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth-required?from=dashboard');
  }

  /**
   * Récupération de l'identifiant
   * présent dans l'URL.
   */
  const { id } = await params;

  /**
   * Récupération de la recette complète.
   */
  const recipe = await getRecipeById(id);

  /**
   * Recette inexistante.
   */
  if (!recipe) {
    notFound();
  }

  /**
   * Sécurité :
   * on vérifie que la recette appartient
   * bien à l'utilisateur connecté.
   */
  if (recipe.userId !== session.user.id) {
    notFound();
  }

  /**
   * Transformation des données BDD
   * pour notre éditeur.
   */
  const initialData = mapRecipeToEditorData(recipe);

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-2 px-4 py-4 sm:px-6">
            <CardTitle className="text-2xl">Modifier la recette</CardTitle>
            <p className="text-muted-foreground text-sm">
              Modifie les informations, préparations, ingrédients et étapes de
              ta recette.
            </p>
          </CardHeader>

          <CardContent className="px-4 py-6 sm:px-6">
            <RecipeEditor initialData={initialData} recipeId={recipe.id} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
