'use client'

interface FeaturedBrand {
  name: string
  slug: string
  category: string
}

const FEATURED_BRANDS: FeaturedBrand[] = [
  { name: 'Ferrari', slug: 'ferrari', category: 'Performance' },
  { name: 'Lamborghini', slug: 'lamborghini', category: 'Performance' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', category: 'Luxury' },
  { name: 'Porsche', slug: 'porsche', category: 'Performance' },
  { name: 'Rolls-Royce', slug: 'rolls-royce', category: 'Luxury' },
  { name: 'BMW', slug: 'bmw', category: 'Luxury' },
  { name: 'Bugatti', slug: 'bugatti', category: 'Hypercar' },
  { name: 'Pagani', slug: 'pagani', category: 'Hypercar' },
]

export function FeaturedBrands() {
  return (
    <section className="border-t border-border/60 bg-sidebar/50">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Represented Brands</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
            The World&apos;s Finest Manufacturers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Mrs Vehicle brings together the most prestigious automotive brands, from legendary performance marques to luxury innovators.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURED_BRANDS.map((brand) => (
            <div
              key={brand.slug}
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card/80"
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${brand.slug}/default.svg`}
                alt={`${brand.name} logo`}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-card-foreground">{brand.name}</p>
                <p className="text-xs text-muted-foreground">{brand.category}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Additional manufacturers and emerging brands are welcome to apply for participation. Contact us for more information.
        </p>
      </div>
    </section>
  )
}
