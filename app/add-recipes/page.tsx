"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PlusCircle,
  Clock,
  Users,
  Trash2,
  UtensilsCrossed,
  Pencil,
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema, FormSchemaType } from "./schema"
import { toast } from "sonner"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Recipe } from "@/lib/types"
import {
  addRecipesAction,
  deleteRecipesAction,
  updateRecipesAction,
} from "./action"
import { getRecipesAction } from "./action"

export default function AddRecipesForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: "",
      instructions: "",
      prepTime: "",
      servings: "",
    },
  })
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipesAction()
      setRecipes(recipes ?? [])
    }
    fetchRecipes()
  }, [])

  async function onSubmit(data: FormSchemaType) {
    const newRecipe = {
      ...data,
      createdAt: new Date(),
      id: crypto.randomUUID(),
    }
    if (editingRecipe) {
      await updateRecipesAction(editingRecipe.id, newRecipe)
      setEditingRecipe(null)
      toast.success("Recette mise à jour !")
    } else {
      // Mode ajout
      await addRecipesAction(newRecipe)
      toast.success("Recette ajoutée !", {
        description: `La recette "${data.name}" a été ajoutée avec succès !`,
      })
    }
    const updatedRecipes = await getRecipesAction()
    setRecipes(updatedRecipes ?? [])
    form.reset({
      name: "",
      description: "",
      ingredients: "",
      instructions: "",
      prepTime: "",
      servings: "",
    }) // Réinitialiser le formulaire après soumission
  }

  function handleEdit(recipe: Recipe) {
    setEditingRecipe(recipe)
    form.reset(recipe) // Remplir le formulaire avec les données de la recette à éditer
  }

  async function deleteRecipe(id: string): Promise<void> {
    await deleteRecipesAction(id)
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
    toast.success("Recette supprimée !", {
      description: `La recette a été supprimée avec succès !`,
    })
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Nom de la recette</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Tarte aux pommes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Une brève description de votre recette..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Temps de préparation</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="Ex: 45 minutes"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Nombre de personnes</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="Ex: 4 personnes"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Ingrédients</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Listez vos ingrédients (un par ligne)..."
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez les étapes de préparation..."
                          {...field}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter la recette
                </Button>
              </form>
            </Form>
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
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 text-muted-foreground hover:text-primary"
                              aria-label="Modifier la recette"
                              onClick={() => handleEdit(recipe)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
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
