import type { Metadata } from 'next'
import { ApplyForm } from '@/components/apply-form'

export const metadata: Metadata = {
  title: 'Request an Invitation — Mrs Vehicle',
  description:
    'Apply to attend the Mrs Vehicle World Car Show. Every application is reviewed by the committee, and approved guests receive an official invitation.',
}

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">By Invitation Only</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
          Request an Invitation
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Every application is personally reviewed by the Mrs Vehicle committee. Approved guests
          receive an official invitation and a personal RSVP link.
        </p>
      </div>
      <div className="mt-12">
        <ApplyForm />
      </div>
    </div>
  )
}
