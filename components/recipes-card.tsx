import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface RecipesCardProps {
  name: string
  description: string
  ingredients: string
  instructions: string
  prepTime: string
  servings: string
}

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
      {/* <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover"
        />
      </div> */}
      <CardHeader className="pt-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
