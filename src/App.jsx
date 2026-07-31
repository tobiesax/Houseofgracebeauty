import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Scissors,
  Sparkles,
  Gem,
  Leaf,
  Heart,
  SprayCan,
  Menu,
  X,
  Upload,
  Bot,
  ScanSearch,
  Droplet,
  Sprout,
  Sunrise,
  Droplets,
  Dumbbell,
  Flame,
  Feather,
  Wind,
  Waves,
} from 'lucide-react'

import REVIEW_DATA from './data/reviews.json'
import SETTINGS from '../content/settings/index.json'
import { BLOG_POSTS, BLOG_CATEGORY_COLOR } from './lib/blog'
import { SERVICES_FULL, SERVICE_CATEGORIES } from './lib/services'
import { PRODUCTS } from './lib/products'

// Services store their icon as a string (CMS-editable); this resolves it
// back to the actual lucide-react component at render time. Each Treatment
// service got its own distinct icon (was 2 icons reused across 12 items).
const SERVICE_ICONS = {
  Scissors, Sparkles, Gem, Leaf, Heart, SprayCan, ShieldCheck, Award,
  ScanSearch, Droplet, Sprout, Sunrise, Droplets, Dumbbell, Flame, Feather, Wind, Waves,
}

// Every "Book Now" CTA hands off to Fresha — she keeps her existing booking
// workflow (calendar, deposits, reminders); the site's job is everything
// before that click. Editable by Grace via the CMS at content/settings.
const FRESHA_URL = SETTINGS.freshaBookingUrl

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden">
              <img
                src="/logo-mark.png"
                alt=""
                className={`h-full w-full object-contain transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`}
              />
              <span className="absolute inset-0 rounded-full ring-1 ring-primary/20 group-hover:ring-primary/50 transition" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className={`font-display font-semibold tracking-tight text-base ${scrolled ? 'text-primary-dark' : 'text-white'} transition-colors`}>
                House Of Grace
              </span>
              <span className={`font-body font-normal text-[11px] tracking-wide text-center ${scrolled ? 'text-primary-dark/70' : 'text-white/70'} transition-colors`}>
                Beauty Salon
              </span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const cls = `text-sm font-medium tracking-tight lift-on-hover ${
                scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
              } transition-colors`
              return link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} className={cls}>{link.label}</a>
              ) : (
                <Link key={link.href} to={link.href} className={cls}>{link.label}</Link>
              )
            })}
          </div>

          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/30"
          >
            Book Now
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-semibold text-xl text-ink">House Of Grace</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const cls = "font-display text-3xl font-medium text-ink py-3 border-b border-divider"
              return link.href.startsWith('#') ? (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={cls}>{link.label}</a>
              ) : (
                <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={cls}>{link.label}</Link>
              )
            })}
          </div>
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-medium w-full"
          >
            Book Now
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function subscribeToMotionPreference(onChange) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const getAllowsMotion = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Hero() {
  const heroRef = useRef(null)
  const allowMotion = useSyncExternalStore(subscribeToMotionPreference, getAllowsMotion, () => true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8, stagger: 0.12 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {allowMotion ? (
          <video
            src="/hero-video.mp4"
            poster="/hero-video-poster.jpg"
            aria-label="Client receiving a scalp treatment at House Of Grace"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/hero-video-poster.jpg"
            alt="Client receiving a scalp treatment at House Of Grace"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-deep/90 via-deep/55 to-primary-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
      </div>

      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[45%] right-[10%] h-1.5 w-1.5 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[35%] right-[28%] h-1 w-1 rounded-full bg-primary-light/80 animate-float" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-[60%] right-[22%] h-1 w-1 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-5xl">
          <p className="hero-meta flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
            <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_3px_rgba(250,204,21,0.75)]" />
            Blackheath, Johannesburg
          </p>
          <h1 className="font-display font-semibold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-6xl md:text-7xl">
              Your Journey To Healthy Hair
            </span>
            <span
              className="hero-line-2 block font-serif italic font-normal text-yellow-400 text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2"
              style={{ lineHeight: '0.92' }}
            >
              starts here.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/70 text-base sm:text-lg mt-8 leading-relaxed">
            Specialists in African braids, African hair, scalp wellness, hair growth plans, and customised treatment.
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={FRESHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-7 py-4 rounded-full shadow-2xl shadow-primary/40"
            >
              Book Your Scalp Analysis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`tel:${SETTINGS.contact.phoneIntl}`}
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full"
            >
              <Phone className="h-4 w-4" />
              {SETTINGS.contact.phone}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Specialties — scope strip only (no intro copy, no ledger)
---------------------------------------------------------------- */
function Specialties() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="specialties" ref={ref} className="relative py-10 sm:py-14 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 h-64 w-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 text-center transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Start with a scalp analysis
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#process"
            className="lift-on-hover inline-flex items-center gap-2 border border-divider text-ink font-medium px-7 py-3.5 rounded-full hover:border-primary/40 transition-colors"
          >
            See how it works
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Meet The CEO
---------------------------------------------------------------- */
function MeetCEO() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 overflow-hidden bg-background">
      {/* Soft background blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo */}
          <div
            className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-5xl border border-primary/20" />
              <div className="absolute -inset-8 rounded-6xl border border-primary/8" />
              <div className="relative rounded-4xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[4/5]">
                <img
                  src="/grace-ceo.webp"
                  alt="CEO of House Of Grace"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle gradient at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />
              </div>
              {/* Floating name badge */}
              <div className="absolute -bottom-5 left-6 right-6 bg-white/90 backdrop-blur-md rounded-3xl px-6 py-4 shadow-xl border border-divider flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-ink text-lg leading-tight">Grace Omoruan</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mt-0.5">Founder & Hair Consultant</p>
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div
            className={`transition-all duration-1000 ease-out delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary-dark">╱ Meet your hair consultant</span>

            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Treat the root,
              <span className="block font-serif italic font-normal text-primary-dark mt-1">and the rest follows.</span>
            </h2>

            <div className="mt-8 space-y-5 text-muted text-base sm:text-[17px] leading-relaxed">
              <p>
                My journey taught me that no two heads of hair are the same. I watched people copy hairstyles that
                weren't suitable for their own hair density, leading to unnecessary breakage, thinning, and
                disappointment. That inspired me to develop House Of Grace Beauty differently.
              </p>
              <p>
                Over the years, I created and refined 22 specialised botanical treatments, together with my Grace
                Naturals products, to help different scalp conditions and hair needs. Every client receives care
                that's tailored to their unique hair — not based on trends, but on what their hair truly needs.
              </p>
              <p>
                Our goal is simple: healthy hair first, beautiful styling second — then we can follow trends. Whether
                you're struggling with breakage, thinning edges, dryness, dandruff, or simply want stronger, healthier
                hair, we're committed to helping your natural hair thrive while giving you styles you'll love.
              </p>
            </div>

            <blockquote className="mt-8 pl-5 border-l-2 border-primary">
              <p className="font-serif italic text-xl sm:text-2xl text-ink leading-snug">
                "Beautiful hair isn't something we apply. It's something we grow — from a healthy scalp up."
              </p>
              <cite className="mt-3 block font-mono text-[10px] uppercase tracking-widest text-primary-dark not-italic">
                — Grace Omoruan, Founder & Hair Consultant
              </cite>
            </blockquote>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={FRESHA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3.5 rounded-full shadow-lg shadow-primary/30"
              >
                Book your consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="lift-on-hover inline-flex items-center gap-2 border border-divider text-ink font-medium px-6 py-3.5 rounded-full hover:border-primary/40 transition-colors"
              >
                View our treatments
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const sectionRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-image', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
      gsap.from('.portfolio-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Proof first (before/afters), then the work itself, then styling as the payoff.
  const portfolio = [
    { id: 1,  src: '/result-scalp-detox.jpg',        kind: 'Before / After', category: 'Scalp Detox',            alt: 'Before and after a scalp detox treatment clearing heavy flaking' },
    { id: 9,  src: '/result-hairline-recovery.jpg',  kind: 'Before / After', category: 'Scalp Recovery',         alt: 'Before and after treatment for a stressed, thinning hairline' },
    { id: 5,  src: '/treatment-basin-rinse.jpg',     kind: 'In the chair',   category: 'Treatment Wash',         alt: 'Treatment being rinsed out at the salon basin' },
    { id: 7,  src: '/home-care-botanical.jpg',       kind: 'At home',        category: 'Home Care Ritual',       alt: 'Client applying a botanical scalp oil at home' },
    { id: 10, src: '/result-silk-press.jpg',         kind: 'The payoff',     category: 'Sew In',                 alt: 'Finished sew-in weave install' },
    { id: 11, src: '/result-kids-braids.jpg',        kind: 'The payoff',     category: 'Kids Braids',            alt: 'Finished kids braided style, top view' },
    { id: 12, src: '/result-braided-updo.jpg',       kind: 'The payoff',     category: 'Braided Updo',           alt: 'Finished braided updo with curled ponytail' },
    { id: 13, src: '/result-braids-pink-accent.jpg', kind: 'The payoff',     category: 'Colour Braids',           alt: 'Finished box braids with pink colour accents' },
  ]

  return (
    <section ref={sectionRef} className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="portfolio-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Our work</span>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Healthy hair,
            <span className="block font-serif italic font-normal text-primary-dark mt-1">
              you can see it.
            </span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-lg">
            Shine, thickness, retained length, edges that came back — every style here sits on a scalp we treated first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="portfolio-image group relative h-64 rounded-4xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start">
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary-light mb-2">{item.kind}</p>
                  <p className="font-display font-medium text-white">{item.category}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Ready to see what your hair is capable of? Book a scalp analysis and we'll build your plan from there.
          </p>
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Book Your Appointment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-deep/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl shadow-primary/20"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark">{selectedImage.kind}</p>
            <p className="font-display font-medium text-ink">{selectedImage.category}</p>
          </div>
        </div>
      )}
    </section>
  )
}



/* ----------------------------------------------------------------
   CountUp — animated counter
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — Three trust numbers
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01', title: 'Diagnosis first',
      target: 100, suffix: '%', label: 'of treatment plans start with a scalp analysis',
      desc: 'Nothing is recommended before we\'ve actually looked. Your plan comes from what we find on your scalp — never from what\'s easiest to sell.',
    },
    {
      n: '02', title: 'Treatment depth',
      target: 22, suffix: '+', label: 'targeted therapies',
      desc: 'Scalp detox, follicle fuel, edge revival, moisture lock, strength fusion and more — a specific therapy for every concern we treat.',
    },
    {
      n: '03', title: 'Trusted care',
      target: 4, suffix: '.8', label: 'Google rating (9 reviews)',
      desc: 'Healthier scalps, less breakage, and length that finally stays on the head.',
    },
  ]

  return (
    <section id="values" ref={ref} className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">╱ Our numbers</span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              The proof behind
              <span className="block font-serif italic font-normal text-primary-dark">the grace.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three numbers behind our treatment-based approach — not marketing claims, just how we work every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>
              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-semibold text-[5rem] sm:text-[7rem] md:text-[8rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1]
        if (!nextCard) return
        // Recede only while the next card is actually sliding in over it, so
        // each card stays fully sharp for the whole time it's the one being read.
        gsap.to(card, {
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top+=100',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Scalp Analysis',
      tagline: 'We look before we treat.',
      text: 'A professional scalp and strand assessment. We identify what is actually happening at the root — congestion, inflammation, traction damage, porosity, breakage patterns — and talk you through exactly what we find.',
      image: '/analysis-scalp-exam.jpg',
      alt: 'Gloved stylist sectioning hair to examine the scalp',
      meta: 'Step 1 / Diagnose',
    },
    {
      num: '02',
      title: 'Customised Treatment',
      tagline: 'Your plan, not a template.',
      text: 'Based on your analysis we select the right therapy — scalp detox, follicle fuel, edge revival, moisture lock, strength fusion. Natural, science-backed formulations, applied with technique specific to African hair.',
      video: '/treatment-application.mp4',
      poster: '/treatment-application.jpg',
      alt: 'Treatment being combed through the scalp',
      meta: 'Step 2 / Restore',
    },
    {
      num: '03',
      title: 'Home Ritual & Review',
      tagline: 'The results have to last.',
      text: 'You leave with a written routine and the Grace Naturals products to follow it. We set a review point so we can measure real progress — growth, thickness, reduced shedding — and adjust your plan as your hair changes.',
      image: '/home-ritual-wash.jpg',
      alt: 'Home treatment product applied through natural hair as part of the aftercare routine',
      meta: 'Step 3 / Maintain',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Our Treatment Philosophy</span>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Rooted in African Wisdom.
          <span className="block font-serif italic font-normal text-primary-dark">Refined Through Experience.</span>
        </h2>
        <div className="text-muted text-lg mt-6 leading-relaxed max-w-xl space-y-4">
          <p>
            For over a decade, House of Grace has been dedicated to unlocking the power of Africa's finest seeds,
            botanicals, and time-honoured hair care traditions. Every treatment we offer is the result of years of
            research, refinement, practical experience, and countless success stories.
          </p>
          <p>
            We have mastered the art of understanding different hair textures, scalp conditions, and hair densities,
            allowing us to carefully match each client with the treatment their hair truly needs. Our seed-based
            treatments are designed to restore, repair, and revive hair from the roots, while supporting healthy hair
            growth and addressing a wide range of hair and scalp concerns.
          </p>
          <p>
            We believe every crown deserves personalised care. That is why our treatments combine the richness of
            African wisdom with years of proven expertise to deliver healthy, resilient, and thriving hair naturally.
          </p>
          <p className="font-display font-medium text-ink">
            Nature perfected. Results proven. African wisdom you can trust.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:h-[72vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Grace Protocol
                  </span>
                </div>
                <div className="my-6">
                  <span className="font-display font-semibold text-5xl sm:text-7xl leading-none text-primary/12 -mb-2 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>
                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                {step.video ? (
                  <video
                    src={step.video}
                    poster={step.poster}
                    aria-label={step.alt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Step {step.num}</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/60">
                  {step.num} / House Of Grace
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services Grid — 9 detailed tiles with pricing
---------------------------------------------------------------- */
function ServicesGrid({ cartItems, addToCart }) {
  const ref = useRef(null)
  const [showAll, setShowAll] = useState(false)
  const [category, setCategory] = useState('Treatment')
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const selectCategory = (next) => {
    setCategory(next)
    setShowAll(false)
  }

  const inCategory = SERVICES_FULL.filter((svc) => svc.category === category)
  const visibleServices = showAll ? inCategory : inCategory.slice(0, 6)
  const hiddenCount = inCategory.length - visibleServices.length

  return (
    <section id="services" ref={ref} className="relative py-8 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/18 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/12 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Treatments & services</span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              Treatments first,
              <span className="block font-serif italic font-normal text-primary-light">styling second.</span>
            </h2>
          </div>
          <p className="text-white/55 max-w-md text-base leading-relaxed">
            Start with the therapy your scalp analysis calls for. Then choose a protective style that keeps the
            progress you've made.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                category === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                  : 'bg-white/5 text-white/70 border-white/15 hover:border-primary/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-px bg-white/8 rounded-4xl overflow-hidden">
          {visibleServices.map((svc) => {
            const Icon = SERVICE_ICONS[svc.icon] || Scissors
            const isInCart = cartItems.some((item) => item.id === svc.itemId)
            return (
              <div key={svc.itemId} className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.03] transition-colors duration-500 relative border border-white/5 hover:border-primary/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary-light group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-primary-light/80 uppercase tracking-widest bg-primary/20 px-2 py-1 rounded-full">
                    {svc.category}
                  </span>
                </div>

                <h3 className="font-display font-medium text-lg sm:text-xl mb-2">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{svc.description}</p>

                <div className="flex items-center gap-4 mb-6 py-3 border-t border-white/10">
                  <div>
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest">Duration</p>
                    <p className="font-display font-semibold text-white mt-1">{svc.duration}</p>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div>
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest">Price</p>
                    <p className="font-display font-semibold text-accent text-lg mt-1">ZAR {svc.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(svc)}
                  className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isInCart
                      ? 'bg-primary text-white shadow-lg shadow-primary/40'
                      : 'bg-white/10 text-white hover:bg-primary/60 border border-white/20 hover:border-primary'
                  }`}
                >
                  {isInCart ? '✓ In Booking' : 'Add to Booking'}
                </button>
              </div>
            )
          })}
        </div>

        {inCategory.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="magnetic-btn inline-flex items-center gap-2 border border-primary-light/40 text-primary-light hover:bg-primary hover:text-white px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300"
            >
              {showAll ? 'Show less' : `View all ${category} (${hiddenCount} more)`}
            </button>
          </div>
        )}

        <p className="text-center text-white/45 text-sm mt-10 max-w-2xl mx-auto leading-relaxed">
          Not sure which treatment you need? That's what the scalp analysis is for — book it first and we'll tell you.
        </p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Google Reviews
---------------------------------------------------------------- */
function GoogleReviews() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { reviews, rating, totalReviews, profileUrl } = REVIEW_DATA

  return (
    <section ref={ref} className="relative py-6 sm:py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Client love</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            {rating}/5 Google Rating · Real Reviews
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed max-w-xl mx-auto">
            The words that come up most often? <span className="text-ink">She cares about your hair.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div
                className="flex items-center gap-1 mb-3"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <span
                    key={s}
                    aria-hidden="true"
                    className={`text-lg ${s < Math.round(review.rating) ? 'text-primary' : 'text-divider'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed mb-4">{review.text}</p>
              <div>
                <p className="font-display font-medium text-sm text-ink">{review.name}</p>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Platform terms require attribution when showing Places data */}
        <p className="text-center text-muted text-xs mt-6">
          Reviews from Google · {totalReviews} ratings
          {profileUrl && (
            <>
              {' · '}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-dark underline underline-offset-2 hover:text-primary transition"
              >
                See all on Google
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Products
---------------------------------------------------------------- */

// Crossfades through `images` on a continuous loop when there's more than
// one; otherwise just renders the single photo. Layers are stacked with
// absolute positioning so the fade has no layout shift.
function ProductImage({ images, alt, className }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length)
    }, 2800)
    return () => clearInterval(id)
  }, [images])

  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`${className} absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </>
  )
}

function Products({ addToCart, cartItems }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={ref} className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-16 h-56 w-56 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Grace Naturals</span>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            The treatment
            <span className="block font-serif italic font-normal text-primary-dark mt-1">continues at home.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed max-w-xl">
            One hour in the chair every few weeks cannot outwork what happens the other 29 days. Grace Naturals is our
            own botanical range — carefully selected ingredients that carry your treatment plan through to your next visit.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((product, i) => (
            <article
              key={product.itemId}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`group bg-surface border border-divider rounded-5xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Product image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#F7F1FB] to-[#EFE5F5] aspect-square">
                <ProductImage
                  images={product.gallery?.length > 1 ? product.gallery : [product.image]}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-primary text-white px-3 py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              </div>

              {/* Product info */}
              <div className="p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-1">
                  {product.tagline}
                </p>
                <h3 className="font-display font-semibold text-xl text-ink leading-tight mb-3">
                  {product.name}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-5 pt-4 border-t border-divider">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-1.5">Prescribed for</p>
                  <p className="text-sm text-primary-dark">{product.treats}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="font-display font-semibold text-2xl text-ink">
                    R{product.price}
                  </span>
                  {(() => {
                    const inCart = cartItems && cartItems.some((item) => item.id === product.itemId)
                    return (
                      <button
                        onClick={() => addToCart && addToCart(product)}
                        className={`magnetic-btn inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full shadow-md transition-all duration-300 ${
                          inCart
                            ? 'bg-emerald-500 text-white shadow-emerald-200'
                            : 'bg-primary text-white shadow-primary/25'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            Add to Cart
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    )
                  })()}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Blog — homepage teaser. Full reading experience lives at /blog and
   /blog/:slug, each with its own URL, title, meta and structured data.
---------------------------------------------------------------- */
function Blog() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featured = BLOG_POSTS.slice(0, 3)

  return (
    <section id="blog" ref={ref} className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/6 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Expert insights</span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Hair wisdom,
              <span className="block font-serif italic font-normal text-primary-dark mt-1">straight from the chair.</span>
            </h2>
            <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed max-w-xl">
              Specialist advice on hair health, growth, and care — written by Grace Omoruan with over a decade of hands-on experience.
            </p>
          </div>
          <Link
            to="/blog"
            className="lift-on-hover inline-flex items-center gap-2 border border-divider text-ink font-medium px-6 py-3 rounded-full hover:border-primary/40 transition-colors flex-shrink-0"
          >
            View all articles
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}
              className={`group flex flex-col bg-surface border border-divider rounded-5xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:border-primary/25 transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${BLOG_CATEGORY_COLOR[post.category] || 'bg-primary/10 text-primary-dark'}`}>
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{post.readTime}</span>
                </div>

                <h3 className="font-display font-semibold text-lg sm:text-xl text-ink leading-snug mb-3 group-hover:text-primary-dark transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-auto p-6 sm:p-7 pt-5 flex items-center justify-between border-t border-divider/60">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                    <img src="/grace-ceo.webp" alt="" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-ink text-sm leading-tight">Grace Omoruan</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Professional Hair Consultant</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-primary-dark font-mono text-[10px] uppercase tracking-widest">
                  Read
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: Leaf,
      title: 'Natural, Science-Backed',
      text: 'Carefully selected botanical ingredients paired with African-inspired hair care traditions — nothing harsh, nothing guessed.',
    },
    {
      Icon: ShieldCheck,
      title: 'Diagnosis Before Treatment',
      text: 'A professional scalp analysis comes first, every time. You will always know what we found and why we recommended it.',
    },
    {
      Icon: Award,
      title: 'African Hair Specialists',
      text: 'We work with African hair and scalps exclusively — texture, porosity, shrinkage and traction damage are our daily practice, not an exception.',
    },
  ]

  return (
    <section ref={ref} className="relative py-6 sm:py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Why choose us</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            A hair clinic
            <span className="font-serif italic font-normal text-primary-dark"> with a salon's warmth.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-medium text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Start your healthy hair journey
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

function ContactForm({ cartItems, appointmentDate, appointmentTime }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)

  const getDefaultMessage = () => {
    let msg = ''
    if (cartItems.length > 0) {
      msg = `I would like to book the following services:\n\n`
      cartItems.forEach((item) => {
        msg += `• ${item.title} (${item.duration}) - ZAR ${item.price}\n`
      })
      msg += `\nTotal: ZAR ${cartItems.reduce((sum, item) => sum + item.price, 0)}\n`
      if (appointmentDate || appointmentTime) {
        msg += `\nPreferred appointment: `
        if (appointmentDate) msg += appointmentDate
        if (appointmentTime) msg += ` at ${appointmentTime}`
        msg += '\n'
      }
      msg += '\nAdditional questions or details:\n'
    }
    return msg
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    const lines = [
      'New enquiry from the website:',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.area && `Area: ${form.area}`,
      '',
      form.message,
    ].filter((line) => line !== false && line !== undefined)
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${SETTINGS.contact.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')

    setStatus('sent')
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Contact</span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Let's find
              <span className="block font-serif italic font-normal text-primary-dark">your starting point.</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Tell us what your hair is doing — the shedding, the flaking, the edges, the breakage. We'll book you in
              for a scalp analysis and take it from there.
            </p>

            {cartItems.length > 0 && (
              <div className="mt-8 p-4 rounded-3xl bg-primary/5 border border-primary/15">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-3">Booking Summary</p>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted">{item.title}</span>
                      <span className="font-display font-medium text-ink">ZAR {item.price}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-primary/20 flex justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary-dark">Total</span>
                    <span className="font-display font-semibold text-primary text-lg">ZAR {cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  {(appointmentDate || appointmentTime) && (
                    <div className="pt-2 border-t border-primary/20 text-sm">
                      <p className="text-muted text-xs uppercase tracking-widest mb-1">Preferred Date/Time</p>
                      <p className="font-display font-medium text-ink">{appointmentDate} {appointmentTime && `at ${appointmentTime}`}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-10 space-y-4">
              <a href={`tel:${SETTINGS.contact.phoneIntl}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Call us</span>
                  <span className="font-display font-medium text-ink text-lg">Ask for Grace</span>
                </span>
              </a>

              <a href={`mailto:${SETTINGS.contact.email}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Email us</span>
                  <span className="font-display font-medium text-ink text-lg">{SETTINGS.contact.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Location</span>
                  <span className="font-display font-medium text-ink text-lg">{SETTINGS.contact.address}</span>
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-1">Hours</p>
              {SETTINGS.hours.map((h) => (
                <p key={h.days} className="text-sm text-muted leading-relaxed mt-1 first:mt-0">{h.days} · {h.time}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Email Address" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label="Area / Suburb" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">Your Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={6}
                      placeholder={cartItems.length > 0 ? getDefaultMessage() : 'Tell us about your hair — your texture, your main concern (hair loss, thinning edges, dandruff, dryness, breakage), and what you would like to achieve...'}
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                    {cartItems.length > 0 && form.message === '' && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, message: getDefaultMessage() })}
                        className="mt-2 text-xs text-primary hover:text-primary-dark transition font-mono uppercase tracking-widest"
                      >
                        Auto-fill with booking details
                      </button>
                    )}
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-primary', '!bg-primary/5') }}
                    onDragLeave={() => dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')}
                    onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-primary', '!bg-primary/5'); handleFiles(e.dataTransfer.files) }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-medium text-ink text-sm">Attach inspiration photos</p>
                      <p className="text-xs text-muted mt-1">Click or drag images here (max 5 photos) — you'll attach these directly in WhatsApp once it opens</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '...' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">This opens WhatsApp with your message ready to send. Fields with * are required.</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-medium text-2xl text-ink mb-3">Your journey starts now</h3>
                  <p className="text-muted max-w-md mx-auto">WhatsApp should have opened in a new tab with your message ready — hit send there (and attach any photos) to reach us.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
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
              House Of Grace — African hair, scalp wellness and customised treatment therapies in Blackheath,
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
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mt-6">
              {SETTINGS.contact.address}
            </p>
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
                  <a href="#specialties" className="text-white/60 hover:text-primary-light transition text-sm">{title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><a href="#process" className="text-white/60 hover:text-primary-light transition text-sm">Our Process</a></li>
              <li><a href="#values" className="text-white/60 hover:text-primary-light transition text-sm">Our Numbers</a></li>
              <li><a href="#services" className="text-white/60 hover:text-primary-light transition text-sm">Treatments</a></li>
              <li><a href="#products" className="text-white/60 hover:text-primary-light transition text-sm">Grace Naturals</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-primary-light transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">Get in Touch</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${SETTINGS.contact.phoneIntl}`} className="text-white/60 hover:text-primary-light transition text-sm">{SETTINGS.contact.phone}</a>
              </li>
              <li className="text-white/55 text-sm">{SETTINGS.contact.address}</li>
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

/* ----------------------------------------------------------------
   Booking Cart — Floating Cart Sidebar
---------------------------------------------------------------- */
function BookingCart({ cartItems, removeFromCart, clearCart, totalPrice, appointmentDate, setAppointmentDate, appointmentTime, setAppointmentTime, handleBookNow, showCart, setShowCart }) {
  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium text-white ${
          cartItems.length > 0 ? 'bg-primary hover:scale-110' : 'bg-muted opacity-50 cursor-not-allowed'
        }`}
      >
        <span className="text-xl">🛒</span>
        {cartItems.length > 0 && <span className="text-xs font-bold">{cartItems.length}</span>}
      </button>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-surface border-l border-divider shadow-2xl shadow-primary/10 z-50 transition-transform duration-300 flex flex-col overflow-hidden ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-divider">
          <h2 className="font-display font-semibold text-2xl text-ink">Your Booking</h2>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 rounded-full hover:bg-divider/40 transition"
          >
            <X className="h-5 w-5 text-ink" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted text-sm">No services selected yet. Add services to get started.</p>
            </div>
          ) : (
            <>
              {/* Services List */}
              <div className="p-6 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-background rounded-2xl p-4 flex items-start justify-between group hover:border-primary/30 border border-divider transition">
                    <div className="flex-1">
                      <p className="font-display font-medium text-ink text-sm">{item.title}</p>
                      <p className="text-muted text-xs mt-1">{item.duration}</p>
                      <p className="font-display font-semibold text-primary mt-2">ZAR {item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg hover:bg-divider/60 transition opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 text-muted" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Appointment Section */}
              <div className="px-6 py-4 border-t border-divider space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-background border border-divider rounded-lg px-3 py-2 text-ink focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full bg-background border border-divider rounded-lg px-3 py-2 text-ink focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 my-4 h-px bg-divider" />

              {/* Summary */}
              <div className="px-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted text-sm">Subtotal ({cartItems.length} service{cartItems.length !== 1 ? 's' : ''})</span>
                  <span className="font-display font-medium text-ink">ZAR {totalPrice}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-divider space-y-3">
          {cartItems.length > 0 && (
            <>
              <div className="flex items-center justify-between bg-primary/5 rounded-2xl px-4 py-3 border border-primary/15">
                <span className="font-mono text-xs uppercase tracking-widest text-primary-dark">Total</span>
                <span className="font-display font-semibold text-xl text-primary">ZAR {totalPrice}</span>
              </div>
              <button
                onClick={() => {
                  handleBookNow()
                  setShowCart(false)
                }}
                className="w-full magnetic-btn bg-primary text-white font-medium py-3.5 rounded-full shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50"
              >
                Proceed to Booking
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 text-muted text-sm hover:text-ink transition font-medium"
              >
                Clear Cart
              </button>
            </>
          )}
          {cartItems.length === 0 && (
            <button
              onClick={() => setShowCart(false)}
              className="w-full py-3.5 rounded-full border border-divider text-ink hover:bg-divider/30 transition font-medium"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowCart(false)}
        />
      )}
    </>
  )
}


/* ----------------------------------------------------------------
   AI Chat Assistant (built-in FAQ bot)
---------------------------------------------------------------- */
const QUICK_REPLIES = [
  'What is a scalp analysis?',
  'I have hair loss',
  'My edges are thinning',
  'What treatments do you offer?',
  'What are your prices?',
  'How do I book?',
  'Where are you located?',
]

const FAQ = [
  {
    keywords: ['hello', 'hi', 'hey', 'howzit', 'good morning', 'good afternoon', 'good evening'],
    answer: "Hello! Welcome to House Of Grace 💕 We're a treatment-based salon — African hair, scalp wellness and customised therapies. Tell me what your hair is doing (shedding, flaking, breakage, thinning edges) and I'll point you in the right direction!",
  },
  {
    keywords: ['thank', 'thanks', 'cheers', 'appreciate', 'great', 'perfect'],
    answer: `You're welcome! 💕 Is there anything else I can help you with? You can also WhatsApp us directly on ${SETTINGS.contact.phone}.`,
  },
  {
    keywords: ['scalp analysis', 'analysis', 'assessment', 'diagnos', 'first visit', 'what happens'],
    answer: "Our Scalp Analysis & Consultation (ZAR 150, 1 hour) is where every journey starts. Grace assesses your scalp and strands — build-up, inflammation, porosity, breakage patterns, traction damage — then recommends the specific treatment your hair actually needs. No guesswork, no upselling. Book it first and everything else follows from it.",
  },
  {
    keywords: ['hair loss', 'losing hair', 'shedding', 'thinning', 'thin edges', 'edges', 'bald', 'traction', 'alopecia', 'receding', 'patches'],
    answer: "We treat this often 💕 Hair loss and thinning edges are usually traction, tension or scalp health related — all treatable. The path:\n1️⃣ Scalp Analysis & Consultation — ZAR 150\n2️⃣ Edge Revival Treatment — ZAR 350 (thinning edges & fragile hairlines)\n3️⃣ Follicle Fuel — ZAR 350 (wakes dormant follicles)\nStart with the analysis so we treat the cause, not the symptom.",
  },
  {
    keywords: ['dandruff', 'flake', 'flaking', 'itchy', 'itch', 'irritat', 'build-up', 'buildup', 'build up', 'oily scalp', 'sore scalp', 'detox'],
    answer: "That's a scalp health issue, and it responds well to treatment:\n• Scalp Clarity Treatment — ZAR 400 (detox & exfoliation for dandruff, dryness, irritation)\n• Scalp Soother — ZAR 350 (antiseptic, calms and lets the scalp breathe)\n• Tension Tamer — ZAR 350 (soreness after tight styles)\nWe'd confirm which one with a Scalp Analysis first — ZAR 150.",
  },
  {
    keywords: ['breakage', 'breaking', 'dry hair', 'dryness', 'brittle', 'split', 'grow', 'growth', 'longer', 'length', 'moisture', 'damaged'],
    answer: "Growth is rarely the problem — retention is. Breakage cancels out the growth you already have. Our therapies for this:\n• Moisture Lock — ZAR 350\n• HoneyMelt Treatment — ZAR 380 (rehydrates, improves elasticity)\n• Strength Fusion — ZAR 350 (rebuilds structure)\n• Follicle Fuel — ZAR 350 (growth therapy)\nPair with Grace Naturals at home. Start with a Scalp Analysis — ZAR 150.",
  },
  {
    keywords: ['treatment', 'therapy', 'therapies', 'honeymelt', 'edge revival', 'follicle', 'strength fusion', 'moisture lock', 'shrink', 'shine', 'clarity'],
    answer: "All treatments are 1-hour sessions, ZAR 150–400:\n• Consultation & Scalp Analysis — ZAR 150 (start here)\n• Scalp Clarity (detox/dandruff) — ZAR 400\n• HoneyMelt (moisture reset) — ZAR 380\n• Follicle Fuel (growth) — ZAR 350\n• Edge Revival (thinning edges) — ZAR 350\n• Moisture Lock · Strength Fusion · Tension Tamer · Scalp Soother · Shrink Ease — ZAR 350 each",
  },
  {
    keywords: ['service', 'offer', 'do you do', 'what do', 'menu', 'specialt', 'special'],
    answer: 'Our specialties:\n• Scalp Analysis & Consultation\n• Customised Hair & Scalp Treatments\n• Hair Growth Therapy\n• Hair Loss & Edge Restoration\n• Scalp Detox & Exfoliation\n• Moisture & Repair Treatments\n• Protective Styling for Healthy Hair\n• Grace Naturals Hair Care Products\nWe also do Braids, Twists, Weave & Sew-In and Kids services. Ask about any of them 💕',
  },
  {
    keywords: ['price', 'cost', 'how much', 'zar', 'rand', 'charge', 'fee', 'rate'],
    answer: 'Prices range from ZAR 60 (Cornrow Undo) up to ZAR 950 (Yanky Twist). A few highlights:\n• Braids from ZAR 280\n• Twists from ZAR 300\n• Treatments ZAR 150–400\n• Kids from ZAR 120\nCheck the Services section for the full list.',
  },
  {
    keywords: ['book', 'appointment', 'reserve', 'schedule', 'how to book', 'booking'],
    answer: `To book: select services in the Services section → add to booking cart → fill in your preferred date and time in the Contact section. Or WhatsApp us on ${SETTINGS.contact.phone} and we'll sort you out! 💕`,
  },
  {
    keywords: ['location', 'where', 'address', 'johannesburg', 'find you', 'directions', 'based'],
    answer: `We are at ${SETTINGS.contact.address}. Call or WhatsApp ${SETTINGS.contact.phone} if you need directions 💕`,
  },
  {
    keywords: ['hour', 'open', 'close', 'trading', 'when are you', 'time', 'operating'],
    answer: `We are open Monday to Saturday, 7:00 am – 9:00 pm. Closed Sundays. Call or WhatsApp ${SETTINGS.contact.phone} to confirm availability for your slot.`,
  },
  {
    keywords: ['product', 'hairfood', 'hair food', 'hair oil', 'buy', 'shop', 'purchase', 'pores', 'grace naturals', 'home care', 'aftercare'],
    answer: 'Grace Naturals is our own botanical range — it carries your treatment plan through between visits:\n• Grace Hair Growth Hairfood — ZAR 180 (slow growth, dryness, brittleness)\n• Grace Hair Oil — ZAR 180 (moisture loss, frizz, breakage)\n• Pores Awakening Treatment — ZAR 380 (build-up, flaking, dormant follicles)\nAdd them to cart from the Products section 💕',
  },
  {
    keywords: ['pay', 'payment', 'cash', 'card', 'eft', 'deposit', 'method'],
    answer: `We accept cash and EFT. A deposit may be required for certain bookings. Contact us on ${SETTINGS.contact.phone} to confirm.`,
  },
  {
    keywords: ['hairpiece', 'hair piece', 'extension', 'bring', 'own hair', 'include', 'exclude'],
    answer: 'Most braid and twist services exclude hairpieces unless stated. You can bring your own or purchase from us in-salon. WhatsApp us before your appointment and we will advise what you need.',
  },
  {
    keywords: ['braid', 'cornrow', 'fulani', 'boho', 'box braid', 'milan', 'havana', 'tribal', 'goddess', 'straight up', 'straight back', 'french braid', 'bantu'],
    answer: 'We have a huge braids menu — Fulani, Boho, Box Braids, Cornrows, Milano, Havana, Tribal, Goddess, French Braids and more. Prices start from ZAR 60 and go up to ZAR 750. Check the Services section to browse all styles.',
  },
  {
    keywords: ['twist', 'senegalese', 'yanky', 'mini twist', 'kinky twist', 'afro twist'],
    answer: 'Twist services include:\n• Small Twist — ZAR 850\n• Yanky Twist (includes hairpiece) — ZAR 950\n• Senegalese Twist — ZAR 550\n• Medium Kinky Twist — ZAR 550\n• Mini Twist — ZAR 650\n• Afro Twist (Short) — ZAR 450',
  },
  {
    keywords: ['weave', 'sew in', 'crochet', 'razor cut'],
    answer: 'Weave & Sew-In services:\n• Weave — ZAR 450\n• Crochet — ZAR 450\n• Razor Cut — ZAR 450\n• Undo Weave — ZAR 100',
  },
  {
    keywords: ['kid', 'child', 'children', 'little', 'baby', 'kiddies'],
    answer: "We love little ones! Kids services:\n• Kiddies Wash n Blow — ZAR 120\n• Kids Braids — ZAR 380\n• Cornrow for Kids — ZAR 200\n• Kids Kinky Afro (Cornrow & Bun) — ZAR 280\n• Miracle Knots (Kids) — ZAR 300",
  },
  {
    keywords: ['whatsapp', 'contact', 'phone', 'call', 'number', 'reach', 'email', 'message'],
    answer: `You can reach us on:\n📱 WhatsApp / Phone: ${SETTINGS.contact.phone}\nOr fill in the Contact form on the site and we will get back to you shortly 💕`,
  },
  {
    keywords: ['consultation', 'advice', 'recommend', 'suggest', 'best for', 'natural hair', 'not sure', 'which one'],
    answer: `That is exactly what the Consultation & Scalp Analysis is for (ZAR 150, 1 hour). Grace assesses your hair and scalp, then recommends the right treatment and style for you. Book via the Contact section or WhatsApp ${SETTINGS.contact.phone} 💕`,
  },
]

function getBotReply(text) {
  const lower = text.toLowerCase()
  for (const item of FAQ) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.answer
  }
  return `I'm not sure about that one — but our team will know! WhatsApp us on ${SETTINGS.contact.phone} or fill in the Contact form and we'll get back to you quickly 💕`
}

function ChatBot() {
  const [btnVisible, setBtnVisible] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [showQuick, setShowQuick] = useState(false)
  const endRef = useRef(null)
  const previewTimer = useRef(null)
  const chatOpenRef = useRef(false)

  useEffect(() => { chatOpenRef.current = chatOpen }, [chatOpen])

  const flashPreview = () => {
    if (chatOpenRef.current) return
    clearTimeout(previewTimer.current)
    setShowPreview(true)
    previewTimer.current = setTimeout(() => setShowPreview(false), 3500)
  }

  // Button appears after 3s, preview flashes shortly after
  useEffect(() => {
    const t1 = setTimeout(() => setBtnVisible(true), 3000)
    const t2 = setTimeout(flashPreview, 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Re-flash preview each time a new section scrolls into view
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) flashPreview() })
    }, { threshold: 0.4 })
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const openChat = () => {
    setShowPreview(false)
    clearTimeout(previewTimer.current)
    setChatOpen(true)
    if (messages.length > 0) return
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages([{ from: 'bot', text: "Hi! 💕 I'm Grace, your virtual hair consultant." }])
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Tell me what your hair is doing — or ask about treatments, prices and booking.' }])
        setTimeout(() => setShowQuick(true), 400)
      }, 800)
    }, 700)
  }

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setShowQuick(false)
    setMessages((prev) => [...prev, { from: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: 'bot', text: getBotReply(msg) }])
    }, 900)
  }

  if (!btnVisible) return null

  return (
    <>
      {/* Preview bubble — flashes briefly, auto-hides */}
      <div
        className="fixed bottom-60 right-6 z-50 transition-all duration-300 origin-bottom-right"
        style={{
          opacity: showPreview && !chatOpen ? 1 : 0,
          transform: showPreview && !chatOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(8px)',
          pointerEvents: showPreview && !chatOpen ? 'auto' : 'none',
        }}
      >
        <button
          onClick={openChat}
          className="flex items-center gap-2 bg-white border border-divider rounded-xl shadow-lg px-3 py-2 hover:shadow-xl transition-shadow"
        >
          <span className="h-7 w-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="text-left">
            <span className="block font-display font-semibold text-ink text-[11px]">Grace Assistant</span>
            <span className="block text-muted text-[10px]">👋 Need help? Tap to chat</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0 ml-1" />
        </button>
      </div>

      {/* Full chat window */}
      <div
        className="fixed bottom-60 right-6 z-50 w-64 rounded-2xl overflow-hidden shadow-2xl border border-divider flex flex-col bg-surface transition-all duration-300 origin-bottom-right"
        style={{
          maxHeight: '380px',
          opacity: chatOpen ? 1 : 0,
          transform: chatOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(12px)',
          pointerEvents: chatOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div className="bg-primary px-3 py-2.5 flex items-center gap-2 flex-shrink-0">
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-xs">Grace Assistant</p>
            <p className="text-white/80 text-[9px] font-mono">House Of Grace</p>
          </div>
          <span className="ml-auto flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
            <span className="text-white/80 text-[9px] font-mono">Online</span>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2 bg-background" style={{ minHeight: '160px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] px-3 py-1.5 rounded-xl text-[11px] leading-relaxed whitespace-pre-line animate-fade-in ${
                msg.from === 'user'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-white text-ink border border-divider rounded-bl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white border border-divider rounded-xl rounded-bl-sm shadow-sm px-3 py-2 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick replies */}
        {showQuick && (
          <div className="px-2.5 py-1.5 flex flex-wrap gap-1 bg-background border-t border-divider flex-shrink-0">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[9px] bg-primary/10 text-primary-dark border border-primary/20 px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-2.5 py-2 border-t border-divider bg-white flex gap-1.5 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask me anything…"
            className="flex-1 text-[11px] bg-background border border-divider rounded-full px-3 py-1.5 outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={() => send()}
            className="h-7 w-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors flex-shrink-0"
          >
            <ArrowRight className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => { if (chatOpen) setChatOpen(false); else openChat() }}
        className="fixed bottom-44 right-6 z-50 h-12 w-12 rounded-full bg-primary shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        aria-label="Toggle chat assistant"
      >
        {chatOpen
          ? <X className="h-5 w-5 text-white" />
          : <Bot className="h-5 w-5 text-white" />}
      </button>
    </>
  )
}

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [showCart, setShowCart] = useState(false)

  const addToCart = (service) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === service.itemId)
      if (exists) return prev.filter((item) => item.id !== service.itemId)
      return [...prev, { id: service.itemId, title: service.title, price: service.price, duration: service.duration }]
    })
  }

  const removeFromCart = (serviceId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== serviceId))
  }

  const clearCart = () => {
    setCartItems([])
    setAppointmentDate('')
    setAppointmentTime('')
  }

  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + item.price, 0)

  const handleBookNow = () => {
    window.open(FRESHA_URL, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Specialties />
        <MeetCEO />
        <Portfolio />
        <Pillars />
        <Protocol />
        <ServicesGrid cartItems={cartItems} addToCart={addToCart} />
        <BookingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          totalPrice={getTotalPrice()}
          appointmentDate={appointmentDate}
          setAppointmentDate={setAppointmentDate}
          appointmentTime={appointmentTime}
          setAppointmentTime={setAppointmentTime}
          handleBookNow={handleBookNow}
          showCart={showCart}
          setShowCart={setShowCart}
        />
        <Products addToCart={addToCart} cartItems={cartItems} />
        <GoogleReviews />
        <Blog />
        <TrustSignals />
        <ContactForm cartItems={cartItems} appointmentDate={appointmentDate} appointmentTime={appointmentTime} />
      </main>
      <Footer />

      <ChatBot />

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${SETTINGS.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
