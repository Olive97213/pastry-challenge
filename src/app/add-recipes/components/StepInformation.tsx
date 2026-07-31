'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  recipeInformationSchema,
  type RecipeInformationInput,
} from '@/schemas/recipe/information.schema';

import type { RecipeWizardData } from '@/types/recipe';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import ImageUploader from '@/components/upload/ImageUploader';

type Props = {
  /**
   * Données du wizard.
   */
  data: RecipeWizardData;

  /**
   * Mise à jour des données
   * du wizard.
   */
  setData: React.Dispatch<React.SetStateAction<RecipeWizardData>>;

  /**
   * Passage à l'étape suivante.
   */
  onNext: () => void;
};

/**
 * Première étape du wizard.
 *
 * Collecte les informations
 * générales d'une recette.
 */
export default function StepInformation({ data, setData, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeInformationInput>({
    resolver: zodResolver(recipeInformationSchema),

    defaultValues: {
      title: data.title ?? '',

      description: data.description ?? '',

      difficulty: data.difficulty ?? 'BEGINNER',
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
        <label htmlFor="title" className="text-sm font-medium">
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
        <label htmlFor="description" className="text-sm font-medium">
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
        <label htmlFor="recipe-image" className="text-sm font-medium">
          Image de la recette
        </label>

        <ImageUploader
          id="recipe-image"
          value={data.image}
          onChange={(url) =>
            setData((previous) => ({
              ...previous,

              image: url,
            }))
          }
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="difficulty" className="text-sm font-medium">
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
