'use client';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';
import PreparationList from './PreparationList';
import PreparationEditor from './PreparationEditor';

export default function EditorContent() {
  const { selectedView } = useRecipeEditor();

  if (selectedView === 'information') {
    return <div>Informations générales</div>;
  }

  if (selectedView === 'preparations') {
    return <PreparationList />;
  }

  if (selectedView === 'preview') {
    return <div>Aperçu de la recette</div>;
  }

  if (typeof selectedView === 'object' && selectedView.type === 'preparation') {
    return <PreparationEditor preparationId={selectedView.id} />;
  }

  return null;
}
