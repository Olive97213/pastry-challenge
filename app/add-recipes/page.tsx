"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Clock, Users, Trash2, UtensilsCrossed } from "lucide-react"

interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string
  instructions: string
  prepTime: string
  servings: string
  createdAt: Date
}

export default function AddRecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    servings: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) return

    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
    }

    setRecipes((prev) => [newRecipe, ...prev])
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      instructions: "",
      prepTime: "",
      servings: "",
    })
  }

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Form Section */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <PlusCircle className="h-6 w-6 text-primary" />
              Ajouter une nouvelle recette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la recette *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Tarte aux pommes"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Une brève description de votre recette..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Temps de préparation</Label>
                  <div className="relative">
                    <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="prepTime"
                      name="prepTime"
                      placeholder="Ex: 45 minutes"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Nombre de personnes</Label>
                  <div className="relative">
                    <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="servings"
                      name="servings"
                      placeholder="Ex: 4 personnes"
                      value={formData.servings}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingrédients</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  placeholder="Listez vos ingrédients (un par ligne)..."
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Décrivez les étapes de préparation..."
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter la recette
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recipes List Section */}
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            Recettes ajoutées ({recipes.length})
          </h2>

          {recipes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  Aucune recette ajoutée
                </p>
                <p className="text-sm text-muted-foreground">
                  Utilisez le formulaire ci-dessus pour ajouter votre première
                  recette
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 p-5">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="text-lg font-semibold">
                            {recipe.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRecipe(recipe.id)}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                            aria-label="Supprimer la recette"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {recipe.description && (
                          <p className="mb-3 text-sm text-muted-foreground">
                            {recipe.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {recipe.prepTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {recipe.prepTime}
                            </span>
                          )}
                          {recipe.servings && (
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {recipe.servings}
                            </span>
                          )}
                        </div>

                        {recipe.ingredients && (
                          <div className="mt-4">
                            <p className="mb-1 text-sm font-medium">
                              Ingrédients:
                            </p>
                            <p className="text-sm whitespace-pre-line text-muted-foreground">
                              {recipe.ingredients}
                            </p>
                          </div>
                        )}

                        {recipe.instructions && (
                          <div className="mt-4">
                            <p className="mb-1 text-sm font-medium">
                              Instructions:
                            </p>
                            <p className="text-sm whitespace-pre-line text-muted-foreground">
                              {recipe.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
