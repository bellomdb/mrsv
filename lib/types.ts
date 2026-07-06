export type GuestCategory =
  | 'manufacturer'
  | 'dealership'
  | 'investor'
  | 'designer-engineer'
  | 'celebrity'
  | 'royal-dignitary'
  | 'media'
  | 'influencer'
  | 'enthusiast-collector'

export type ApplicationStatus = 'under-review' | 'approved' | 'declined'

export type RsvpStatus = 'pending' | 'confirmed' | 'declined'

export interface Application {
  id: string
  reference: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  category: GuestCategory
  organization: string
  role?: string
  reason: string
  submittedAt: string
  status: ApplicationStatus
  rsvpStatus: RsvpStatus
  plusOne?: boolean
  plusOneName?: string
  dietary?: string
  table?: string
}

export interface Nomination {
  id: string
  reference: string
  company: string
  contactName: string
  contactEmail: string
  make: string
  model: string
  year: string
  engine: string
  horsepower: string
  zeroToSixty: string
  categories: string[]
  description: string
  submittedAt: string
  status: 'received' | 'in-review' | 'shortlisted'
}

export interface Award {
  slug: string
  name: string
  shortName: string
  tagline: string
  threshold: string
  criteria: string[]
  description: string
  image: string
}

export interface ScheduleDay {
  day: string
  date: string
  title: string
  events: { time: string; title: string; description: string }[]
}
