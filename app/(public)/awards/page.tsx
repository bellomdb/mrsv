import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AWARDS } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'The Awards — Mrs Vehicle',
  description:
    'The four prestigious honors of the Mrs Vehicle World Car Show: Mrs Vehicle Grand Champion, Queen of the Road, Mrs Exterior, and Mrs Interior.',
}

export default function AwardsPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-sidebar/50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">The Honors</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
            Four Awards. One Standard: Excellence.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
            Every nominated vehicle is evaluated by an international panel of judges across
            rigorous performance, exterior, and interior disciplines. Only vehicles that meet the
            highest thresholds may claim these titles.
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-20 md:px-6">
        {AWARDS.map((award, i) => (
          <section
            key={award.slug}
            id={award.slug}
            className={cn(
              'flex scroll-mt-24 flex-col gap-10 lg:items-center',
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60 lg:w-1/2">
              <Image
                src={award.image || "/placeholder.svg"}
                alt={`${award.name} — ${award.tagline}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-serif text-lg text-primary">
                {award.shortName}
              </p>
            </div>

            <div className="lg:w-1/2">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">{award.tagline}</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">{award.name}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {award.description}
              </p>

              <div className="mt-7 rounded-lg border border-primary/30 bg-card p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">
                  Qualifying Standard
                </p>
                <p className="mt-2 font-serif text-lg text-card-foreground">{award.threshold}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {award.criteria.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-border/60 bg-sidebar/50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
          <h2 className="font-serif text-3xl font-semibold text-balance">
            Believe your vehicle has what it takes?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Manufacturers and dealerships may submit vehicles for award consideration.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link href="/nominate">
              Submit a Nomination
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
