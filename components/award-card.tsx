import Image from 'next/image'
import Link from 'next/link'
import type { Award } from '@/lib/types'

export function AwardCard({ award }: { award: Award }) {
  return (
    <Link
      href={`/awards#${award.slug}`}
      className="group relative overflow-hidden rounded-lg border border-border/60 bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={award.image || "/placeholder.svg"}
          alt={`${award.name} award`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{award.tagline}</p>
        <h3 className="font-serif text-xl font-semibold text-card-foreground">{award.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {award.description}
        </p>
      </div>
    </Link>
  )
}
