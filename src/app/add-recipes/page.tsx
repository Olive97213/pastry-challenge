import RecipeWizard from './components/RecipeWizard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Page de création de recette.
 */
export default function AddRecipePage() {
  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-2 px-4 py-4 sm:px-6">
            <CardTitle className="text-2xl">Nouvelle recette</CardTitle>
            <p className="text-muted-foreground text-sm">
              Suis les étapes pour ajouter ta recette et la partager avec la
              communauté.
            </p>
          </CardHeader>
          <CardContent className="px-4 py-6 sm:px-6">
            <RecipeWizard mode="create" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
