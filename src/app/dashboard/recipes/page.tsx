import { getUserRecipes } from '@/actions/recipes/getUserRecipes';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import EmptyState from './components/EmptyState';
import RecipeList from './components/RecipeList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Tableau de bord des recettes.
 *
 * Affiche toutes les recettes
 * appartenant à l'utilisateur connecté.
 */
export default async function DashboardRecipesPage() {
  const recipes = await getUserRecipes();

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Mes recettes</CardTitle>
            </div>

            <div>
              <Button asChild>
                <Link href="/add-recipes">
                  <span className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Nouvelle recette
                  </span>
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {recipes.length === 0 ? (
              <EmptyState />
            ) : (
              <RecipeList recipes={recipes} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
