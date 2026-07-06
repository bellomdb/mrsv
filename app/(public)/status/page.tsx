import type { Metadata } from 'next'
import { StatusChecker } from '@/components/status-checker'

export const metadata: Metadata = {
  title: 'Application Status — Mrs Vehicle',
  description: 'Check the status of your Mrs Vehicle World Car Show invitation application.',
}

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Invitation Office</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
          Application Status
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Enter your application reference to check the committee&apos;s decision.
        </p>
      </div>
      <div className="mt-12">
        <StatusChecker />
      </div>
    </div>
  )
}
