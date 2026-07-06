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

const brandsByCategory = {
  Performance: FEATURED_BRANDS.filter((b) => b.category === 'Performance'),
  Luxury: FEATURED_BRANDS.filter((b) => b.category === 'Luxury'),
  Hypercar: FEATURED_BRANDS.filter((b) => b.category === 'Hypercar'),
}

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
            Mrs Vehicle celebrates the most prestigious automotive brands—from legendary performance marques and timeless luxury innovators to cutting-edge hypercar engineers.
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(brandsByCategory).map(([category, brands]) => (
            <div key={category}>
              <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-foreground/80">
                {category}
              </h3>
              <div className={`grid gap-8 ${category === 'Hypercar' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {brands.map((brand) => (
                  <div
                    key={brand.slug}
                    className="group relative flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/40 p-10 backdrop-blur-lg transition-all duration-300 hover:border-primary/60 hover:bg-card/60 hover:shadow-lg md:p-12"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-24 w-full items-center justify-center md:h-28">
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
                      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/70">
                        {brand.category}
                      </p>
                    </div>
                  </div>
                ))}
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
