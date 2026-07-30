import type { Recipe } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeButton from './EditRecipeButton';

type Props = {
  recipe: Recipe;
};

/**
 * Carte représentant une recette.
 */
export default function RecipeCard({ recipe }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recipe.description && (
          <p className="text-muted-foreground text-sm">{recipe.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            <div>{recipe.status}</div>
            <div>Créée le {recipe.createdAt.toLocaleDateString('fr-FR')}</div>
          </div>

          <div className="flex gap-2">
            <EditRecipeButton recipeId={recipe.id} />
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
