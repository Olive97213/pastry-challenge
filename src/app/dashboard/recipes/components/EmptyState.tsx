import Link from 'next/link';

/**
 * État vide.
 *
 * Affiché lorsqu'aucune recette
 * n'a encore été créée.
 */
export default function EmptyState() {
  return (
    <section>
      <h1>Mes recettes</h1>

      <p>Vous n'avez encore créé aucune recette.</p>

      <Link href="/add-recipes">Créer ma première recette</Link>
    </section>
  );
}
