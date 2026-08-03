'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DROPZONE_ACCEPT } from '@/lib/upload';

type Props = {
  /**
   * Image sélectionnée.
   */
  onSelect: (file: File) => void;
};

/**
 * Zone de dépôt
 * d'une image.
 */
export default function UploadDropzone({ onSelect }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        return;
      }

      onSelect(file);
    },
    [onSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,

    accept: DROPZONE_ACCEPT,

    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25'
      } `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <UploadCloud className="text-muted-foreground h-12 w-12" />

        {isDragActive ? (
          <p className="font-medium">Dépose ton image ici...</p>
        ) : (
          <>
            <div>
              <p className="font-medium">Glisse une image ici</p>

              <p className="text-muted-foreground text-sm">
                ou clique pour sélectionner un fichier
              </p>
            </div>

            <Button type="button" variant="secondary">
              Choisir une image
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
