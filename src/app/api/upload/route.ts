import { NextResponse } from 'next/server';

import { auth } from '@/auth';

import { uploadRecipeImage, validateImage } from '@/lib/upload';

/**
 * Upload d'une image
 * de recette.
 */
export async function POST(request: Request) {
  /**
   * Vérifie que
   * l'utilisateur est connecté.
   */
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        success: false,

        message: 'Non autorisé',
      },
      {
        status: 401,
      },
    );
  }

  try {
    const formData = await request.formData();

    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,

          message: 'Aucun fichier reçu.',
        },
        {
          status: 400,
        },
      );
    }

    /**
     * Validation.
     */
    const validation = validateImage(file);

    if (!validation.success) {
      return NextResponse.json(validation, {
        status: 400,
      });
    }

    /**
     * Upload Cloudinary.
     */
    const url = await uploadRecipeImage(file);

    return NextResponse.json({
      success: true,

      url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: "Erreur lors de l'upload.",
      },
      {
        status: 500,
      },
    );
  }
}
