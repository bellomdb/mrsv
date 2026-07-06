'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { AWARDS, generateReference } from '@/lib/data'
import { saveLocalNomination } from '@/lib/store'
import type { Nomination } from '@/lib/types'

const STEPS = ['Vehicle Details', 'Performance Specs', 'Award Categories', 'Review & Submit']

interface FormState {
  company: string
  contactName: string
  contactEmail: string
  contactPhone: string
  make: string
  model: string
  year: string
  engine: string
  horsepower: string
  zeroToSixty: string
  description: string
  categories: string[]
}

const INITIAL: FormState = {
  company: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  make: '',
  model: '',
  year: '',
  engine: '',
  horsepower: '',
  zeroToSixty: '',
  description: '',
  categories: [],
}

export function NominationForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [reference, setReference] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const set = (field: keyof FormState) => (value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value }))

  const toggleCategory = (categoryName: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(categoryName)
        ? f.categories.filter((c) => c !== categoryName)
        : [...f.categories, categoryName],
    }))
  }

  const stepValid = () => {
    if (step === 0)
      return (
        form.company.trim() &&
        form.contactName.trim() &&
        form.contactEmail.includes('@') &&
        form.make.trim() &&
        form.model.trim() &&
        form.year.trim()
      )
    if (step === 1)
      return form.engine.trim() && form.horsepower.trim() && form.zeroToSixty.trim()
    if (step === 2) return form.categories.length > 0
    return form.description.trim().length >= 20
  }

  const submit = () => {
    const ref = generateReference('NOM')
    const nomination: Nomination = {
      id: crypto.randomUUID(),
      reference: ref,
      company: form.company.trim(),
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim(),
      make: form.make.trim(),
      model: form.model.trim(),
      year: form.year.trim(),
      engine: form.engine.trim(),
      horsepower: form.horsepower.trim(),
      zeroToSixty: form.zeroToSixty.trim(),
      categories: form.categories,
      description: form.description.trim(),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'received',
    }
    saveLocalNomination(nomination)
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
          Nomination Received
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Thank you for nominating the {form.make} {form.model}. The judging panel will evaluate
          your vehicle against all criteria. Keep your nomination reference for future inquiries.
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
          <Link href="/">
            Return Home
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card p-6 md:p-10">
      {/* Step indicator */}
      <ol className="flex items-center gap-2" aria-label="Nomination steps">
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
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Company / Manufacturer</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => set('company')(e.target.value)}
                  placeholder="Stellare Motors"
                  autoComplete="organization"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={form.contactName}
                  onChange={(e) => set('contactName')(e.target.value)}
                  placeholder="Alessandro Conti"
                  autoComplete="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => set('contactEmail')(e.target.value)}
                  placeholder="contact@company.com"
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactPhone">
                  Contact Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => set('contactPhone')(e.target.value)}
                  placeholder="+377 00 00 00 00"
                  autoComplete="tel"
                />
              </div>
            </div>
            <hr className="my-2 border-border/60" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={form.make}
                  onChange={(e) => set('make')(e.target.value)}
                  placeholder="Stellare"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={form.model}
                  onChange={(e) => set('model')(e.target.value)}
                  placeholder="Aurora GT"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={form.year}
                  onChange={(e) => set('year')(e.target.value)}
                  placeholder="2026"
                  type="number"
                />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="engine">Engine / Powertrain</Label>
              <Input
                id="engine"
                value={form.engine}
                onChange={(e) => set('engine')(e.target.value)}
                placeholder="4.0L Twin-Turbo V8 Hybrid"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="horsepower">Horsepower</Label>
                <Input
                  id="horsepower"
                  value={form.horsepower}
                  onChange={(e) => set('horsepower')(e.target.value)}
                  placeholder="830"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="zeroToSixty">0-60 Time (seconds)</Label>
                <Input
                  id="zeroToSixty"
                  value={form.zeroToSixty}
                  onChange={(e) => set('zeroToSixty')(e.target.value)}
                  placeholder="2.8"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Select all applicable award categories for this vehicle:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AWARDS.map((award) => (
                <label
                  key={award.slug}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/60 p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent"
                >
                  <Checkbox
                    checked={form.categories.includes(award.name)}
                    onCheckedChange={() => toggleCategory(award.name)}
                    className="mt-0.5"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{award.name}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {award.tagline}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <dl className="flex flex-col divide-y divide-border/60">
              {[
                ['Company', form.company],
                ['Contact', form.contactName],
                ['Email', form.contactEmail],
                ['Phone', form.contactPhone || '—'],
                ['Vehicle', `${form.make} ${form.model} (${form.year})`],
                ['Engine', form.engine],
                ['Horsepower', form.horsepower],
                ['0-60 Time', `${form.zeroToSixty}s`],
                ['Categories', form.categories.join(', ')],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                  <dt className="w-32 shrink-0 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <hr className="my-2 border-border/60" />
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description / Notes</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => set('description')(e.target.value)}
                placeholder="Tell the judging panel about this vehicle's key features, innovations, and why it deserves consideration..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Provide additional context about the vehicle. Minimum 20 characters.
              </p>
            </div>
          </div>
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
            Submit Nomination
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
