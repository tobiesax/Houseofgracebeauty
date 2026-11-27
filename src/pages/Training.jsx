import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CheckCircle2, GraduationCap, ClipboardList, Rocket,
} from 'lucide-react'
import { usePageMeta } from '../usePageMeta'
import SETTINGS from '../../content/settings/index.json'
import TRAINING from '../../content/training/index.json'
import FAQSection from '../FAQSection'
import { SALON_PROVIDER, faqJsonLd } from '../lib/seo'

const PACKAGE_ICONS = [GraduationCap, ClipboardList, Rocket]

const TRAINING_FAQS = [
  {
    q: "What does House Of Grace's in-salon training include?",
    a: 'Our in-salon training covers scalp and hair assessment, treatment protocols and hands-on technique across our specialised treatments — so your team learns to understand the hair and scalp, not just the style.',
  },
  {
    q: 'What training packages are available?',
    a: 'We offer three packages — TRAIN, TRAIN+BUILD and TRAIN+LAUNCH — ranging from core technique training to full treatment-menu development and launch support. Pricing is discussed on a consultation.',
  },
  {
    q: 'Do you help salons develop their own treatment menu?',
    a: 'Yes — our TRAIN+BUILD and TRAIN+LAUNCH packages include treatment-menu development, helping your salon introduce specialised services as a new revenue stream.',
  },
  {
    q: 'How do I book an in-salon training consultation?',
    a: 'Message us on WhatsApp, or get in touch by phone or email — see the contact options below, or use the "Book a Training Consultation" button above.',
  },
]

function whatsappLink(packageName) {
  const lines = [
    'Hi House Of Grace, I\'d like to book an In-Salon Training consultation.',
    '',
    'Salon name: ',
    'Number of stylists: ',
    packageName ? `Package of interest: ${packageName}` : 'Package of interest: ',
  ]
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${SETTINGS.contact.whatsapp}?text=${text}`
}

export default function Training() {
  usePageMeta({
    title: 'In-Salon Training For Salon Owners | House Of Grace Beauty Salon',
    description: 'Train your team in specialised scalp and hair-support treatments. House Of Grace brings in-salon training, treatment menu development and launch support directly to your salon.',
    path: '/training',
    image: '/og-image.jpg',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'In-Salon Hair & Scalp Treatment Training',
        name: 'In-Salon Training',
        description: 'In-salon training, treatment menu development and launch support for salon owners and their teams.',
        url: 'https://houseofgracebeauty.co.za/training',
        provider: SALON_PROVIDER,
        audience: { '@type': 'BusinessAudience', audienceType: 'Salon owners and stylists' },
        areaServed: { '@type': 'City', name: 'Johannesburg' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'In-Salon Training Packages',
          itemListElement: TRAINING.packages.map((pkg) => ({
            '@type': 'Offer',
            name: pkg.name,
            description: pkg.description,
          })),
        },
      },
      faqJsonLd(TRAINING_FAQS),
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
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16 sm:mb-20 pt-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {TRAINING.hero.eyebrow}</span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              {TRAINING.hero.heading}
              <span className="block font-serif italic font-normal text-primary-dark mt-1">{TRAINING.hero.headingAccent}</span>
            </h1>
            <p className="text-muted text-base sm:text-lg mt-6 leading-relaxed">
              {TRAINING.hero.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
              >
                Book a Training Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#packages"
                className="lift-on-hover inline-flex items-center justify-center gap-2 border border-divider text-ink font-medium px-7 py-3.5 rounded-full hover:border-primary/40 transition-colors"
              >
                See the packages
              </a>
            </div>
          </div>
          <img
            src="/training-hero.png"
            alt="Senior stylist guiding a trainee through a scalp treatment technique on a mannequin head in the salon"
            className="rounded-5xl aspect-[4/3] w-full object-cover shadow-2xl shadow-primary/15"
          />
        </div>

        {/* What we train */}
        <section className="mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ What we train your team in</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-4 leading-[1.05] tracking-tight max-w-2xl">
            Understanding the hair and scalp,
            <span className="block font-serif italic font-normal text-primary-dark mt-1">not just the style.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
            {TRAINING.whatWeTrain.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface border border-divider rounded-3xl px-5 py-4">
                <CheckCircle2 className="h-5 w-5 text-primary-dark flex-shrink-0 mt-0.5" />
                <span className="text-ink text-[15px] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue flow */}
        <section className="mb-16 sm:mb-24 bg-deep text-white rounded-6xl px-6 sm:px-10 lg:px-16 py-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ A new revenue stream</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl mt-4 leading-[1.05] tracking-tight max-w-2xl">
            This isn't just another training certificate.
          </h2>
          <p className="text-white/55 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
            We help you look at how specialised treatments can become part of your salon's service menu. Your team
            learns the treatment process, your salon introduces the services, and your clients have another reason
            to return.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-10">
            {TRAINING.revenueFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest bg-white/10 border border-white/15 rounded-full px-4 py-2">
                  {step}
                </span>
                {i < TRAINING.revenueFlow.length - 1 && <ArrowRight className="h-4 w-4 text-primary-light" />}
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="mb-16 sm:mb-24 pt-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Training packages</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-4 leading-[1.05] tracking-tight max-w-2xl">
            Choose how far
            <span className="block font-serif italic font-normal text-primary-dark mt-1">you want to take it.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed max-w-xl">
            Every package is customised to your team's experience, your salon's clientele, and the services you want
            to introduce — so pricing is discussed on a consultation, not listed here.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
            {TRAINING.packages.map((pkg, i) => {
              const Icon = PACKAGE_ICONS[i] || GraduationCap
              return (
                <div
                  key={pkg.name}
                  className={`flex flex-col rounded-5xl border p-7 sm:p-8 ${
                    i === 1 ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30 lg:-translate-y-3' : 'bg-surface border-divider'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 ${
                    i === 1 ? 'bg-white/15 border border-white/25' : 'bg-primary/10 border border-primary/20'
                  }`}>
                    <Icon className={`h-5 w-5 ${i === 1 ? 'text-white' : 'text-primary-dark'}`} />
                  </div>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2 ${i === 1 ? 'text-white/70' : 'text-primary-dark'}`}>
                    Package {i + 1}
                  </p>
                  <h3 className="font-display font-semibold text-2xl mb-1">{pkg.name}</h3>
                  <p className={`font-serif italic text-lg mb-5 ${i === 1 ? 'text-white/85' : 'text-primary-dark'}`}>{pkg.tagline}</p>
                  <p className={`text-[15px] leading-relaxed flex-1 ${i === 1 ? 'text-white/80' : 'text-muted'}`}>
                    {pkg.description}
                  </p>
                  <a
                    href={whatsappLink(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-sm transition-all duration-300 ${
                      i === 1
                        ? 'bg-white text-primary-dark hover:bg-white/90'
                        : 'bg-primary/10 text-primary-dark hover:bg-primary hover:text-white border border-primary/20'
                    }`}
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* Treatment services */}
        <section className="mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Treatments we can develop for your salon</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-4 leading-[1.05] tracking-tight max-w-2xl">
            A treatment system
            <span className="block font-serif italic font-normal text-primary-dark mt-1">your salon can call its own.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {TRAINING.treatments.map((t) => (
              <div key={t.name} className="bg-surface border border-divider rounded-4xl p-6 sm:p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300">
                <h3 className="font-display font-medium text-lg text-ink mb-2">{t.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
          <p className="text-muted text-sm mt-8 max-w-2xl italic">{TRAINING.treatmentsNote}</p>
        </section>

        {/* Why salon owners choose this */}
        <section className="mb-16 sm:mb-24 bg-surface border border-divider rounded-6xl px-6 sm:px-10 lg:px-16 py-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Why salon owners choose this</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {TRAINING.whyChoose.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-dark flex-shrink-0 mt-0.5" />
                <span className="text-ink text-[15px] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <FAQSection
          eyebrow="Questions"
          heading="In-salon training, answered."
          faqs={TRAINING_FAQS}
        />

        {/* Closing CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05] tracking-tight">
            {TRAINING.closing.heading}
          </h2>
          <p className="text-muted text-base sm:text-lg mt-5 leading-relaxed">
            {TRAINING.closing.subheading}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn mt-8 inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-8 py-4 rounded-full shadow-xl shadow-primary/30"
          >
            {TRAINING.closing.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-muted text-sm mt-6">
            Prefer to call or email? <a href={`tel:${SETTINGS.contact.phoneIntl}`} className="text-primary-dark underline underline-offset-2 hover:text-primary">{SETTINGS.contact.phone}</a> ·{' '}
            <a href={`mailto:${SETTINGS.contact.email}`} className="text-primary-dark underline underline-offset-2 hover:text-primary">{SETTINGS.contact.email}</a>
          </p>
        </section>
      </main>
    </div>
  )
}
