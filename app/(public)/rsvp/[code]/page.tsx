import type { Metadata } from 'next'
import { RsvpFlow } from '@/components/rsvp-flow'

export const metadata: Metadata = {
  title: 'RSVP — Mrs Vehicle',
  description: 'Confirm your attendance at the Mrs Vehicle World Car Show.',
}

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Your Invitation</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">RSVP</h1>
      </div>
      <div className="mt-12">
        <RsvpFlow code={decodeURIComponent(code)} />
      </div>
    </div>
  )
}
