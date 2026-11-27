import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Scissors } from 'lucide-react'
import { usePageMeta } from '../usePageMeta'
import SETTINGS from '../../content/settings/index.json'
import { SERVICES_FULL } from '../lib/services'
import { SERVICE_ICONS } from '../lib/serviceIcons'
import PlaceholderImage from '../PlaceholderImage'
import FAQSection from '../FAQSection'
import { serviceMenuJsonLd, faqJsonLd } from '../lib/seo'
import Footer from '../Footer'

const FRESHA_URL = SETTINGS.freshaBookingUrl

// Display order for grouping — not every service needs a subcategory, but
// these are the ones we currently use for Nails.
const GROUP_ORDER = ['Manicures', 'Pedicures', 'Enhancements', 'Finishing Touches']

const NAILS_FAQS = [
  {
    q: 'Do you offer gel and acrylic nails?',
    a: 'Yes — our menu includes classic and gel manicures, classic and gel pedicures, acrylic full sets, dip powder, gel overlay, French tips, nail art and professional acrylic/gel removal.',
  },
  {
    q: 'How much does a manicure cost?',
    a: 'Our classic manicure starts from an estimated ZAR 150, with gel, acrylic and dip powder options priced higher. See the full menu above for current estimates, confirmed on booking.',
  },
  {
    q: 'Can French tips or nail art be added to any set?',
    a: 'Yes — French tips, nail art and other finishing touches can be added to any manicure, pedicure or enhancement set.',
  },
  {
    q: 'Where is House Of Grace Beauty Salon located?',
    a: "We're based at No 3, 9th Street, Alberskroon, Randburg, Johannesburg, open Monday to Saturday, 7am–9pm.",
  },
]

export default function Nails() {
  const nailServices = SERVICES_FULL.filter((svc) => svc.category === 'Nails')
  const groups = GROUP_ORDER
    .map((group) => ({ group, items: nailServices.filter((svc) => svc.subcategory === group) }))
    .filter((g) => g.items.length > 0)

  usePageMeta({
    title: 'Nail Tech Services | House Of Grace Beauty Salon',
    description: 'Manicures, pedicures, gel, acrylic, dip powder and nail art at House Of Grace Beauty Salon, Randburg. French tips, enhancements and finishing touches for every occasion.',
    path: '/nails',
    image: '/og-image.jpg',
    jsonLd: [
      serviceMenuJsonLd({
        serviceType: 'Nail Technician Services',
        name: 'Nail Tech Services',
        description: 'Manicures, pedicures, gel, acrylic, dip powder, nail art and finishing touches.',
        path: '/nails',
        services: nailServices,
      }),
      faqJsonLd(NAILS_FAQS),
    ],
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden">
            <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display font-semibold text-ink">House Of Grace</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-dark font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>
      </header>

      <main className="px-6 sm:px-10 lg:px-16 pb-24 max-w-7xl mx-auto">

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16 sm:mb-24 pt-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Nail Tech Services</span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Nails, done
              <span className="block font-serif italic font-normal text-primary-dark mt-1">properly.</span>
            </h1>
            <p className="text-muted text-base sm:text-lg mt-6 leading-relaxed">
              From a classic manicure to a full acrylic set with hand-painted art — our nail technicians work with
              gel, acrylic and dip powder to give you a finish that lasts and a style that's exactly yours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={FRESHA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#menu"
                className="lift-on-hover inline-flex items-center justify-center gap-2 border border-divider text-ink font-medium px-7 py-3.5 rounded-full hover:border-primary/40 transition-colors"
              >
                See the menu
              </a>
            </div>
          </div>
          <img
            src="/nails-hero.png"
            alt="Close-up of a manicured hand resting on a marble nail table in the salon"
            className="rounded-5xl aspect-[4/3] w-full object-cover shadow-2xl shadow-primary/15"
          />
        </div>

        {/* Menu, grouped */}
        <div id="menu" className="pt-6">
          {groups.map(({ group, items }) => (
            <section key={group} className="mb-14 sm:mb-16">
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6 tracking-tight">{group}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((svc) => {
                  const Icon = SERVICE_ICONS[svc.icon] || Scissors
                  return (
                    <div key={svc.itemId} className="flex flex-col bg-surface border border-divider rounded-4xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300">
                      {svc.image ? (
                        <img src={svc.image} alt={svc.title} className="h-32 w-full object-cover" />
                      ) : (
                        <PlaceholderImage label={svc.title} icon={Icon} className="h-32 w-full" />
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display font-medium text-lg text-ink mb-2">{svc.title}</h3>
                        <p className="text-muted text-sm leading-relaxed flex-1">{svc.description}</p>
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-divider">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{svc.duration}</span>
                          <span className="font-display font-semibold text-primary-dark">ZAR {svc.price}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="text-center text-muted text-sm max-w-2xl mx-auto mb-16">
          Prices shown are estimates and may be confirmed on booking. Add-ons like French tips and nail art can be
          combined with any manicure, pedicure or enhancement.
        </p>

        <FAQSection
          eyebrow="Questions"
          heading="Nail services, answered."
          faqs={NAILS_FAQS}
        />

        {/* Closing CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink leading-[1.05] tracking-tight">
            Ready for your next set?
          </h2>
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn mt-8 inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-8 py-4 rounded-full shadow-xl shadow-primary/30"
          >
            Book Your Nail Appointment
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-muted text-sm mt-6">
            Or WhatsApp us on <a href={`https://wa.me/${SETTINGS.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary-dark underline underline-offset-2 hover:text-primary">{SETTINGS.contact.phone}</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
