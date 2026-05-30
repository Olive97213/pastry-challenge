import { getRecipesAction } from "../add-recipes/action"
import { RecipesCardList } from "@/components/recipes-card-list"
import { UtensilsCrossed } from "lucide-react"

export default async function Page() {
  const recipes = await getRecipesAction()
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-2 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4">
            <UtensilsCrossed className="h-10 w-10 animate-bounce text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Mes Recettes
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Retrouvez ici toutes vos créations culinaires sauvegardées. Cliquez
            sur une carte pour voir les détails ou partager vos meilleures
            recettes !
          </p>
        </div>
        <div className="animate-fade-in-up">
          <RecipesCardList recipes={recipes ?? []} />
        </div>
      </div>
    </main>
  )
}
