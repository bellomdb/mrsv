import type { Application, Award, GuestCategory, Nomination, ScheduleDay } from './types'

export const EVENT = {
  name: 'Mrs Vehicle',
  shortName: 'Mrs V',
  edition: 'Inaugural Edition',
  dates: 'June 18–21, 2026',
  venue: 'The Grand Palais des Automobiles',
  city: 'Monaco',
  dressCode: 'Black Tie',
}

export const GUEST_CATEGORIES: { value: GuestCategory; label: string; description: string }[] = [
  { value: 'manufacturer', label: 'Car Manufacturer', description: 'Global automotive manufacturers and brands' },
  { value: 'dealership', label: 'International Dealership', description: 'Premier automotive dealerships and distributors' },
  { value: 'investor', label: 'Automotive Investor', description: 'Investors and business leaders in the automotive space' },
  { value: 'designer-engineer', label: 'Designer / Engineer', description: 'Car designers and automotive engineers' },
  { value: 'celebrity', label: 'Celebrity', description: 'Distinguished public figures and entertainers' },
  { value: 'royal-dignitary', label: 'Royal / Dignitary', description: 'Members of royal families and government representatives' },
  { value: 'media', label: 'Media Organization', description: 'Automotive media and press organizations' },
  { value: 'influencer', label: 'Advertiser / Influencer', description: 'Automotive social media advertisers and influencers' },
  { value: 'enthusiast-collector', label: 'Enthusiast / Collector', description: 'Automobile enthusiasts and private collectors' },
]

export const AWARDS: Award[] = [
  {
    slug: 'mrs-vehicle',
    name: 'Mrs Vehicle',
    shortName: 'Mrs V',
    tagline: 'The Grand Champion',
    threshold: '70%+ overall across all three major judging categories',
    criteria: ['Engine performance', 'Exterior design', 'Interior design'],
    description:
      'The highest honor of the event. Presented to a vehicle that demonstrates outstanding all-round excellence — the complete package, combining power, beauty, comfort, and quality.',
    image: '/images/award-champion.png',
  },
  {
    slug: 'queen-of-the-road',
    name: 'Queen of the Road',
    shortName: 'Queen',
    tagline: 'Supreme Driving Power',
    threshold: '90%+ in every performance discipline',
    criteria: ['Engine performance', 'Acceleration', 'Overall driving capability'],
    description:
      "Recognizes the world's best-performing vehicle in terms of driving power — the vehicle that delivers exceptional speed, power, and road performance.",
    image: '/images/award-performance.png',
  },
  {
    slug: 'mrs-exterior',
    name: 'Mrs Exterior',
    shortName: 'Mrs EX',
    tagline: 'Automotive Beauty & Design',
    threshold: '90%+ in every exterior discipline',
    criteria: ['Exterior styling', 'Body design', 'Creativity', 'Overall visual appeal'],
    description:
      'Presented to the vehicle with the most outstanding exterior appearance — recognizing excellence in automotive beauty and design.',
    image: '/images/award-exterior.png',
  },
  {
    slug: 'mrs-interior',
    name: 'Mrs Interior',
    shortName: 'Mrs I',
    tagline: 'The Finest Cabin in the World',
    threshold: '90%+ in every interior discipline',
    criteria: ['Interior design', 'Comfort', 'Luxury', 'Technology', 'Materials & craftsmanship'],
    description:
      'Honors the vehicle with the finest interior — celebrating innovation and excellence inside the vehicle.',
    image: '/images/award-interior.png',
  },
]

export const SCHEDULE: ScheduleDay[] = [
  {
    day: 'Day One',
    date: 'Thursday, June 18',
    title: 'Arrivals & Private Preview',
    events: [
      { time: '15:00', title: 'Guest Arrivals & Registration', description: 'Digital pass check-in and welcome reception' },
      { time: '18:00', title: 'Red Carpet Arrivals', description: 'Press photography and arrivals ceremony' },
      { time: '19:30', title: 'Private Exhibition Preview', description: 'Exclusive first viewing of all nominated vehicles' },
      { time: '21:00', title: 'Welcome Dinner', description: 'Seated gala dinner hosted by the Mrs V committee' },
    ],
  },
  {
    day: 'Day Two',
    date: 'Friday, June 19',
    title: 'Exhibition & Judging',
    events: [
      { time: '10:00', title: 'Exhibition Halls Open', description: 'Nominated vehicles on display across three halls' },
      { time: '11:00', title: 'Performance Judging Sessions', description: 'Engine performance and driving capability evaluations' },
      { time: '14:00', title: 'Design Panels', description: 'Exterior and interior design judging with expert panels' },
      { time: '19:00', title: 'Manufacturers Networking Evening', description: 'Business networking for industry leaders and investors' },
    ],
  },
  {
    day: 'Day Three',
    date: 'Saturday, June 20',
    title: 'Showcases & Finalists',
    events: [
      { time: '10:00', title: 'Innovation Showcase', description: 'Presentations of future concepts and technologies' },
      { time: '13:00', title: 'Finalists Announced', description: 'The shortlist for all four awards is revealed' },
      { time: '16:00', title: 'Collectors Concours', description: 'Private collection showcase on the palace lawns' },
      { time: '20:00', title: 'Royal Reception', description: 'An evening reception with distinguished guests' },
    ],
  },
  {
    day: 'Day Four',
    date: 'Sunday, June 21',
    title: 'The Awards Gala',
    events: [
      { time: '17:00', title: 'Champagne Reception', description: 'Pre-ceremony reception in the grand foyer' },
      { time: '19:00', title: 'The Mrs Vehicle Awards Ceremony', description: 'Queen of the Road, Mrs EX, Mrs I, and the crowning of Mrs Vehicle' },
      { time: '22:00', title: 'Grand Champion Celebration', description: 'Celebration gala honoring the Mrs V Grand Champion' },
    ],
  },
]

export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: '1',
    reference: 'MRSV-2026-1001',
    firstName: 'Alessandro',
    lastName: 'Conti',
    email: 'a.conti@stellare-motors.example',
    category: 'manufacturer',
    organization: 'Stellare Motors',
    role: 'Chief Executive Officer',
    reason: 'Presenting our flagship grand tourer for award consideration and seeking investment partners.',
    submittedAt: '2026-02-14',
    status: 'approved',
    rsvpStatus: 'confirmed',
    plusOne: true,
    plusOneName: 'Giulia Conti',
    table: 'Table 3 — Grand Hall',
  },
  {
    id: '2',
    reference: 'MRSV-2026-1002',
    firstName: 'Amara',
    lastName: 'Okafor',
    email: 'amara@meridianventures.example',
    category: 'investor',
    organization: 'Meridian Ventures',
    role: 'Managing Partner',
    reason: 'Exploring investment opportunities in emerging EV manufacturers.',
    submittedAt: '2026-02-18',
    status: 'approved',
    rsvpStatus: 'pending',
    table: 'Table 7 — Grand Hall',
  },
  {
    id: '3',
    reference: 'MRSV-2026-1003',
    firstName: 'Henrik',
    lastName: 'Lindqvist',
    email: 'henrik@autopressen.example',
    category: 'media',
    organization: 'AutoPressen International',
    role: 'Editor-in-Chief',
    reason: 'Covering the inaugural Mrs Vehicle awards for our global readership.',
    submittedAt: '2026-03-02',
    status: 'under-review',
    rsvpStatus: 'pending',
  },
  {
    id: '4',
    reference: 'MRSV-2026-1004',
    firstName: 'Sofia',
    lastName: 'Marchetti',
    email: 'sofia.m@granturismo.example',
    category: 'designer-engineer',
    organization: 'Gran Turismo Design House',
    role: 'Lead Exterior Designer',
    reason: 'Two of our designs are entered for Mrs Exterior consideration.',
    submittedAt: '2026-03-05',
    status: 'approved',
    rsvpStatus: 'confirmed',
    table: 'Table 12 — West Gallery',
  },
  {
    id: '5',
    reference: 'MRSV-2026-1005',
    firstName: 'James',
    lastName: 'Whitfield',
    email: 'jw@whitfieldcollection.example',
    category: 'enthusiast-collector',
    organization: 'The Whitfield Collection',
    reason: 'Private collector of rare grand tourers, attending the concours showcase.',
    submittedAt: '2026-03-11',
    status: 'under-review',
    rsvpStatus: 'pending',
  },
  {
    id: '6',
    reference: 'MRSV-2026-1006',
    firstName: 'Nadia',
    lastName: 'Rahman',
    email: 'nadia@velocitymedia.example',
    category: 'influencer',
    organization: 'Velocity Media',
    reason: 'Automotive content creator with 4M followers, covering the red carpet.',
    submittedAt: '2026-03-12',
    status: 'declined',
    rsvpStatus: 'pending',
  },
]

export const SAMPLE_NOMINATIONS: Nomination[] = [
  {
    id: '1',
    reference: 'NOM-2026-201',
    company: 'Stellare Motors',
    contactName: 'Alessandro Conti',
    contactEmail: 'a.conti@stellare-motors.example',
    make: 'Stellare',
    model: 'Aurora GT',
    year: '2026',
    engine: '4.0L Twin-Turbo V8 Hybrid',
    horsepower: '830',
    zeroToSixty: '2.8s',
    categories: ['Mrs Vehicle', 'Queen of the Road'],
    description: 'Flagship hybrid grand tourer combining record-setting performance with handcrafted luxury.',
    submittedAt: '2026-02-20',
    status: 'shortlisted',
  },
  {
    id: '2',
    reference: 'NOM-2026-202',
    company: 'Maison Lumière Automobiles',
    contactName: 'Céleste Moreau',
    contactEmail: 'c.moreau@lumiere.example',
    make: 'Lumière',
    model: 'Élégance Coupé',
    year: '2026',
    engine: '6.0L W12',
    horsepower: '650',
    zeroToSixty: '3.6s',
    categories: ['Mrs Exterior', 'Mrs Interior'],
    description: 'A rolling sculpture with a cabin finished in silk, crystal, and open-pore walnut.',
    submittedAt: '2026-02-25',
    status: 'in-review',
  },
  {
    id: '3',
    reference: 'NOM-2026-203',
    company: 'Kagura Performance',
    contactName: 'Ren Takahashi',
    contactEmail: 'r.takahashi@kagura.example',
    make: 'Kagura',
    model: 'Tempest R',
    year: '2026',
    engine: 'Tri-Motor Electric',
    horsepower: '1,020',
    zeroToSixty: '2.1s',
    categories: ['Queen of the Road'],
    description: 'All-electric hypercar engineered for absolute dominance in acceleration and handling.',
    submittedAt: '2026-03-01',
    status: 'received',
  },
]

export function generateReference(prefix: string) {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-2026-${num}`
}

export function categoryLabel(value: GuestCategory) {
  return GUEST_CATEGORIES.find((c) => c.value === value)?.label ?? value
}
