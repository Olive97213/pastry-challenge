import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const recipeStatusEnum = pgEnum('recipe_status', [
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
]);

export const recipeDifficultyEnum = pgEnum('recipe_difficulty', [
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
]);
