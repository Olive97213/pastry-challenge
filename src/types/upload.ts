/**
 * Réponse de l'upload d'une image.
 */
export type UploadResponse = {
  success: boolean;

  url?: string;

  message?: string;
};