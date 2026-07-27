import z from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  ingredients: z.string().min(2, {
    message: 'Ingredients must be at least 2 characters.',
  }),
  instructions: z.string().min(2, {
    message: 'Instructions must be at least 2 characters.',
  }),
  prepTime: z.string().min(1, {
    message: 'Prep time must be at least 1 character.',
  }),
  servings: z.string().min(1, {
    message: 'Servings must be at least 1 character.',
  }),
});
export type FormSchemaType = z.infer<typeof formSchema>;
