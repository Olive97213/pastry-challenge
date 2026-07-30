'use client';

import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import type { RecipeWizardData } from '@/types/recipe';

import { Button } from '@/components/ui/button';
import StepInformation from './StepInformation';
import StepIngredients from './StepIngredients';
import StepPreparation from './StepPreparation';
import StepSummary from './StepSummary';

type Props = {
  /**
   * Données initiales du wizard.
   */
  initialData?: RecipeWizardData;

  /**
   * Mode de fonctionnement.
   */
  mode?: 'create' | 'edit';

  /**
   * Identifiant de la recette.
   *
   * Utilisé uniquement
   * lors de l'édition.
   */
  recipeId?: string;
};

/**

* Wizard de création et de modification
* d'une recette.
  */
export default function RecipeWizard({
  initialData,
  mode = 'create',
  recipeId,
}: Props) {
  /**
   * Étape actuelle du wizard.
   */
  const [step, setStep] = useState(1);
  /**

* État global du wizard.
*
* Lors d'une création, il démarre vide.
* Lors d'une édition, il est prérempli
* avec les données de la recette.
  */
  const [data, setData] = useState<RecipeWizardData>(initialData ?? {});

  function nextStep() {
    setStep((previous) => previous + 1);
  }

  function previousStep() {
    setStep((previous) => previous - 1);
  }

  return (
    <div className="space-y-4">
      {mode === 'edit' && (
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard/recipes">
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </span>
          </Link>
        </Button>
      )}

      {step === 1 && (
        <StepInformation data={data} setData={setData} onNext={nextStep} />
      )}

      {step === 2 && (
        <StepIngredients
          data={data}
          setData={setData}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {step === 3 && (
        <StepPreparation
          data={data}
          setData={setData}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {step === 4 && (
        <StepSummary
          data={data}
          onBack={previousStep}
          mode={mode}
          recipeId={recipeId}
        />
      )}
    </div>
  );
}
