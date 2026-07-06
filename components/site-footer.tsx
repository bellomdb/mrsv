import Link from 'next/link'
import { EVENT } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-sidebar">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-semibold text-primary">Mrs Vehicle</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              The World Car Show
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The world&apos;s most respected automobile awards and exhibition — promoting
              innovation, excellence, and global collaboration in the automotive industry.
            </p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Explore</p>
              <Link href="/awards" className="text-sm text-muted-foreground hover:text-primary">
                The Awards
              </Link>
              <Link href="/event" className="text-sm text-muted-foreground hover:text-primary">
                Event & Schedule
              </Link>
              <Link href="/nominate" className="text-sm text-muted-foreground hover:text-primary">
                Vehicle Nominations
              </Link>
            </nav>
            <nav aria-label="Attendance links" className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Attend</p>
              <Link href="/apply" className="text-sm text-muted-foreground hover:text-primary">
                Request an Invitation
              </Link>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-primary">
                Application Status
              </Link>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">
                Committee Portal
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            {EVENT.dates} · {EVENT.venue}, {EVENT.city}
          </p>
          <p>Attendance is by invitation only.</p>
        </div>
      </div>
    </footer>
  )
}
