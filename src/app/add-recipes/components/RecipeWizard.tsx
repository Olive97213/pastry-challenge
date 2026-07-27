'use client';

import { useState } from 'react';
import type { RecipeWizardData } from '@/types/recipe';

import StepInformation from './StepInformation';
import StepIngredients from './StepIngredients';
import StepPreparation from './StepPreparation';
import StepSummary from './StepSummary';

/**
 * Gestionnaire principal
 * du parcours de création d'une recette.
 */
export default function RecipeWizard() {
  /**
   * Étape actuellement affichée.
   */
  const [currentStep, setCurrentStep] = useState(1);

  /**
   * Données temporaires
   * conservées pendant le wizard.
   */
  const [recipeData, setRecipeData] = useState<RecipeWizardData>({});

  /**
   * Passage à l'étape suivante.
   */
  function nextStep() {
    setCurrentStep((step) => step + 1);
  }

  /**
   * Retour à l'étape précédente.
   */
  function previousStep() {
    setCurrentStep((step) => step - 1);
  }

  return (
    <div>
      {currentStep === 1 && (
        <StepInformation
          data={recipeData}
          setData={setRecipeData}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <StepIngredients
          data={recipeData}
          setData={setRecipeData}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {currentStep === 3 && (
        <StepPreparation
          data={recipeData}
          setData={setRecipeData}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {currentStep === 4 && (
        <StepSummary data={recipeData} onBack={previousStep} />
      )}
    </div>
  );
}
