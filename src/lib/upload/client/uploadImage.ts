import type { UploadResponse } from '@/types/upload';

/**
 * Envoie une image
 * au serveur.
 *
 * Retourne l'URL Cloudinary.
 */
export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',

    body: formData,
  });

  const result = (await response.json()) as UploadResponse;

  return result;
}
