import type { Metadata } from 'next'
import { DigitalPass } from '@/components/digital-pass'

export const metadata: Metadata = {
  title: 'Digital Pass — Mrs Vehicle',
  description: 'Your official digital guest pass for the Mrs Vehicle World Car Show.',
}

export default async function PassPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Official Guest Pass</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
          Your Digital Pass
        </h1>
      </div>
      <div className="mt-12">
        <DigitalPass code={decodeURIComponent(code)} />
      </div>
    </div>
  )
}
