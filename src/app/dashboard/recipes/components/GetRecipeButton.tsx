import Link from 'next/link';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
  slug: string;
};

export default function GetRecipeButton({ slug }: Props) {
  return (
    <Button asChild type="button" variant="outline">
      <Link href={`/recipes/${slug}`} className="flex items-center gap-2">
        {/* <Eye className="h-4 w-4" /> */}
        Voir
      </Link>
    </Button>
  );
}
