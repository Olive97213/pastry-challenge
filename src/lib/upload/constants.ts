/**
 * Taille maximale d'une image.
 *
 * 5 Mo.
 */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/**
 * Types MIME autorisés.
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

/**
 * Configuration utilisée
 * par react-dropzone.
 */
export const DROPZONE_ACCEPT = Object.fromEntries(
  ALLOWED_IMAGE_TYPES.map((type) => [type, []]),
) as Record<(typeof ALLOWED_IMAGE_TYPES)[number], []>;

/**
 * Dossier Cloudinary
 * des recettes.
 */
export const RECIPE_IMAGES_FOLDER = 'pastry-challenge/recipes';

/**
 * Optimisations Cloudinary.
 */
export const RECIPE_IMAGE_TRANSFORMATION = [
  {
    quality: 'auto',

    fetch_format: 'auto',
  },
];
