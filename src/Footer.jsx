import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SETTINGS from '../content/settings/index.json'

const FRESHA_URL = SETTINGS.freshaBookingUrl

export default function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/18 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Healthy scalp. Healthy hair.
            <span className="font-serif italic font-normal text-primary-light block">Beautiful confidence.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/45 max-w-md">
              House Of Grace — African hair, scalp wellness and customised treatment therapies in Randburg,
              Johannesburg. Woman-owned, Black-owned, trusted by the community.
            </p>
            <a
              href={FRESHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
                <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
              </span>
              <span className="font-display font-medium text-lg">House Of Grace</span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Rooted in Africa. Inspired by nature. Driven by healthy hair. Scalp analysis, customised treatment
              therapies, and protective styling that protects.
            </p>
            <a
              href={SETTINGS.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-white/25 hover:text-primary-light transition mt-6 block"
            >
              {SETTINGS.contact.address}
            </a>
            <div className="flex items-center gap-3 mt-6">
              <a href={SETTINGS.social.facebook || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-200">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white/70" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href={SETTINGS.social.instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-200">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white/70" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href={SETTINGS.social.tiktok || '#'} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-200">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white/70" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.78a8.18 8.18 0 004.79 1.52V6.83a4.85 4.85 0 01-1.02-.14z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">Specialties</p>
            <ul className="space-y-2.5">
              {SETTINGS.specialties.slice(0, 5).map((title) => (
                <li key={title}>
                  <a href="/#specialties" className="text-white/60 hover:text-primary-light transition text-sm">{title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><a href="/#process" className="text-white/60 hover:text-primary-light transition text-sm">Our Process</a></li>
              <li><a href="/#values" className="text-white/60 hover:text-primary-light transition text-sm">Our Numbers</a></li>
              <li><a href="/#services" className="text-white/60 hover:text-primary-light transition text-sm">Treatments</a></li>
              <li><a href="/#products" className="text-white/60 hover:text-primary-light transition text-sm">Grace Naturals</a></li>
              <li><Link to="/nails" className="text-white/60 hover:text-primary-light transition text-sm">Nail Tech</Link></li>
              <li><Link to="/massage" className="text-white/60 hover:text-primary-light transition text-sm">Massage</Link></li>
              <li><Link to="/training" className="text-white/60 hover:text-primary-light transition text-sm">In-Salon Training</Link></li>
              <li><a href="/#contact" className="text-white/60 hover:text-primary-light transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">Get in Touch</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${SETTINGS.contact.phoneIntl}`} className="text-white/60 hover:text-primary-light transition text-sm">{SETTINGS.contact.phone}</a>
              </li>
              <li>
                <a
                  href={SETTINGS.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-primary-light transition text-sm"
                >
                  {SETTINGS.contact.address}
                </a>
              </li>
              {SETTINGS.hours.map((h) => (
                <li key={h.days} className="text-white/60 text-sm">{h.days} · {h.time}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              Salon Open · Booking Available
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/60 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary-light transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-light transition">Terms of Service</Link>
            <span>© 2026 House Of Grace</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
