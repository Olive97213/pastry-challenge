import { Meal } from '@/lib/types';

export async function getMeals(): Promise<Meal[]> {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert`,
  );
  const response = await data.json();
  return response.meals;
}
