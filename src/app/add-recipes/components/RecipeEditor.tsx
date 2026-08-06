'use client';

import { RecipeEditorProvider } from '@/providers/RecipeEditorProvider';
import { defaultRecipe } from '@/lib/recipe/defaultRecipe';
import EditorSidebar from './editor/EditorSidebar';
import EditorContent from './editor/EditorContent';

type Props = {
  /**
   * Données initiales.
   *
   * Utilisées lors de l'édition.
   */
  initialData?: typeof defaultRecipe;
};

export default function RecipeEditor({ initialData = defaultRecipe }: Props) {
  return (
    <RecipeEditorProvider initialData={initialData}>
      <div className="grid min-h-[700px] grid-cols-[280px_1fr] overflow-hidden rounded-xl border">
        <aside className="border-r">
          <EditorSidebar />
        </aside>

        <main className="p-6">
          <EditorContent />
        </main>
      </div>
    </RecipeEditorProvider>
  );
}
