'use client'

interface FeaturedBrand {
  name: string
  slug: string
  tagline: string
}

const FEATURED_BRANDS: FeaturedBrand[] = [
  { name: 'Ferrari', slug: 'ferrari', tagline: 'Prancing Horse Legacy' },
  { name: 'Lamborghini', slug: 'lamborghini', tagline: 'Raging Bull Performance' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', tagline: 'Engineering Excellence' },
  { name: 'Porsche', slug: 'porsche', tagline: 'Precision & Innovation' },
  { name: 'Rolls-Royce', slug: 'rolls-royce', tagline: 'Pinnacle of Luxury' },
  { name: 'BMW', slug: 'bmw', tagline: 'Ultimate Driving Machine' },
  { name: 'Bugatti', slug: 'bugatti', tagline: 'Hypercar Royalty' },
  { name: 'Pagani', slug: 'pagani', tagline: 'Artisan Engineering' },
  { name: 'Aston Martin', slug: 'aston-martin', tagline: 'British Elegance' },
  { name: 'Jaguar', slug: 'jaguar', tagline: 'Grace & Pace' },
  { name: 'Bentley', slug: 'bentley', tagline: 'Refined Craftsmanship' },
  { name: 'McLaren', slug: 'mclaren', tagline: 'Speed Perfected' },
]

export function FeaturedBrands() {
  return (
    <section className="border-t border-border/60 bg-gradient-to-b from-sidebar/30 to-sidebar/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Represented Brands</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-5xl">
            The World&apos;s Finest Manufacturers
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Mrs Vehicle celebrates the most prestigious automotive brands—each bringing their unique vision of excellence, innovation, and craftsmanship to the global stage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FEATURED_BRANDS.map((brand) => (
            <div
              key={brand.slug}
              className="group relative flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/40 p-8 backdrop-blur-lg transition-all duration-300 hover:border-primary/60 hover:bg-card/60 hover:shadow-lg"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-28 w-full items-center justify-center">
                <img
                  src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${brand.slug}/default.svg`}
                  alt={`${brand.name} logo`}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="relative mt-6 text-center">
                <p className="font-serif text-lg font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                  {brand.name}
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary/80">
                  {brand.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Additional manufacturers and emerging brands are welcome to apply for participation at the Mrs Vehicle World Car Show.
          </p>
        </div>
      </div>
    </section>
  )
}
