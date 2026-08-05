'use client';

// Composants UI utilisés pour construire le formulaire et les cards
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Icônes utilisées dans le formulaire et la liste des recettes
import {
  PlusCircle,
  Clock,
  Users,
  Trash2,
  UtensilsCrossed,
  Pencil,
} from 'lucide-react';
// Résolution de validation pour react-hook-form avec zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// Schéma de validation et types du formulaire
import { formSchema, FormSchemaType } from './schema';
// Notifications visuelles pour l'utilisateur
import { toast } from 'sonner';
// Composants de formulaire personnalisés
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
// Hooks React pour gérer l'état, l'effet et l'optimistic UI
import {
  startTransition,
  useEffect,
  useOptimistic,
  useState,
  useRef,
} from 'react';
// Types et interfaces de recettes
import { OptimisticField, Recipe, RecipeOptimistic } from '@/lib/types';
// Actions pour ajouter, mettre à jour et supprimer des recettes
import {
  addRecipesAction,
  deleteRecipesAction,
  updateRecipesAction,
} from './action';
import { getRecipesAction } from './action';

// Utilitaire de concaténation conditionnelle de classes
import { cn } from '@/lib/utils';

// Composant principal du formulaire d'ajout/édition de recettes
export default function AddRecipesForm() {
  // Initialisation du formulaire avec validation et valeurs par défaut
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      servings: '',
    },
  });
  // État local pour stocker les recettes affichées
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // État pour savoir si on est en train d'éditer une recette existante
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  // Optimistic UI : on montre immédiatement la recette ajoutée pendant que l'action se termine
  const [optimisticRecipes, addOptimisticRecipes] = useOptimistic<
    RecipeOptimistic[],
    OptimisticField
  >(recipes, (state, optimisticValue) => [...state, optimisticValue]);
  // Référence vers le conteneur du formulaire pour effectuer un scroll en mode édition
  const formRef = useRef<HTMLDivElement>(null);
  // Indicateur de soumission en cours pour désactiver les boutons
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charge les recettes enregistrées une seule fois au montage du composant
  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipesAction();
      setRecipes(recipes ?? []);
    };
    fetchRecipes();
  }, []);

  // Gestion de la soumission du formulaire pour l'ajout ou la mise à jour
  async function onSubmit(data: FormSchemaType) {
    setIsSubmitting(true);
    startTransition(() => {
      (async () => {
        try {
          // Crée l'objet recette à partir du formulaire
          const newRecipe = {
            ...data,
            createdAt: new Date(),
            id: crypto.randomUUID(),
          };
          // Ajout optimiste pour afficher rapidement la nouvelle recette
          addOptimisticRecipes({ ...newRecipe, sending: true });
          if (editingRecipe) {
            // Mise à jour d'une recette existante
            const result = await updateRecipesAction(
              editingRecipe.id,
              newRecipe,
            );
            if (!result.success) {
              toast.error(result.message ?? 'Une erreur est survenue');
              return;
            }
            toast.success('Recette mise à jour !');
          } else {
            // Ajout d'une nouvelle recette
            const result = await addRecipesAction(newRecipe);
            if (!result.success) {
              toast.error(result.message ?? 'Une erreur est survenue');
              return;
            }
            toast.success('Recette ajoutée !', {
              description: `La recette "${data.name}" a été ajoutée avec succès !`,
            });
          }
          // Recharge la liste des recettes après le traitement
          const updatedRecipes = await getRecipesAction();
          setRecipes(updatedRecipes ?? []);
          // Réinitialise le formulaire après la soumission
          form.reset({
            name: '',
            description: '',
            ingredients: '',
            instructions: '',
            prepTime: '',
            servings: '',
          });
          setEditingRecipe(null);
        } finally {
          setIsSubmitting(false);
        }
      })();
    });
  }

  // Passe le formulaire en mode édition en remplissant les champs
  function handleEdit(recipe: Recipe) {
    setEditingRecipe(recipe);
    form.reset(recipe); // Remplir le formulaire avec les données de la recette à éditer
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Annule l'édition en cours et remet le formulaire à zéro
  function handleCancelEdit() {
    setEditingRecipe(null);
    form.reset({
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      servings: '',
    });
  }

  // Supprime une recette et recharge la liste de recettes
  async function deleteRecipe(id: string): Promise<void> {
    await deleteRecipesAction(id);
    const updatedRecipes = await getRecipesAction();
    setRecipes(updatedRecipes ?? []);
    toast.success('Recette supprimée !', {
      description: `La recette a été supprimée avec succès !`,
    });
    setEditingRecipe(null);
  }

  return (
    <div className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Section de formulaire : ajout ou édition d'une recette */}
        {/* Form Section */}
        <Card className="mb-10" ref={formRef}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <PlusCircle className="text-primary h-6 w-6" />
              {editingRecipe
                ? 'Modifier la recette'
                : 'Ajouter une nouvelle recette'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Champ : nom de la recette */}
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
                {/* Champ : description de la recette */}
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
                {/* Champs groupés : temps de préparation et nombre de portions */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Temps de préparation</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
                  {/* Champ : nombre de personnes pour la recette */}
                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Nombre de personnes</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
                {/* Champ : ingrédients de la recette */}
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
                {/* Champ : instructions de préparation */}
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
                {/* Boutons de soumission et d'annulation */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  {editingRecipe ? (
                    <>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        variant="default"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="mr-2 h-4 w-4 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                            Enregistrement...
                          </span>
                        ) : (
                          <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier la recette
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        variant="secondary"
                        onClick={handleCancelEdit}
                        disabled={isSubmitting}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            ></path>
                          </svg>
                          Enregistrement...
                        </span>
                      ) : (
                        <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Ajouter la recette
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        {/* Section liste des recettes ajoutées */}
        {/* Recipes List Section */}
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <UtensilsCrossed className="text-primary h-5 w-5" />
            Recettes ajoutées ({recipes.length})
          </h2>

          {recipes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted mb-4 rounded-full p-4">
                  <UtensilsCrossed className="text-muted-foreground h-8 w-8" />
                </div>
                <p className="text-muted-foreground text-lg font-medium">
                  Aucune recette ajoutée
                </p>
                <p className="text-muted-foreground text-sm">
                  Utilisez le formulaire ci-dessus pour ajouter votre première
                  recette
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Parcours des recettes et affichage sous forme de cartes */}
              {optimisticRecipes.map((recipe) => {
                return (
                  <Card
                    key={recipe.id}
                    className={cn(
                      'overflow-hidden transition-shadow hover:shadow-md',
                      { 'animate-color-cycle': recipe.sending },
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-5">
                          <div className="mb-2 flex items-start justify-between gap-4">
                            <h3 className="text-lg font-semibold">
                              {recipe.name}
                            </h3>
                            <div className="flex gap-2">
                              {/* Bouton modifier */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-primary shrink-0"
                                aria-label="Modifier la recette"
                                onClick={() => handleEdit(recipe)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              {/* Bouton supprimer */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteRecipe(recipe.id)}
                                className="text-muted-foreground hover:text-destructive shrink-0"
                                aria-label="Supprimer la recette"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* Description optionnelle de la recette */}
                          {recipe.description && (
                            <p className="text-muted-foreground mb-3 text-sm">
                              {recipe.description}
                            </p>
                          )}
                          {/* Informations rapides : temps et personnes */}
                          <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
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
                          </div>{' '}
                          {/* Ingrédients affichés avec saut de ligne conservé */}
                          {recipe.ingredients && (
                            <div className="mt-4">
                              <p className="mb-1 text-sm font-medium">
                                Ingrédients:
                              </p>
                              <p className="text-muted-foreground text-sm whitespace-pre-line">
                                {recipe.ingredients}
                              </p>
                            </div>
                          )}{' '}
                          {/* Instructions affichées avec saut de ligne conservé */}
                          {recipe.instructions && (
                            <div className="mt-4">
                              <p className="mb-1 text-sm font-medium">
                                Instructions:
                              </p>
                              <p className="text-muted-foreground text-sm whitespace-pre-line">
                                {recipe.instructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
