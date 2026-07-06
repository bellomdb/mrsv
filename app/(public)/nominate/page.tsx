import type { Metadata } from 'next'
import { NominationForm } from '@/components/nomination-form'

export const metadata: Metadata = {
  title: 'Submit a Nomination — Mrs Vehicle',
  description:
    'Nominate your vehicle for the Mrs Vehicle World Car Show. Manufacturers and dealerships are invited to submit vehicles for award consideration.',
}

export default function NominatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Submit a Vehicle</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
          Vehicle Nomination
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Manufacturers and dealerships are invited to nominate vehicles for consideration in the
          Mrs Vehicle, Queen of the Road, Mrs Exterior, and Mrs Interior awards.
        </p>
      </div>
      <div className="mt-12">
        <NominationForm />
      </div>
    </div>
  )
}
