'use client';

import { Button } from '@/components/ui/button';
import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

/**
 * Barre latérale de navigation
 * de l'éditeur de recette.
 *
 * Elle permet de naviguer entre :
 *
 * - les informations générales ;
 * - les préparations ;
 * - l'aperçu.
 */
export default function EditorSidebar() {
  const { selectedView, setSelectedView } = useRecipeEditor();

  /**
   * Détermine si la vue actuellement
   * affichée correspond aux informations.
   */
  const isInformationSelected = selectedView === 'information';

  /**
   * Détermine si la vue actuellement
   * affichée correspond aux préparations.
   */
  const isPreparationsSelected = selectedView === 'preparations';

  /**
   * L'aperçu est sélectionné uniquement
   * lorsque selectedView vaut "preview".
   */
  const isPreviewSelected = selectedView === 'preview';

  return (
    <div className="flex h-full flex-col p-4">
      <h2 className="mb-6 text-lg font-semibold">Éditeur</h2>

      <div className="space-y-2">
        {/* Informations générales */}
        <Button
          variant={isInformationSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setSelectedView('information')}
        >
          Informations
        </Button>

        {/* Préparations */}
        <Button
          variant={isPreparationsSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setSelectedView('preparations')}
        >
          Préparations
        </Button>

        {/* Aperçu */}
        <Button
          variant={isPreviewSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setSelectedView('preview')}
        >
          Aperçu
        </Button>
      </div>
    </div>
  );
}
