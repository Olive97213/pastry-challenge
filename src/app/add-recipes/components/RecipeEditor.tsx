'use client';

import { RecipeEditorProvider } from '@/providers/RecipeEditorProvider';
import { defaultRecipe } from '@/lib/recipe/defaultRecipe';

import EditorSidebar from './editor/EditorSidebar';
import EditorContent from './editor/EditorContent';
import EditorActions from './editor/EditorActions';

type Props = {
  /**
   * Données initiales.
   *
   * Utilisées lors de l'édition.
   */
  initialData?: typeof defaultRecipe;
};

/**
 * Éditeur principal de recette.
 *
 * Le Provider contient l'ensemble des données
 * modifiées dans l'éditeur.
 *
 * L'interface est composée de :
 *
 * - la barre latérale de navigation ;
 * - la zone de contenu ;
 * - les actions principales de sauvegarde.
 */
export default function RecipeEditor({ initialData = defaultRecipe }: Props) {
  return (
    <RecipeEditorProvider initialData={initialData}>
      <div className="border-border/70 bg-card/90 overflow-hidden rounded-[28px] border shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] backdrop-blur-sm">
        <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
          {/* Navigation de l'éditeur */}
          <aside className="border-border/70 bg-muted/30 border-b md:border-r md:border-b-0">
            <EditorSidebar />
          </aside>

          {/* Contenu principal */}
          <main className="flex min-h-[420px] flex-col gap-5 p-4 sm:p-5 lg:p-6">
            {/* Zone d'édition */}
            <div className="flex-1">
              <EditorContent />
            </div>

            {/* Actions principales */}
            <EditorActions />
          </main>
        </div>
      </div>
    </RecipeEditorProvider>
  );
}
