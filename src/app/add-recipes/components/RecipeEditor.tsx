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
      <div className="grid min-h-[700px] grid-cols-[280px_1fr] overflow-hidden rounded-xl border">
        {/* Navigation de l'éditeur */}
        <aside className="border-r">
          <EditorSidebar />
        </aside>

        {/* Contenu principal */}
        <main className="flex min-h-[700px] flex-col p-6">
          {/* Zone d'édition */}
          <div className="flex-1">
            <EditorContent />
          </div>

          {/* Actions principales */}
          <EditorActions />
        </main>
      </div>
    </RecipeEditorProvider>
  );
}
