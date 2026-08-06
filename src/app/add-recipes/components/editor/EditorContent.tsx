'use client';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';

export default function EditorContent() {
  const { selectedView } = useRecipeEditor();

  if (selectedView === 'information') {
    return <div>Informations générales</div>;
  }

  if (selectedView === 'preparations') {
    return <div>Liste des préparations</div>;
  }

  if (selectedView === 'preview') {
    return <div>Aperçu de la recette</div>;
  }

  if (typeof selectedView === 'object' && selectedView.type === 'preparation') {
    return <div>Édition préparation :{selectedView.id}</div>;
  }

  return null;
}
