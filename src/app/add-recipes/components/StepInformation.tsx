'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  recipeInformationSchema,
  type RecipeInformationInput,
} from '@/schemas/recipe/information.schema';

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
    /**
     * Fusion des données de cette étape
     * avec les données globales du wizard.
     */
    setData((previous) => ({
      ...previous,
      ...values,
    }));

    onNext();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Informations générales</h2>

      <input {...register('title')} placeholder="Nom de la recette" />

      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register('description')} placeholder="Description" />

      <select {...register('difficulty')}>
        <option value="BEGINNER">Débutant</option>

        <option value="INTERMEDIATE">Intermédiaire</option>

        <option value="ADVANCED">Avancé</option>
      </select>

      <button type="submit">Continuer</button>
    </form>
  );
}
