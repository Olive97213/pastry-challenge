// Import du composant Image optimisé de Next.js
import Image from "next/image"
// Import des composants de carte réutilisables
import { Card, CardHeader, CardTitle } from "./ui/card"

// Définition des props attendues par le composant PastryCard
interface PastryCardProps {
  imageSrc: string
  title: string
  imageAlt?: string
}

// Composant qui affiche une carte de pâtisserie avec une image et un titre
export function PastryCard({ imageSrc, title, imageAlt }: PastryCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden py-0">
      {/* Conteneur de l'image avec ratio fixe pour garder une taille constante */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pt-4">
        {/* Titre de la pâtisserie */}
        <CardTitle className="text-xl">{title}</CardTitle>
        {/* Description commentée pour évoluer plus tard */}
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
    </Card>
  )
}
