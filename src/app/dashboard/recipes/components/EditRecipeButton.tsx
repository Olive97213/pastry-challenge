'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

type Props = {
  recipeId: string;
};

export default function EditRecipeButton({ recipeId }: Props) {
  const router = useRouter();

  function handleEdit() {
    router.push(`/dashboard/recipes/${recipeId}/edit`);
  }

  return (
    <Button type="button" variant="outline" onClick={handleEdit}>
      Modifier
    </Button>
  );
}
