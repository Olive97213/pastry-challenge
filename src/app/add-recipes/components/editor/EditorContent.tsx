'use client';

import { useRecipeEditor } from '@/providers/RecipeEditorProvider';
import PreparationList from './PreparationList';
import PreparationEditor from './PreparationEditor';
import InformationEditor from './InformationEditor';
import RecipePreview from './RecipePreview';

export default function EditorContent() {
  const { selectedView } = useRecipeEditor();

  if (selectedView === 'information') {
    return <InformationEditor />;
  }

  if (selectedView === 'preparations') {
    return <PreparationList />;
  }

  if (selectedView === 'preview') {
    return <RecipePreview />;
  }

  if (typeof selectedView === 'object' && selectedView.type === 'preparation') {
    return <PreparationEditor preparationId={selectedView.id} />;
  }

  return null;
}
