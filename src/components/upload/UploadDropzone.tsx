'use client';

import { ImagePlus } from 'lucide-react';

type Props = {
  onSelect: (file: File) => void;
};

export default function UploadDropzone({ onSelect }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onSelect(file);
  }

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 text-center">
      <ImagePlus className="h-10 w-10" />

      <p>Cliquez pour choisir une image</p>

      <input hidden type="file" accept="image/*" onChange={handleChange} />
    </label>
  );
}
