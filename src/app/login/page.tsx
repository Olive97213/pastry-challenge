"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

import { loginUser } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(formData: FormData) {
    setErrorMessage(null);

    const result = await loginUser(formData);

    if (!result?.success) {
      setErrorMessage(result?.message ?? "Une erreur est survenue");
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-primary/10 via-background to-secondary/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl items-center justify-center">
        <Card className="w-full border-border/60 shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <LogIn className="h-5 w-5" />
              <CardTitle className="text-2xl">Connexion</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Bienvenue à nouveau, connecte-toi pour retrouver tes recettes.
            </p>
          </CardHeader>

          <CardContent>
            <form action={handleLogin} className="space-y-5">
              {errorMessage && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
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
      </div>
    </main>
  );
}