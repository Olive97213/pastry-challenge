import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignOutButton from '@/components/auth/SignOutButton';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/account');
  }

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-2 px-4 py-4 sm:px-6">
            <div>
              <CardTitle className="text-2xl">Mon profil</CardTitle>
              <CardDescription>
                Gère tes informations et accède rapidement à tes recettes.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-4 py-6 sm:px-6">
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">
                  Nom d&apos;utilisateur
                </p>
                <p className="mt-1 font-semibold">
                  {session.user.name ?? 'Utilisateur'}
                </p>
              </div>

              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Adresse e-mail</p>
                <p className="mt-1 font-semibold">
                  {session.user.email ?? 'Non renseigné'}
                </p>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">ID utilisateur</p>
                <p className="mt-1 text-sm break-all">{session.user.id}</p>
              </div>

              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Session</p>
                <p className="mt-1 text-sm">Connecté</p>
              </div>

              <div className="bg-background/70 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">Tableau de bord</p>
                <p className="mt-1 text-sm">
                  Accède à tes recettes et à tes créations.
                </p>
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard/recipes">Mes recettes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/add-recipes">Ajouter une recette</Link>
              </Button>
              <SignOutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
