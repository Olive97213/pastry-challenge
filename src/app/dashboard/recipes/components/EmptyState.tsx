import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * État vide.
 *
 * Affiché lorsqu'aucune recette
 * n'a encore été créée.
 */
export default function EmptyState() {
  return (
    <div className="py-6 text-center">
      <h3 className="text-lg font-medium">
        Aucune recette pour l&apos;instant
      </h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Tu n&apos;as encore créé aucune recette. Commence en ajoutant ta
        première recette.
      </p>

      <div className="mt-4">
        <Button asChild>
          <Link href="/add-recipes">Créer ma première recette</Link>
        </Button>
      </div>
    </div>
  );
}
