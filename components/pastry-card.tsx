import Image from "next/image"
import { Card, CardHeader, CardTitle } from "./ui/card"

interface PastryCardProps {
  imageSrc: string
  title: string
  imageAlt?: string
}

export function PastryCard({ imageSrc, title, imageAlt }: PastryCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden py-0">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
    </Card>
  )
}
