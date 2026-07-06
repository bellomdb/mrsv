'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '/awards', label: 'The Awards' },
  { href: '/event', label: 'The Event' },
  { href: '/nominate', label: 'Nominations' },
  { href: '/status', label: 'Application Status' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-wide text-primary">
            Mrs Vehicle
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            World Car Show
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="tracking-wide">
            <Link href="/apply">Request Invitation</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t border-border/60 bg-background px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <Link href="/apply" onClick={() => setOpen(false)}>
              Request Invitation
            </Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
