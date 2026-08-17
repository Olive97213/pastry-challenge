'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import type { RecipeIngredientUnit } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

type Unit = {
  /**
   * Valeur enregistrée.
   */
  value: RecipeIngredientUnit;

  /**
   * Libellé affiché.
   */
  label: string;
};

/**
 * Unités couramment utilisées
 * en pâtisserie.
 */
const UNITS: Unit[] = [
  {
    value: 'g',
    label: 'Gramme',
  },
  {
    value: 'kg',
    label: 'Kilogramme',
  },
  {
    value: 'ml',
    label: 'Millilitre',
  },
  {
    value: 'cl',
    label: 'Centilitre',
  },
  {
    value: 'l',
    label: 'Litre',
  },
  {
    value: 'piece',
    label: 'Pièce',
  },
  {
    value: 'feuille',
    label: 'Feuille',
  },
  {
    value: 'gousse',
    label: 'Gousse',
  },
  {
    value: 'pincee',
    label: 'Pincée',
  },
  {
    value: 'sachet',
    label: 'Sachet',
  },
  {
    value: 'cuillere-a-cafe',
    label: 'Cuillère à café',
  },
  {
    value: 'cuillere-a-soupe',
    label: 'Cuillère à soupe',
  },
];

type Props = {
  value?: RecipeIngredientUnit;

  onChange: (value: RecipeIngredientUnit) => void;
};

/**
 * Sélecteur d'unité pour un ingrédient.
 */
export default function IngredientUnitSelect({ value, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className="w-full justify-between font-normal"
        >
          {value
            ? (UNITS.find((unit) => unit.value === value)?.value ?? value)
            : 'Unité'}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher une unité..." />

          <CommandList>
            <CommandEmpty>Aucune unité trouvée.</CommandEmpty>

            <CommandGroup>
              {UNITS.map((unit) => (
                <CommandItem
                  key={unit.value}
                  value={unit.label}
                  onSelect={() => onChange(unit.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === unit.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />

                  <span>{unit.label}</span>

                  <span className="text-muted-foreground ml-auto text-xs">
                    {unit.value}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
