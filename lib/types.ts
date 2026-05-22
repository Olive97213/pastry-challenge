import { FormSchemaType } from "@/app/add-recipes/schema"

export interface Pastry {
  id: string
  imageSrc: string
  title: string
  imageAlt?: string
  }

  export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export type Recipe = FormSchemaType & {
  id: string
  createdAt: Date
}