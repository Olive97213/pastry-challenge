'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  preparationSchema,
  type PreparationInput,
} from '@/schemas/recipe/preparation.schema';

import type { RecipeWizardData } from '@/types/recipe';

type Props = {
  data: RecipeWizardData;

  setData: React.Dispatch<React.SetStateAction<RecipeWizardData>>;

  onNext: () => void;

  onBack: () => void;
};

/**
 * Étape 3 du wizard.
 *
 * Gestion des instructions
 * et des différents temps.
 */
export default function StepPreparation({
  data,

  setData,

  onNext,

  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreparationInput>({
    resolver: zodResolver(preparationSchema),

    defaultValues: {
      instructions: data.instructions ?? '',

      prepTime: data.prepTime,

      cookTime: data.cookTime,

      restTime: data.restTime,

      servings: data.servings,
    },
  });

  function submit(values: PreparationInput) {
    /**
     * Fusion des données
     * avec le wizard global.
     */
    setData((previous) => ({
      ...previous,
      ...values,
    }));

    onNext();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Préparation</h2>

      <textarea
        {...register('instructions')}
        placeholder="
        Décrire les étapes de réalisation...
        "
      />

      {errors.instructions && <p>{errors.instructions.message}</p>}

      <input
        type="number"
        placeholder="
        Temps préparation (minutes)
        "
        {...register('prepTime', {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        placeholder="
        Temps cuisson (minutes)
        "
        {...register('cookTime', {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        placeholder="
        Temps repos (minutes)
        "
        {...register('restTime', {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        placeholder="
        Nombre de portions
        "
        {...register('servings', {
          valueAsNumber: true,
        })}
      />

      <button type="button" onClick={onBack}>
        Retour
      </button>

      <button type="submit">Continuer</button>
    </form>
  );
}
