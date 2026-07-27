import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORY_COLOR } from '../lib/blog'
import { usePageMeta } from '../usePageMeta'

export default function BlogIndex() {
  usePageMeta({
    title: 'Hair & Scalp Care Articles | House Of Grace Beauty Salon',
    description: 'Specialist advice on hair health, scalp care and growth from Grace Omoruan — deep conditioning, porosity, protective styles, hair loss and more.',
    path: '/blog',
    image: '/og-image.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'House Of Grace — Hair & Scalp Care Articles',
      url: 'https://houseofgracebeauty.co.za/blog',
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://houseofgracebeauty.co.za/blog/${p.slug}`,
      })),
    },
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
        <div className="max-w-2xl mb-12 sm:mb-16 pt-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Expert insights</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Hair wisdom,
            <span className="block font-serif italic font-normal text-primary-dark mt-1">straight from the chair.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed max-w-xl">
            Specialist advice on hair health, growth, and care — written by Grace Omoruan with over a decade of hands-on experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-surface border border-divider rounded-5xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:border-primary/25 transition-all duration-500"
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${BLOG_CATEGORY_COLOR[post.category] || 'bg-primary/10 text-primary-dark'}`}>
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{post.readTime}</span>
                </div>

                <h2 className="font-display font-semibold text-lg sm:text-xl text-ink leading-snug mb-3 group-hover:text-primary-dark transition-colors">
                  {post.title}
                </h2>
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
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{post.date}</p>
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
      </main>
    </div>
  )
}
