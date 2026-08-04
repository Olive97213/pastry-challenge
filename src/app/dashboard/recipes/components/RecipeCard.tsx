import type { Recipe } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeButton from './EditRecipeButton';
import GetRecipeButton from './GetRecipeButton';
import Image from 'next/image';

type Props = {
  recipe: Recipe;
};

/**
 * Carte représentant une recette.
 */
export default function RecipeCard({ recipe }: Props) {
  return (
    <Card className="overflow-hidden">
      {recipe.image && (
        <div className="relative aspect-video">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      )}
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

          <div className="flex flex-wrap gap-2">
            <GetRecipeButton slug={recipe.slug} />
            <EditRecipeButton recipeId={recipe.id} />
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
