import { categoryLabel, EVENT } from '@/lib/data'
import type { Application } from '@/lib/types'

export function InvitationCard({ application }: { application: Application }) {
  return (
    <div className="w-full max-w-lg rounded-lg border border-primary/50 bg-card p-1 shadow-[0_0_60px_-15px] shadow-primary/20">
      <div className="rounded-md border border-primary/25 px-6 py-10 text-center md:px-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary">
          You Are Cordially Invited
        </p>
        <div className="mx-auto mt-6 h-px w-16 bg-primary/50" aria-hidden="true" />
        <h2 className="mt-6 font-serif text-3xl font-semibold text-card-foreground md:text-4xl">
          {application.firstName} {application.lastName}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {categoryLabel(application.category)} · {application.organization}
        </p>
        <div className="mx-auto mt-6 h-px w-16 bg-primary/50" aria-hidden="true" />
        <p className="mt-6 font-serif text-lg text-primary">
          The {EVENT.name} World Car Show
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {EVENT.dates}
          <br />
          {EVENT.venue}, {EVENT.city}
          <br />
          {EVENT.dressCode}
        </p>
        <p className="mt-8 font-mono text-xs tracking-[0.25em] text-muted-foreground">
          {application.reference}
        </p>
      </div>
    </div>
  )
}
