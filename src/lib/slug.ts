/**
 * Transforme un texte en slug URL-friendly.
 *
 * Exemple :
 * "Tarte au citron meringuée"
 *
 * devient :
 * "tarte-au-citron-meringuee"
 */
export function generateSlug(
  value: string
): string {

  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /(^-|-$)/g,
      ""
    );
}