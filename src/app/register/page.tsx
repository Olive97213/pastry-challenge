"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

import {
  registerSchema,
  type RegisterInput,
} from "@/schemas/auth.schema";

import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export function RegisterForm() {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registerSchema as any),
  });


  async function onSubmit(data: RegisterInput) {
    setFeedback(null);

    const result = await registerUser(data);

    if (result.success) {
      reset({ username: "", email: "", password: "" });
      setFeedback({ type: "success", message: result.message });
      return;
    }

    setFeedback({ type: "error", message: result.message });
  }


  return (
    <Card className="w-full border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <UserPlus className="h-5 w-5" />
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Rejoins la communauté et partage tes meilleures recettes.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {feedback && (
            <div
              className={`rounded-md border px-3 py-2 text-sm ${
                feedback.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-destructive/20 bg-destructive/10 text-destructive"
              }`}
            >
              {feedback.message}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="username">
              Pseudo
            </label>
            <Input
              id="username"
              {...register("username")}
              placeholder="Votre pseudo"
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              {...register("email")}
              placeholder="exemple@email.com"
              type="email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              {...register("password")}
              placeholder="Minimum 8 caractères"
              type="password"
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-primary/10 via-background to-secondary/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl items-center justify-center">
        <RegisterForm />
      </div>
    </main>
  );
}