// // Type importé depuis le schéma du formulaire d'ajout de recettes
// import { FormSchemaType } from '@/app/add-recipes/schema';

// // Type pour représenter une pâtisserie affichée sur la page d'accueil
// export interface Pastry {
//   id: string;
//   imageSrc: string;
//   title: string;
//   imageAlt?: string;
// }

// // Type tel que reçu depuis l'API externe des repas
// export interface Meal {
//   idMeal: string;
//   strMeal: string;
//   strMealThumb: string;
// }

// // Type d'une recette complète, avec les champs du formulaire et des métadonnées
// export type Recipe = FormSchemaType & {
//   id: string;
//   createdAt: Date;
// };

// // Format d'erreur renvoyé par la validation Zod côté serveur/client
// export type ValidationError = {
//   field: keyof FormSchemaType;
//   message: string;
// };

// // Type utilisé dans l'interface optimiste lorsque l'objet est en cours d'envoi
// export type RecipeOptimistic = Recipe & {
//   sending?: boolean;
// };

// // Type optimiste avec un drapeau obligatoire d'envoi
// export type OptimisticField = Recipe & { sending: boolean };
