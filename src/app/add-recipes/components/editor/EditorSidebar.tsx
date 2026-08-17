'use client';

import { Button } from '@/components/ui/button';
import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

export default function EditorSidebar() {
  const { selectedView, setSelectedView } = useRecipeEditor();
  return (
    <div className="flex h-full flex-col p-4">
      <h2 className="mb-6 text-lg font-semibold">Éditeur</h2>

      <div className="space-y-2">
        <Button variant="secondary" className="w-full justify-start">
          Informations
        </Button>

        <Button
          variant={selectedView === 'preparations' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setSelectedView('preparations')}
        >
          Préparations
        </Button>

        <Button variant="ghost" className="w-full justify-start">
          Aperçu
        </Button>
      </div>
    </div>
  );
}
