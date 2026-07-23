import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

// Définition des props attendues par le composant RecipesCard
interface RecipesCardProps {
  name: string
  description: string
  ingredients: string
  instructions: string
  prepTime: string
  servings: string
}

// Composant de card qui affiche les informations d'une recette
export function RecipesCard({
  name,
  description,
  ingredients,
  instructions,
  prepTime,
  servings,
}: RecipesCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden py-0 transition-shadow hover:shadow-md">
      {/* Section image commentée : peut être réactivée plus tard si besoin */}
      {/* <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover"
        />
      </div> */}
      <CardHeader className="pt-4">
        {/* Titre et description de la recette */}
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Détails rapides présentés sous forme de liste */}
        <ul>
          <li>⏱ {prepTime}</li>
          <li>👥 {servings} personnes</li>
          <li>🥗 {ingredients}</li>
          <li>👩‍🍳 {instructions}</li>
        </ul>
      </CardContent>
    </Card>
  )
}
