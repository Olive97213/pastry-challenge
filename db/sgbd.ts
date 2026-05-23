
import {FormSchemaType} from '@/lib/type'
import { Recipe } from '@/lib/types'
import {JSONFilePreset} from 'lowdb/node'


const randomError = true
const slowConnexion = true


type BddDataType = {
  recipes?: Recipe[]
  
}

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

export default async function lowDb() {
  return initDb()
}
// initialise db with default data and file creation
async function initDb() {
  const db = await JSONFilePreset('./db/db.json', defaultData)
  return db
}

export async function getRecipes() {
  const db = await lowDb()
  const {recipes} = db.data
  return recipes
}

export async function addRecipes(recipe: Omit<Recipe, 'id'>) {
  
  const db = await lowDb()
  const id = String((db.data.recipes?.length ?? 0) + 1)
  await db.update(({recipes}) => {
    recipes?.push({ ...recipe, id})
    


  })
}

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