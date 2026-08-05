import Link from 'next/link';

import { LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  searchParams: Promise<{
    from?: string;
  }>;
};

/**
 * Page affichée lorsqu'une action
 * nécessite une authentification.
 */
export default async function AuthRequiredPage({ searchParams }: Props) {
  const { from } = await searchParams;

  const messages: Record<string, string> = {
    'add-recipes': 'Vous devez être connecté pour créer une recette.',

    favorites:
      'Vous devez être connecté pour ajouter cette recette à vos favoris.',

    comments: 'Vous devez être connecté pour publier un commentaire.',
  };

  const message =
    messages[from ?? ''] ??
    'Vous devez être connecté pour accéder à cette fonctionnalité.';

  const callbackUrl =
    from === 'add-recipes'
      ? '/add-recipes'
      : from === 'favorites'
        ? '/favorites'
        : from === 'comments'
          ? '/comments'
          : '/';

  const authHref = `/account?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <main className="from-primary/10 via-background to-secondary/10 flex min-h-screen items-center justify-center bg-linear-to-br px-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <LockKeyhole className="text-primary h-8 w-8" />
          </div>

          <CardTitle className="text-2xl">Connexion requise</CardTitle>

          <CardDescription className="text-base">{message}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href={authHref}>Se connecter</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href={authHref}>Créer un compte</Link>
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Rejoins la communauté Pastry Challenge et partage tes meilleures
            créations.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
