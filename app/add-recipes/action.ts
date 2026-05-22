'use server'

import {addRecipes as addRecipesDao} from '@/db/sgbd'
import { Recipe } from '@/lib/types'
import { revalidatePath } from 'next/cache'


export const addRecipesAction = async (recipe: Omit<Recipe, 'id'>) => {
  console.log('add recipes action', recipe)
  try {
    await addRecipesDao(recipe)
  } catch (error) {
    console.error('Failed to add recipe', error)
    throw error
  } finally {
    revalidatePath('/add-recipes')
  }
}

