import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Calendar, Crown, MapPin, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EVENT, SCHEDULE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'The Event — Mrs Vehicle',
  description:
    'Four days of automotive excellence in Monaco. Venue details, program schedule, and everything you need to know about the Mrs Vehicle World Car Show.',
}

const FAQS = [
  {
    q: 'How do I attend?',
    a: 'Attendance is strictly by invitation. Submit a request through our application page — the committee reviews every application and approved guests receive an official invitation with a personal RSVP link.',
  },
  {
    q: 'What is the dress code?',
    a: 'Black tie for all evening events and the awards gala. Daytime exhibition sessions call for formal business attire.',
  },
  {
    q: 'May I bring a guest?',
    a: 'Approved invitees may register one accompanying guest during RSVP, subject to committee confirmation.',
  },
  {
    q: 'How does entry work at the venue?',
    a: 'Confirmed guests receive a personal digital pass with a QR code, scanned at every entrance. Passes are non-transferable.',
  },
  {
    q: 'Can I nominate a vehicle without attending?',
    a: 'Yes — manufacturers and dealerships may submit nominations independently, though we encourage nominators to attend the judging sessions.',
  },
]

export default function EventPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <Image
          src="/images/gala-venue.png"
          alt="The Grand Palais des Automobiles gala hall"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">{EVENT.edition}</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
            Four Days of Automotive Excellence
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {EVENT.dates}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {EVENT.venue}, {EVENT.city}
            </span>
            <span className="flex items-center gap-2">
              <Crown className="size-4 text-primary" />
              {EVENT.dressCode}
            </span>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="mx-auto max-w-4xl px-4 py-20 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-primary">The Program</p>
        <h2 className="mt-3 text-center font-serif text-3xl font-semibold md:text-4xl">
          Event Schedule
        </h2>

        <div className="mt-14 flex flex-col gap-14">
          {SCHEDULE.map((day) => (
            <div key={day.day}>
              <div className="flex items-baseline justify-between border-b border-primary/30 pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{day.day}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold">{day.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
              <ul className="mt-6 flex flex-col gap-5">
                {day.events.map((ev) => (
                  <li key={ev.title} className="flex gap-5">
                    <span className="w-14 shrink-0 pt-0.5 text-sm font-medium text-primary">
                      {ev.time}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{ev.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {ev.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-sidebar/50">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-6">
          <div className="text-center">
            <Shield className="mx-auto size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Guest Information</h2>
          </div>
          <dl className="mt-12 flex flex-col gap-8">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-serif text-lg font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 text-center">
            <Button asChild size="lg">
              <Link href="/apply">
                Request an Invitation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
