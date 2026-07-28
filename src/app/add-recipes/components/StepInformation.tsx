'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  recipeInformationSchema,
  type RecipeInformationInput,
} from '@/schemas/recipe/information.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  data: Record<string, unknown>;

  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;

  onNext: () => void;
};

/**
 * Première étape du wizard.
 *
 * Collecte les informations générales
 * d'une recette.
 */
export default function StepInformation({ data, setData, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeInformationInput>({
    resolver: zodResolver(recipeInformationSchema),

    defaultValues: {
      title: (data.title as string) ?? '',
      description: (data.description as string) ?? '',
      difficulty:
        (data.difficulty as RecipeInformationInput['difficulty']) ?? 'BEGINNER',
    },
  });

  function submit(values: RecipeInformationInput) {
    setData((previous) => ({
      ...previous,
      ...values,
    }));

    onNext();
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Informations générales</h2>
        <p className="text-muted-foreground text-sm">
          Donne un titre, une description et choisis le niveau de difficulté.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="title">
          Nom de la recette
        </label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Nom de la recette"
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Description de la recette"
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="difficulty">
          Difficulté
        </label>
        <select
          id="difficulty"
          {...register('difficulty')}
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none"
        >
          <option value="BEGINNER">Débutant</option>
          <option value="INTERMEDIATE">Intermédiaire</option>
          <option value="ADVANCED">Avancé</option>
        </select>
        {errors.difficulty && (
          <p className="text-destructive text-sm">
            {errors.difficulty.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Continuer
      </Button>
    </form>
  );
}
