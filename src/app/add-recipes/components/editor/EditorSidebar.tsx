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
    <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 md:block">
        <h2 className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          Éditeur
        </h2>
      </div>

      <div className="grid gap-2 md:grid-cols-1">
        {/* Informations générales */}
        <Button
          variant={isInformationSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start rounded-xl px-3 py-2.5 text-sm font-medium"
          onClick={() => setSelectedView('information')}
        >
          Informations
        </Button>

        {/* Préparations */}
        <Button
          variant={isPreparationsSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start rounded-xl px-3 py-2.5 text-sm font-medium"
          onClick={() => setSelectedView('preparations')}
        >
          Préparations
        </Button>

        {/* Aperçu */}
        <Button
          variant={isPreviewSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start rounded-xl px-3 py-2.5 text-sm font-medium"
          onClick={() => setSelectedView('preview')}
        >
          Aperçu
        </Button>
      </div>
    </div>
  );
}
