// Accès aux types et au moteur de base de données JSON
// import {FormSchemaType} from '@/lib/type'
import { Recipe } from '@/lib/types'
import {JSONFilePreset} from 'lowdb/node'

// Variables de test ou de simulation de comportement (non utilisées ici)
const randomError = true
const slowConnexion = true

// Type des données stockées dans la base de données JSON
type BddDataType = {
  recipes?: Recipe[]
}

// Données de départ qui seront utilisées lors de la création du fichier JSON
const defaultData: BddDataType = {
  recipes: [
    {
      id: '1',
      name: 'Default recipe',
      description: 'A simple default recipe',
      ingredients: 'Flour, sugar, eggs',
      instructions: 'Mix all ingredients and bake at 180°C for 30 minutes.',
      prepTime: '30',
      servings: '4',
      createdAt: new Date(),
    },
  ],
}

// Exporte une fonction pour initialiser et récupérer la base de données
export default async function lowDb() {
  return initDb()
}
// Initialise la base JSON en assurant que le fichier existe avec les données par défaut
async function initDb() {
  const db = await JSONFilePreset('./db/db.json', defaultData)
  return db
}

// Récupère toutes les recettes depuis le fichier JSON
export async function getRecipes() {
  const db = await lowDb()
  const {recipes} = db.data
  return recipes
}

// Ajoute une nouvelle recette en lui attribuant un nouvel id
export async function addRecipes(recipe: Omit<Recipe, 'id'>) {
  const db = await lowDb()
  const id = String((db.data.recipes?.length ?? 0) + 1)
  await db.update(({recipes}) => {
    recipes?.push({ ...recipe, id})
  })
}

// Supprime une recette existante en fonction de son id
export async function deleteRecipes(id: string) {
  const db = await lowDb()
  await db.update(({recipes}) => {
    if (recipes) {
      const index = recipes.findIndex((recipe) => recipe.id === id)
      if (index !== -1) {
        recipes.splice(index, 1)
      }
    }
  })
}

// Met à jour une recette existante en conservant son id
export async function updateRecipes(id: string, updatedRecipe: Omit<Recipe, 'id'>) {
  const db = await lowDb()
  await db.update(({recipes}) => {
    if (recipes) {
      const index = recipes.findIndex((recipe) => recipe.id === id)
      if (index !== -1) {
        recipes[index] = { ...updatedRecipe, id }
      }
    }
  })
}
