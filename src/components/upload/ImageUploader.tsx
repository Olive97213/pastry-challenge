'use client';

import { useState } from 'react';

import ImagePreview from './ImagePreview';
import UploadDropzone from './UploadDropzone';
import UploadSpinner from './UploadSpinner';

import { uploadImage } from '@/lib/upload';

type Props = {
  id?: string;

  value?: string;

  disabled?: boolean;

  onChange: (value?: string) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleSelect(file: File) {
    try {
      setIsUploading(true);

      const result = await uploadImage(file);

      if (!result.success) {
        alert(result.message);

        return;
      }

      onChange(result.url);
    } catch (error) {
      console.error(error);

      alert("Erreur lors de l'upload.");
    } finally {
      setIsUploading(false);
    }
  }

  if (isUploading) {
    return <UploadSpinner />;
  }

  if (value) {
    return <ImagePreview src={value} onRemove={() => onChange(undefined)} />;
  }

  return <UploadDropzone onSelect={handleSelect} />;
}
