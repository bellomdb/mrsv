'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import QRCode from 'react-qr-code'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categoryLabel, EVENT, SAMPLE_APPLICATIONS } from '@/lib/data'
import { findLocalApplication } from '@/lib/store'
import type { Application } from '@/lib/types'

export function DigitalPass({ code }: { code: string }) {
  const [application, setApplication] = useState<Application | null | undefined>(undefined)

  useEffect(() => {
    const found =
      findLocalApplication(code) ??
      SAMPLE_APPLICATIONS.find((a) => a.reference.toLowerCase() === code.toLowerCase())
    setApplication(found ?? null)
  }, [code])

  if (application === undefined) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Loading pass…</p>
  }

  if (
    application === null ||
    application.status !== 'approved' ||
    application.rsvpStatus !== 'confirmed'
  ) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-border/60 bg-card p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold">Pass Not Available</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A digital pass is only issued once your invitation has been approved and your
          attendance confirmed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/status">Check Application Status</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-primary/50 bg-card shadow-[0_0_80px_-20px] shadow-primary/25">
        {/* Pass header */}
        <div className="bg-primary px-6 py-5 text-center">
          <p className="font-serif text-xl font-semibold text-primary-foreground">Mrs Vehicle</p>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.35em] text-primary-foreground/80">
            Official Guest Pass · {EVENT.edition}
          </p>
        </div>

        {/* Guest info */}
        <div className="px-6 py-6 text-center">
          <h2 className="font-serif text-2xl font-semibold text-card-foreground">
            {application.firstName} {application.lastName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{application.organization}</p>
          <Badge className="mt-3">{categoryLabel(application.category)}</Badge>

          {application.plusOne && application.plusOneName && (
            <p className="mt-3 text-xs text-muted-foreground">
              Accompanied by {application.plusOneName}
            </p>
          )}
        </div>

        {/* Perforation */}
        <div className="relative flex items-center px-6" aria-hidden="true">
          <span className="absolute -left-3 size-6 rounded-full bg-background" />
          <span className="h-px w-full border-t border-dashed border-border" />
          <span className="absolute -right-3 size-6 rounded-full bg-background" />
        </div>

        {/* QR + details */}
        <div className="flex flex-col items-center gap-5 px-6 py-6">
          <div className="rounded-lg bg-white p-3">
            <QRCode
              value={`MRSV-PASS:${application.reference}`}
              size={148}
              aria-label={`QR entry code for ${application.reference}`}
            />
          </div>
          <p className="font-mono text-sm tracking-[0.25em] text-primary">
            {application.reference}
          </p>
          <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-3 text-center">
            <div>
              <dt className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                Dates
              </dt>
              <dd className="mt-1 text-xs text-card-foreground">{EVENT.dates}</dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                Venue
              </dt>
              <dd className="mt-1 text-xs text-card-foreground">
                {EVENT.venue}, {EVENT.city}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                Seating
              </dt>
              <dd className="mt-1 text-xs text-card-foreground">
                {application.table ?? 'At check-in'}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                Dress Code
              </dt>
              <dd className="mt-1 text-xs text-card-foreground">{EVENT.dressCode}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-sidebar px-6 py-3 text-center">
          <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Non-transferable · Present at all entrances
          </p>
        </div>
      </div>

      <p className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
        Your QR code will be scanned at every entrance. Screenshots are accepted; the pass is
        linked to your identity and is strictly non-transferable.
      </p>
    </div>
  )
}
