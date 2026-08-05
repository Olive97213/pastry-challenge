'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LogIn } from 'lucide-react';

import { loginUser } from '@/actions/auth/login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type LoginFormProps = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(formData: FormData) {
    setErrorMessage(null);

    const result = await loginUser(formData);

    if (!result?.success) {
      setErrorMessage(result?.message ?? 'Une erreur est survenue');
    }
  }

  return (
    <Card className="border-border/60 w-full shadow-sm">
      <CardHeader className="space-y-2">
        <div className="text-primary flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          <CardTitle className="text-2xl">Connexion</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm">
          Bienvenue à nouveau, connecte-toi pour retrouver tes recettes.
        </p>
      </CardHeader>

      <CardContent>
        <form action={handleLogin} className="space-y-5">
          <input type="hidden" name="callbackUrl" value={callbackUrl ?? '/'} />

          {errorMessage && (
            <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? undefined;

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl items-center justify-center">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </main>
  );
}
