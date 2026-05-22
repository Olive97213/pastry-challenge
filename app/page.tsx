import { BookOpen } from "lucide-react"
import { PastryCardList, type Pastry } from "@/components/pastry-card-list"
import { getMeals } from "@/services/mealServices"

export default async function Home() {
  const meals = await getMeals()
  const filteredMeals = meals.slice(0, 8) // Limiter à 8 pâtisseries pour l'affichage

  const pastries: Pastry[] = [
    ...filteredMeals.map((meal) => ({
      id: meal.idMeal,
      imageSrc: meal.strMealThumb,
      title: meal.strMeal,
      imageAlt: meal.strMeal,
    })),
  ]
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bienvenue sur RecetteBook
          </h1>
          <p className="max-w-md text-muted-foreground">
            Gérez et partagez vos recettes préférées. Commencez par ajouter
            votre première recette !
          </p>
        </div>
        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Nos Pâtisseries
          </h2>
          <PastryCardList pastries={pastries} />
        </div>
      </main>
    </div>
  )
}
