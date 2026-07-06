'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, HeartCrack } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { InvitationCard } from '@/components/invitation-card'
import { SAMPLE_APPLICATIONS } from '@/lib/data'
import { findLocalApplication, saveLocalApplication } from '@/lib/store'
import type { Application } from '@/lib/types'

export function RsvpFlow({ code }: { code: string }) {
  const [application, setApplication] = useState<Application | null | undefined>(undefined)
  const [plusOne, setPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [dietary, setDietary] = useState('')
  const [declined, setDeclined] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const found =
      findLocalApplication(code) ??
      SAMPLE_APPLICATIONS.find((a) => a.reference.toLowerCase() === code.toLowerCase())
    setApplication(found ?? null)
  }, [code])

  if (application === undefined) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Loading invitation…</p>
  }

  if (application === null || application.status !== 'approved') {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-border/60 bg-card p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold">Invitation Not Found</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This RSVP link is not valid, or the invitation has not been issued yet. Please check
          your application status.
        </p>
        <Button asChild className="mt-6">
          <Link href="/status">Check Status</Link>
        </Button>
      </div>
    )
  }

  const confirm = () => {
    const updated: Application = {
      ...application,
      rsvpStatus: 'confirmed',
      plusOne,
      plusOneName: plusOne ? plusOneName.trim() || undefined : undefined,
      dietary: dietary.trim() || undefined,
      table: application.table ?? 'Table assignment at check-in',
    }
    saveLocalApplication(updated)
    setApplication(updated)
    setConfirmed(true)
  }

  const decline = () => {
    saveLocalApplication({ ...application, rsvpStatus: 'declined' })
    setDeclined(true)
  }

  if (declined) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-border/60 bg-card p-8 text-center">
        <HeartCrack className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-semibold">We&apos;ll Miss You</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your regrets have been recorded. Should your circumstances change, please contact the
          invitation office.
        </p>
      </div>
    )
  }

  if (confirmed || application.rsvpStatus === 'confirmed') {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-3xl font-semibold">Attendance Confirmed</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          We look forward to welcoming you, {application.firstName}. Your personal digital pass is
          ready — present it at every entrance.
        </p>
        <Button asChild size="lg">
          <Link href={`/pass/${application.reference}`}>
            View Your Digital Pass
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <InvitationCard application={application} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          confirm()
        }}
        className="w-full max-w-lg rounded-lg border border-border/60 bg-card p-6 md:p-8"
      >
        <h2 className="font-serif text-xl font-semibold">Confirm Your Attendance</h2>

        <div className="mt-6 flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="plusOne"
              checked={plusOne}
              onCheckedChange={(v) => setPlusOne(v === true)}
              className="mt-0.5"
            />
            <div className="flex flex-col gap-1">
              <Label htmlFor="plusOne">I will bring one accompanying guest</Label>
              <p className="text-xs text-muted-foreground">
                Accompanying guests are subject to committee confirmation.
              </p>
            </div>
          </div>

          {plusOne && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="plusOneName">Guest full name</Label>
              <Input
                id="plusOneName"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
                placeholder="Full name of your guest"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="dietary">
              Dietary or accessibility requirements{' '}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="dietary"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Let us know how we can accommodate you"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" onClick={decline}>
            Send Regrets
          </Button>
          <Button type="submit">
            Accept Invitation
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
