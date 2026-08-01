'use server';

import { randomUUID } from 'crypto';

import cloudinary from '@/lib/cloudinary';

import {
  RECIPE_IMAGES_FOLDER,
  RECIPE_IMAGE_TRANSFORMATION,
} from '../constants';

/**
 * Envoie une image
 * de recette vers Cloudinary.
 */
export async function uploadRecipeImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const publicId = `recipe-${randomUUID()}`;

  const result = await new Promise<{
    secure_url: string;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: RECIPE_IMAGES_FOLDER,

          public_id: publicId,

          resource_type: 'image',

          transformation: [...RECIPE_IMAGE_TRANSFORMATION],
        },

        (error, result) => {
          if (error || !result) {
            reject(error);

            return;
          }

          resolve(result);
        },
      )
      .end(buffer);
  });

  return result.secure_url;
}
