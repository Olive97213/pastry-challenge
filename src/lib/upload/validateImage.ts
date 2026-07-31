import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from './constants';

/**
 * Vérifie qu'une image
 * est valide.
 */
export function validateImage(file: File) {
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      success: false,

      message: 'Image trop volumineuse (5 Mo maximum).',
    };
  }

  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type as (typeof ALLOWED_IMAGE_TYPES)[number],
    )
  ) {
    return {
      success: false,

      message: "Format d'image non autorisé.",
    };
  }

  return {
    success: true,
  };
}
