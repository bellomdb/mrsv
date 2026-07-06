'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Clock, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InvitationCard } from '@/components/invitation-card'
import { SAMPLE_APPLICATIONS } from '@/lib/data'
import { findLocalApplication, getLocalApplications } from '@/lib/store'
import type { Application } from '@/lib/types'

function lookup(reference: string): Application | undefined {
  const ref = reference.trim()
  if (!ref) return undefined
  return (
    findLocalApplication(ref) ??
    SAMPLE_APPLICATIONS.find((a) => a.reference.toLowerCase() === ref.toLowerCase())
  )
}

export function StatusChecker() {
  const [reference, setReference] = useState('')
  const [result, setResult] = useState<Application | null>(null)
  const [notFound, setNotFound] = useState(false)

  // Auto-load the visitor's most recent application
  useEffect(() => {
    const local = getLocalApplications()
    if (local.length > 0) {
      const latest = local[local.length - 1]
      setReference(latest.reference)
      setResult(latest)
    }
  }, [])

  const search = () => {
    const found = lookup(reference)
    setResult(found ?? null)
    setNotFound(!found)
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
        className="mx-auto flex w-full max-w-md flex-col gap-3"
      >
        <Label htmlFor="reference">Application reference</Label>
        <div className="flex gap-2">
          <Input
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="MRSV-2026-0000"
            className="font-mono tracking-wider"
          />
          <Button type="submit" aria-label="Check status">
            <Search className="size-4" />
            <span className="hidden sm:inline">Check</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Try a sample: MRSV-2026-1001 (approved), MRSV-2026-1003 (under review), MRSV-2026-1006
          (declined)
        </p>
      </form>

      {notFound && (
        <div className="mx-auto w-full max-w-md rounded-lg border border-border/60 bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No application found with that reference. Please check the reference and try again.
          </p>
        </div>
      )}

      {result?.status === 'under-review' && (
        <div className="mx-auto w-full max-w-md rounded-lg border border-border/60 bg-card p-8 text-center">
          <Clock className="mx-auto size-8 text-primary" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">Under Review</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Dear {result.firstName}, your application is being reviewed by the committee. You will
            be notified as soon as a decision has been made.
          </p>
          <p className="mt-4 font-mono text-sm tracking-wider text-primary">{result.reference}</p>
        </div>
      )}

      {result?.status === 'declined' && (
        <div className="mx-auto w-full max-w-md rounded-lg border border-border/60 bg-card p-8 text-center">
          <XCircle className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">Not Approved</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Dear {result.firstName}, we regret that the committee is unable to extend an
            invitation at this time. Capacity for the inaugural edition is extremely limited — we
            hope to welcome you at a future edition.
          </p>
        </div>
      )}

      {result?.status === 'approved' && (
        <div className="flex flex-col items-center gap-8">
          <InvitationCard application={result} />
          {result.rsvpStatus !== 'confirmed' ? (
            <Button asChild size="lg">
              <Link href={`/rsvp/${result.reference}`}>
                Confirm Attendance
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href={`/pass/${result.reference}`}>
                View Your Digital Pass
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
