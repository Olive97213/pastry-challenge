'use client';

import { Button } from '@/components/ui/button';

export default function EditorSidebar() {
  return (
    <div className="flex h-full flex-col p-4">
      <h2 className="mb-6 text-lg font-semibold">Éditeur</h2>

      <div className="space-y-2">
        <Button variant="secondary" className="w-full justify-start">
          Informations
        </Button>

        <Button variant="ghost" className="w-full justify-start">
          Préparations
        </Button>

        <Button variant="ghost" className="w-full justify-start">
          Aperçu
        </Button>
      </div>
    </div>
  );
}
