// Icône pour l'en-tête
import { BookOpen } from "lucide-react"
// Composant d'affichage des pâtisseries et type associé
import { PastryCardList, type Pastry } from "@/components/pastry-card-list"
// Fonction pour récupérer les données des pâtisseries
import { getMeals } from "@/services/mealServices"

// Page d'accueil principale
export default async function Home() {
  // Récupère toutes les pâtisseries depuis l'API externe
  const meals = await getMeals()
  // On limite l'affichage à 8 pâtisseries pour la page d'accueil
  const filteredMeals = meals.slice(0, 8)

  // On adapte les données reçues au format attendu par le composant d'affichage
  const pastries: Pastry[] = [
    ...filteredMeals.map((meal) => ({
      id: meal.idMeal,
      imageSrc: meal.strMealThumb,
      title: meal.strMeal,
      imageAlt: meal.strMeal,
    })),
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* En-tête de la page */}
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4">
            <BookOpen className="h-10 w-10 animate-bounce text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bienvenue sur RecetteBook
          </h1>
          <p className="max-w-md text-muted-foreground">
            Gérez et partagez vos recettes préférées. Commencez par ajouter
            votre première recette !
          </p>
        </div>
        {/* Section pâtisseries */}
        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Nos Pâtisseries
          </h2>
          {/* Affichage des cards de pâtisseries */}
          <PastryCardList pastries={pastries} />
        </div>
      </main>
    </div>
  )
}
