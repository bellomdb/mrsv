import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Calendar, Crown, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AwardCard } from '@/components/award-card'
import { FeaturedBrands } from '@/components/featured-brands'
import { AWARDS, EVENT, GUEST_CATEGORIES, SCHEDULE } from '@/lib/data'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-car.png"
          alt="A luxury concept car under a golden spotlight on a dark gala stage"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            {EVENT.edition} · {EVENT.dates}
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-foreground text-balance md:text-7xl">
            Mrs Vehicle
          </h1>
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            The World Car Show
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            A prestigious international celebration of excellence in automotive engineering,
            design, innovation, and performance. Attendance is by invitation only.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="tracking-wide">
              <Link href="/apply">
                Request an Invitation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="tracking-wide bg-transparent">
              <Link href="/awards">Discover the Awards</Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />
              {EVENT.venue}, {EVENT.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              {EVENT.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <Crown className="size-3.5 text-primary" />
              {EVENT.dressCode}
            </span>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Vision</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-snug text-balance md:text-4xl">
          The world&apos;s most respected automobile awards and exhibition
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
          Mrs Vehicle honors vehicles that set the highest standards in performance, exterior
          styling, interior luxury, and overall quality — bringing together leading manufacturers,
          dealers, designers, investors, celebrities, and enthusiasts from around the world to
          promote innovation, excellence, and global collaboration.
        </p>
      </section>

      {/* Featured Brands */}
      <FeaturedBrands />

      {/* Awards preview */}
      <section className="border-t border-border/60 bg-sidebar/50">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">The Honors</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
                Four Prestigious Awards
              </h2>
            </div>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/awards">
                Judging Criteria
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AWARDS.map((award) => (
              <AwardCard key={award.slug} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* Guests */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="lg:w-2/5">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Distinguished Guests</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug text-balance md:text-4xl">
              An audience worthy of the world&apos;s finest automobiles
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The Mrs Vehicle World Car Show welcomes global manufacturers, royalty, celebrities,
              investors, and the most influential voices in the automotive world.
            </p>
            <Button asChild className="mt-6">
              <Link href="/apply">
                Request Your Invitation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            {GUEST_CATEGORIES.slice(0, 8).map((cat) => (
              <li
                key={cat.value}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4"
              >
                <Users className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{cat.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Event teaser */}
      <section className="relative overflow-hidden border-t border-border/60">
        <Image
          src="/images/gala-venue.png"
          alt="The grand gala hall with luxury cars on illuminated platforms"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Four Days of Excellence</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">The Program</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="rounded-lg border border-border/60 bg-card/80 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{day.day}</p>
                <p className="mt-2 font-serif text-lg font-semibold text-card-foreground">
                  {day.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{day.date}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8 bg-transparent">
            <Link href="/event">
              Full Schedule & Venue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Nominations CTA */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center md:px-6">
        <Award className="mx-auto size-8 text-primary" aria-hidden="true" />
        <h2 className="mt-5 font-serif text-3xl font-semibold text-balance md:text-4xl">
          Enter your vehicle for consideration
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          Manufacturers and dealerships are invited to nominate vehicles for the Mrs Vehicle,
          Queen of the Road, Mrs Exterior, and Mrs Interior awards.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/nominate">
            Submit a Nomination
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </>
  )
}
