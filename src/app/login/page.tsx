"use client";


import { loginUser } from "@/actions/login";


export default function LoginPage() {


async function handleLogin(
  formData: FormData
) {

  const result = await loginUser(formData);

  console.log(result);

}


  return (

    <main className="flex min-h-screen items-center justify-center">

      <form
        action={handleLogin}
        className="flex w-full max-w-md flex-col gap-4"
      >

        <h1 className="text-2xl font-bold">
          Connexion
        </h1>


        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2"
        />


        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className="border p-2"
        />


        <button
          className="rounded bg-black p-2 text-white"
        >
          Se connecter
        </button>


      </form>

    </main>

  );
}