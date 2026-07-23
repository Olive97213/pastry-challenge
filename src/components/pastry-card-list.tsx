// Composant de carte unique pour afficher une pâtisserie
import { PastryCard } from "@/components/pastry-card"

// Type réutilisable représentant une pâtisserie
import { Pastry } from "@/lib/types"

// Composant de liste qui transforme un tableau de pâtisseries en cards
export function PastryCardList({ pastries }: { pastries: Pastry[] }) {
  return (
    // Grille responsive : 1 colonne sur mobile, plusieurs colonnes sur desktop
    <div className="grid grid-cols-1 place-items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pastries.map((pastry: Pastry) => (
        <PastryCard
          key={pastry.id}
          imageSrc={pastry.imageSrc}
          title={pastry.title}
          imageAlt={pastry.imageAlt}
        />
      ))}
    </div>
  )
}
// Réexport du type Pastry pour simplifier les imports ailleurs
export type { Pastry }
