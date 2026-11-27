import SETTINGS from '../../content/settings/index.json'

const SITE = 'https://houseofgracebeauty.co.za'

// Reused so every page's Service schema points back to the same business
// entity Google already has on file from the homepage's LocalBusiness block.
export const SALON_PROVIDER = {
  '@type': 'HairSalon',
  name: 'House Of Grace Beauty Salon',
  image: `${SITE}/og-image.jpg`,
  telephone: SETTINGS.contact.phoneIntl,
  email: SETTINGS.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 3, 9th Street, Alberskroon',
    addressLocality: 'Randburg',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
}

// A Service + priced OfferCatalog for a dedicated menu page (Nails, Massage).
export function serviceMenuJsonLd({ serviceType, name, description, path, services }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name,
    description,
    url: `${SITE}${path}`,
    provider: SALON_PROVIDER,
    areaServed: { '@type': 'City', name: 'Johannesburg' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: services.map((svc) => ({
        '@type': 'Offer',
        priceCurrency: 'ZAR',
        price: String(svc.price),
        itemOffered: {
          '@type': 'Service',
          name: svc.title,
          description: svc.description,
        },
      })),
    },
  }
}

// FAQPage block — the single highest-leverage markup for AI answer engines
// (ChatGPT, Perplexity, Google AI Overviews), which lift Q&A pairs verbatim.
export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
