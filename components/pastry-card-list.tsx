import { PastryCard } from "@/components/pastry-card"

import { Pastry } from "@/lib/types"

export function PastryCardList({ pastries }: { pastries: Pastry[] }) {
  return (
    <div className="grid grid-cols-1 place-items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pastries.map((pastry: Pastry) => (
        <PastryCard
          key={pastry.id}
          imageSrc={pastry.imageSrc}
          title={pastry.title}
          imageAlt={pastry.imageAlt}
        />
      ))}
    </div>
  )
}
export type { Pastry }
