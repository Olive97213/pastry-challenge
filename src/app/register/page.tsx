"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterInput,
} from "@/schemas/auth.schema";

import { registerUser } from "@/actions/auth";


export default function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registerSchema as any),
  });


  async function onSubmit(data: RegisterInput) {

    const result = await registerUser(data);

    console.log(result);

  }


  return (
    <main className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4"
      >

        <h1 className="text-2xl font-bold">
          Créer un compte
        </h1>


        <input
          {...register("name")}
          placeholder="Pseudo"
          className="border p-2"
        />

        {
          errors.name && (
            <p className="text-red-500">
              {errors.name.message}
            </p>
          )
        }


        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="border p-2"
        />

        {
          errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )
        }


        <input
          {...register("password")}
          placeholder="Mot de passe"
          type="password"
          className="border p-2"
        />

        {
          errors.password && (
            <p className="text-red-500">
              {errors.password.message}
            </p>
          )
        }


        <button
          disabled={isSubmitting}
          className="rounded bg-black p-2 text-white"
        >
          {
            isSubmitting
              ? "Création..."
              : "Créer mon compte"
          }
        </button>


      </form>

    </main>
  );
}