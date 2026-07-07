'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { GUEST_CATEGORIES, categoryLabel } from '@/lib/data'
import { submitApplication } from '@/app/actions/applications'
import type { GuestCategory } from '@/lib/types'

const STEPS = ['Personal Details', 'Guest Category', 'Affiliation', 'Review & Submit']

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  category: GuestCategory | ''
  organization: string
  role: string
  reason: string
}

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  category: '',
  organization: '',
  role: '',
  reason: '',
}

export function ApplyForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [reference, setReference] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const set = (field: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const stepValid = () => {
    if (step === 0) return form.firstName.trim() && form.lastName.trim() && form.email.includes('@')
    if (step === 1) return form.category !== ''
    if (step === 2) return form.organization.trim() && form.reason.trim().length >= 10
    return true
  }

  const submit = () => {
    const ref = generateReference('MRSV')
    const application: Application = {
      id: crypto.randomUUID(),
      reference: ref,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      category: form.category as GuestCategory,
      organization: form.organization.trim(),
      role: form.role.trim() || undefined,
      reason: form.reason.trim(),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'under-review',
      rsvpStatus: 'pending',
    }
    saveLocalApplication(application)
    setReference(ref)
  }

  const copyRef = async () => {
    if (!reference) return
    await navigator.clipboard.writeText(reference)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (reference) {
    return (
      <div className="rounded-lg border border-primary/40 bg-card p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden="true" />
        <h2 className="mt-5 font-serif text-2xl font-semibold md:text-3xl">
          Application Received
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Thank you, {form.firstName}. The Mrs Vehicle committee will review your request.
          Please keep your application reference safe — you will need it to check your status.
        </p>
        <div className="mx-auto mt-7 flex max-w-xs items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3">
          <span className="font-mono text-lg tracking-wider text-primary">{reference}</span>
          <button
            type="button"
            onClick={copyRef}
            className="text-muted-foreground hover:text-primary"
            aria-label="Copy reference"
          >
            {copied ? <CheckCircle2 className="size-4 text-primary" /> : <Copy className="size-4" />}
          </button>
        </div>
        <Button asChild className="mt-8">
          <Link href="/status">
            Check Application Status
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card p-6 md:p-10">
      {/* Step indicator */}
      <ol className="flex items-center gap-2" aria-label="Application steps">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-0.5 w-full rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`}
              aria-hidden="true"
            />
            <span
              className={`hidden text-[10px] uppercase tracking-[0.15em] sm:block ${
                i === step ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:hidden">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>

      <div className="mt-8">
        {step === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => set('firstName')(e.target.value)}
                placeholder="Alessandro"
                autoComplete="given-name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => set('lastName')(e.target.value)}
                placeholder="Conti"
                autoComplete="family-name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">
                Phone <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
                placeholder="+377 00 00 00 00"
                autoComplete="tel"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <RadioGroup
            value={form.category}
            onValueChange={(v) => set('category')(v)}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            aria-label="Guest category"
          >
            {GUEST_CATEGORIES.map((cat) => (
              <Label
                key={cat.value}
                htmlFor={cat.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                  form.category === cat.value
                    ? 'border-primary bg-accent'
                    : 'border-border/60 hover:border-primary/40'
                }`}
              >
                <RadioGroupItem value={cat.value} id={cat.value} className="mt-0.5" />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{cat.label}</span>
                  <span className="text-xs font-normal leading-relaxed text-muted-foreground">
                    {cat.description}
                  </span>
                </span>
              </Label>
            ))}
          </RadioGroup>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="organization">Organization / Affiliation</Label>
                <Input
                  id="organization"
                  value={form.organization}
                  onChange={(e) => set('organization')(e.target.value)}
                  placeholder="Stellare Motors"
                  autoComplete="organization"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">
                  Role / Title <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={(e) => set('role')(e.target.value)}
                  placeholder="Chief Executive Officer"
                  autoComplete="organization-title"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reason">Why would you like to attend?</Label>
              <Textarea
                id="reason"
                value={form.reason}
                onChange={(e) => set('reason')(e.target.value)}
                placeholder="Tell the committee about your connection to the automotive world, references, or vehicles you represent..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                A brief note helps the committee review your request. Minimum 10 characters.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <dl className="flex flex-col divide-y divide-border/60">
            {[
              ['Name', `${form.firstName} ${form.lastName}`],
              ['Email', form.email],
              ['Phone', form.phone || '—'],
              ['Category', form.category ? categoryLabel(form.category as GuestCategory) : '—'],
              ['Organization', form.organization],
              ['Role', form.role || '—'],
              ['Reason', form.reason],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                <dt className="w-32 shrink-0 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-sm text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!stepValid()}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="button" onClick={submit}>
            Submit Application
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
