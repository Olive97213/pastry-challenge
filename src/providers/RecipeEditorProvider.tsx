'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { RecipeEditorData } from '@/types/recipe';

/**
 * Les différentes zones
 * accessibles dans l'éditeur.
 */
export type RecipeEditorView =
  | 'information'
  | 'preparations'
  | 'preview'
  | {
      type: 'preparation';
      id: string;
    };

/**
 * Valeur disponible dans le contexte.
 */
type RecipeEditorContextValue = {
  /**
   * Données de la recette.
   */
  data: RecipeEditorData;

  /**
   * Mise à jour complète
   * des données.
   */
  setData: React.Dispatch<React.SetStateAction<RecipeEditorData>>;

  /**
   * Vue actuellement affichée.
   */
  selectedView: RecipeEditorView;

  /**
   * Modifier la vue active.
   */
  setSelectedView: React.Dispatch<React.SetStateAction<RecipeEditorView>>;
};

const RecipeEditorContext = createContext<RecipeEditorContextValue | null>(
  null,
);

type Props = {
  children: ReactNode;

  initialData: RecipeEditorData;
};

/**
 * Provider principal
 * de l'éditeur de recette.
 */
export function RecipeEditorProvider({ children, initialData }: Props) {
  const [data, setData] = useState<RecipeEditorData>(initialData);

  /**
   * Vue affichée par défaut.
   */
  const [selectedView, setSelectedView] =
    useState<RecipeEditorView>('information');

  const value = useMemo(
    () => ({
      data,
      setData,

      selectedView,
      setSelectedView,
    }),
    [data, selectedView],
  );

  return (
    <RecipeEditorContext.Provider value={value}>
      {children}
    </RecipeEditorContext.Provider>
  );
}

/**
 * Hook permettant d'utiliser
 * l'éditeur depuis n'importe quel composant.
 */
export function useRecipeEditor() {
  const context = useContext(RecipeEditorContext);

  if (!context) {
    throw new Error(
      'useRecipeEditor doit être utilisé dans RecipeEditorProvider.',
    );
  }

  return context;
}
