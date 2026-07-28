'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  preparationSchema,
  type PreparationInput,
} from '@/schemas/recipe/preparation.schema';
import type { RecipeWizardData } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    setData((previous) => ({
      ...previous,
      ...values,
    }));

    onNext();
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Préparation</h2>
        <p className="text-muted-foreground text-sm">
          Décris les étapes de réalisation et les temps associés.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="instructions">
          Instructions
        </label>
        <Textarea
          id="instructions"
          {...register('instructions')}
          placeholder="Décrire les étapes de réalisation..."
        />
        {errors.instructions && (
          <p className="text-destructive text-sm">
            {errors.instructions.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="prepTime">
            Temps préparation (min)
          </label>
          <Input
            id="prepTime"
            type="number"
            placeholder="0"
            {...register('prepTime', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="cookTime">
            Temps cuisson (min)
          </label>
          <Input
            id="cookTime"
            type="number"
            placeholder="0"
            {...register('cookTime', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="restTime">
            Temps repos (min)
          </label>
          <Input
            id="restTime"
            type="number"
            placeholder="0"
            {...register('restTime', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="servings">
            Nombre de portions
          </label>
          <Input
            id="servings"
            type="number"
            placeholder="0"
            {...register('servings', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Continuer</Button>
      </div>
    </form>
  );
}
