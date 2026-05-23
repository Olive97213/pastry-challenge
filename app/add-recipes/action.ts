'use server'

import {addRecipes as addRecipesDao} from '@/db/sgbd'
import {getRecipes as getRecipesDao} from '@/db/sgbd'
import {deleteRecipes as deleteRecipesDao} from '@/db/sgbd'
import {updateRecipes as updateRecipesDao} from '@/db/sgbd'
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

export const getRecipesAction = async () => {
    console.log('get recipes action')
    try {
        const recipes = await getRecipesDao()         
        return recipes
    } catch (error) {
        console.error('Failed to get recipes', error)
        throw error
    }
}   

export const deleteRecipesAction = async (id: string) => {
    console.log('delete recipes action', id)
    try {
        await deleteRecipesDao(id)
    } catch (error) {
        console.error('Failed to delete recipe', error)
        throw error
    } finally {
        revalidatePath('/add-recipes')
    }
}
export const updateRecipesAction = async (id: string, recipe: Omit<Recipe, 'id'>) => {
    console.log('update recipes action', id, recipe)
    try {
        await updateRecipesDao(id, recipe)
    } catch (error) {
        console.error('Failed to update recipe', error)
        throw error
    } finally {
        revalidatePath('/add-recipes')
    }
}
