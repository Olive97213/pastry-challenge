'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

type Props = {
  /**
   * Source de l'image.
   */
  src: string;

  /**
   * Suppression de l'image.
   */
  onRemove: () => void;
};

export default function ImagePreview({ src, onRemove }: Props) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <Image
          src={src}
          alt="Aperçu de l'image"
          fill
          className="object-cover"
        />
      </div>

      <Button type="button" variant="outline" onClick={onRemove}>
        Supprimer l'image
      </Button>
    </div>
  );
}
