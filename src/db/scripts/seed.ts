#!/usr/bin/env node

import { db } from '@/db/client';

import {
  users,
  recipes,
  recipePreparations,
  recipeIngredients,
  recipeSteps,
} from '@/db/schema';

import { hashPassword } from '@/lib/password';

/**
 * Seed de développement de la base de données.
 *
 * Ce script crée un jeu de données complet permettant
 * de tester l'application avec des données réalistes.
 *
 * Structure créée :
 *
 * users
 *   └── recipes
 *        └── recipePreparations
 *             ├── recipeIngredients
 *             └── recipeSteps
 *
 * Le script est principalement destiné au développement.
 *
 * Pour repartir complètement de zéro :
 *
 * pnpm db:reset-seed
 */

/**
 * Fonction principale du seed.
 */
async function seed() {
  console.log('🌱 Starting database seed...');

  /**
   * --------------------------------------------------
   * UTILISATEURS
   * --------------------------------------------------
   *
   * Les mots de passe sont hashés avec la même
   * fonction que celle utilisée par l'application.
   */

  const adminPasswordHash = await hashPassword('Admin123!');

  const userPasswordHash = await hashPassword('User123!');

  /**
   * Création de l'utilisateur administrateur.
   */
  const [admin] = await db
    .insert(users)
    .values({
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: adminPasswordHash,
      bio: 'Utilisateur administrateur de développement.',
      role: 'ADMIN',
      isActive: true,
    })
    .returning({
      id: users.id,
      username: users.username,
    });

  /**
   * Création de l'utilisateur classique.
   */
  const [user] = await db
    .insert(users)
    .values({
      username: 'olivier',
      email: 'olivier@example.com',
      passwordHash: userPasswordHash,
      bio: 'Utilisateur de test de la plateforme.',
      role: 'USER',
      isActive: true,
    })
    .returning({
      id: users.id,
      username: users.username,
    });

  console.log(`👤 Created user: ${admin.username}`);
  console.log(`👤 Created user: ${user.username}`);

  /**
   * --------------------------------------------------
   * RECETTE 1
   * --------------------------------------------------
   *
   * Tarte au citron meringuée.
   *
   * Cette recette permet de tester une recette
   * comportant plusieurs préparations.
   */
  const [tarteCitron] = await db
    .insert(recipes)
    .values({
      userId: user.id,

      title: 'Tarte au citron meringuée',

      slug: 'tarte-au-citron-meringuee',

      description:
        'Une tarte au citron composée d’une pâte sucrée, d’un crémeux citron et d’une meringue italienne.',

      prepTime: 90,

      cookTime: 35,

      restTime: 120,

      servings: 8,

      difficulty: 'INTERMEDIATE',

      status: 'PUBLISHED',

      publishedAt: new Date(),
    })
    .returning({
      id: recipes.id,
      title: recipes.title,
    });

  console.log(`🍋 Created recipe: ${tarteCitron.title}`);

  /**
   * --------------------------------------------------
   * PRÉPARATION : PÂTE SUCRÉE
   * --------------------------------------------------
   */

  const [pateSucree] = await db
    .insert(recipePreparations)
    .values({
      recipeId: tarteCitron.id,

      title: 'Pâte sucrée',

      description: 'Préparation de la pâte qui servira de base à la tarte.',

      position: 0,
    })
    .returning({
      id: recipePreparations.id,
    });

  /**
   * Ingrédients de la pâte sucrée.
   */
  await db.insert(recipeIngredients).values([
    {
      preparationId: pateSucree.id,
      name: 'Farine T55',
      quantity: 250,
      unit: 'g',
      position: 0,
    },
    {
      preparationId: pateSucree.id,
      name: 'Beurre doux',
      quantity: 125,
      unit: 'g',
      position: 1,
    },
    {
      preparationId: pateSucree.id,
      name: 'Sucre glace',
      quantity: 100,
      unit: 'g',
      position: 2,
    },
    {
      preparationId: pateSucree.id,
      name: 'Œuf',
      quantity: 50,
      unit: 'g',
      note: 'Environ 1 œuf',
      position: 3,
    },
    {
      preparationId: pateSucree.id,
      name: 'Sel',
      quantity: 1,
      unit: 'pincee',
      position: 4,
    },
  ]);

  /**
   * Étapes de la pâte sucrée.
   */
  await db.insert(recipeSteps).values([
    {
      preparationId: pateSucree.id,
      description: 'Sabler la farine avec le beurre froid coupé en morceaux.',
      position: 0,
    },
    {
      preparationId: pateSucree.id,
      description:
        'Ajouter le sucre glace puis incorporer progressivement l’œuf.',
      position: 1,
    },
    {
      preparationId: pateSucree.id,
      description: 'Fraiser rapidement la pâte puis former un disque.',
      position: 2,
    },
    {
      preparationId: pateSucree.id,
      description:
        'Filmer et laisser reposer au réfrigérateur pendant au moins 1 heure.',
      position: 3,
    },
    {
      preparationId: pateSucree.id,
      description: 'Foncer le cercle puis cuire à blanc à 170°C.',
      position: 4,
    },
  ]);

  /**
   * --------------------------------------------------
   * PRÉPARATION : CRÉMEUX CITRON
   * --------------------------------------------------
   */

  const [cremeuxCitron] = await db
    .insert(recipePreparations)
    .values({
      recipeId: tarteCitron.id,

      title: 'Crémeux citron',

      description: 'Un crémeux citron onctueux et légèrement acidulé.',

      position: 1,
    })
    .returning({
      id: recipePreparations.id,
    });

  /**
   * Ingrédients du crémeux citron.
   */
  await db.insert(recipeIngredients).values([
    {
      preparationId: cremeuxCitron.id,
      name: 'Jus de citron',
      quantity: 150,
      unit: 'ml',
      position: 0,
    },
    {
      preparationId: cremeuxCitron.id,
      name: 'Œufs',
      quantity: 150,
      unit: 'g',
      position: 1,
    },
    {
      preparationId: cremeuxCitron.id,
      name: 'Sucre',
      quantity: 150,
      unit: 'g',
      position: 2,
    },
    {
      preparationId: cremeuxCitron.id,
      name: 'Beurre doux',
      quantity: 180,
      unit: 'g',
      position: 3,
    },
  ]);

  /**
   * Étapes du crémeux citron.
   */
  await db.insert(recipeSteps).values([
    {
      preparationId: cremeuxCitron.id,
      description: 'Mélanger les œufs avec le sucre sans faire blanchir.',
      position: 0,
    },
    {
      preparationId: cremeuxCitron.id,
      description:
        'Ajouter le jus de citron puis cuire à feu doux jusqu’à 82°C.',
      position: 1,
    },
    {
      preparationId: cremeuxCitron.id,
      description: 'Retirer du feu puis incorporer progressivement le beurre.',
      position: 2,
    },
    {
      preparationId: cremeuxCitron.id,
      description: 'Mixer pour obtenir une texture parfaitement lisse.',
      position: 3,
    },
    {
      preparationId: cremeuxCitron.id,
      description:
        'Couler dans le fond de tarte refroidi puis réserver au réfrigérateur.',
      position: 4,
    },
  ]);

  /**
   * --------------------------------------------------
   * PRÉPARATION : MERINGUE ITALIENNE
   * --------------------------------------------------
   */

  const [meringue] = await db
    .insert(recipePreparations)
    .values({
      recipeId: tarteCitron.id,

      title: 'Meringue italienne',

      description:
        'Une meringue italienne légère utilisée pour terminer la tarte.',

      position: 2,
    })
    .returning({
      id: recipePreparations.id,
    });

  /**
   * Ingrédients de la meringue.
   */
  await db.insert(recipeIngredients).values([
    {
      preparationId: meringue.id,
      name: 'Blancs d’œufs',
      quantity: 100,
      unit: 'g',
      position: 0,
    },
    {
      preparationId: meringue.id,
      name: 'Sucre',
      quantity: 200,
      unit: 'g',
      position: 1,
    },
    {
      preparationId: meringue.id,
      name: 'Eau',
      quantity: 60,
      unit: 'ml',
      position: 2,
    },
  ]);

  /**
   * Étapes de la meringue.
   */
  await db.insert(recipeSteps).values([
    {
      preparationId: meringue.id,
      description: 'Commencer à monter les blancs d’œufs à vitesse moyenne.',
      position: 0,
    },
    {
      preparationId: meringue.id,
      description: 'Cuire le sucre avec l’eau jusqu’à atteindre 118°C.',
      position: 1,
    },
    {
      preparationId: meringue.id,
      description:
        'Verser progressivement le sirop chaud sur les blancs montés.',
      position: 2,
    },
    {
      preparationId: meringue.id,
      description: 'Fouetter jusqu’à complet refroidissement de la meringue.',
      position: 3,
    },
  ]);

  /**
   * --------------------------------------------------
   * RECETTE 2
   * --------------------------------------------------
   *
   * Une recette plus simple afin de tester
   * plusieurs recettes appartenant à différents
   * utilisateurs.
   */

  const [moelleux] = await db
    .insert(recipes)
    .values({
      userId: admin.id,

      title: 'Moelleux au chocolat',

      slug: 'moelleux-au-chocolat',

      description: 'Un moelleux au chocolat simple et gourmand.',

      prepTime: 20,

      cookTime: 12,

      restTime: 0,

      servings: 6,

      difficulty: 'BEGINNER',

      status: 'PUBLISHED',

      publishedAt: new Date(),
    })
    .returning({
      id: recipes.id,
      title: recipes.title,
    });

  console.log(`🍫 Created recipe: ${moelleux.title}`);

  /**
   * --------------------------------------------------
   * PRÉPARATION : APPAREIL AU CHOCOLAT
   * --------------------------------------------------
   */

  const [appareilChocolat] = await db
    .insert(recipePreparations)
    .values({
      recipeId: moelleux.id,

      title: 'Appareil au chocolat',

      description: 'Préparation de l’appareil du moelleux.',

      position: 0,
    })
    .returning({
      id: recipePreparations.id,
    });

  /**
   * Ingrédients du moelleux.
   */
  await db.insert(recipeIngredients).values([
    {
      preparationId: appareilChocolat.id,
      name: 'Chocolat noir',
      quantity: 200,
      unit: 'g',
      position: 0,
    },
    {
      preparationId: appareilChocolat.id,
      name: 'Beurre doux',
      quantity: 120,
      unit: 'g',
      position: 1,
    },
    {
      preparationId: appareilChocolat.id,
      name: 'Œufs',
      quantity: 3,
      unit: 'piece',
      position: 2,
    },
    {
      preparationId: appareilChocolat.id,
      name: 'Sucre',
      quantity: 80,
      unit: 'g',
      position: 3,
    },
    {
      preparationId: appareilChocolat.id,
      name: 'Farine',
      quantity: 50,
      unit: 'g',
      position: 4,
    },
  ]);

  /**
   * Étapes du moelleux.
   */
  await db.insert(recipeSteps).values([
    {
      preparationId: appareilChocolat.id,
      description: 'Faire fondre le chocolat avec le beurre.',
      position: 0,
    },
    {
      preparationId: appareilChocolat.id,
      description: 'Fouetter les œufs avec le sucre.',
      position: 1,
    },
    {
      preparationId: appareilChocolat.id,
      description: 'Ajouter le chocolat fondu puis incorporer la farine.',
      position: 2,
    },
    {
      preparationId: appareilChocolat.id,
      description:
        'Répartir dans les moules puis cuire à 180°C pendant environ 12 minutes.',
      position: 3,
    },
  ]);

  console.log('🌱 Database seed completed successfully.');
}

/**
 * Exécution du seed.
 *
 * En cas d'erreur, le processus retourne
 * un code d'erreur afin que la commande
 * pnpm db:seed échoue correctement.
 */
try {
  await seed();
  process.exit(0);
} catch (error) {
  console.error('❌ Database seed failed.');
  console.error(error);

  process.exit(1);
}
