import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORY_COLOR, getPostBySlug, toISODate } from '../lib/blog'
import { usePageMeta } from '../usePageMeta'
import SETTINGS from '../../content/settings/index.json'

function NotFound() {
  usePageMeta({
    title: 'Article Not Found | House Of Grace Beauty Salon',
    description: 'This article could not be found.',
    path: '/blog',
    noindex: true,
  })
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-primary-dark mb-4">╱ 404</p>
      <h1 className="font-display font-semibold text-3xl text-ink mb-4">We couldn't find that article</h1>
      <Link to="/blog" className="inline-flex items-center gap-2 text-primary-dark font-medium hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to all articles
      </Link>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  // Same-category posts first, then fill remaining slots from the rest —
  // the two filters are mutually exclusive so this can't double up a post.
  const related = post
    ? [
        ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
        ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
      ].slice(0, 2)
    : []

  usePageMeta(
    post
      ? {
          title: `${post.title} | House Of Grace Beauty Salon`,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          image: '/grace-ceo.webp',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: 'https://houseofgracebeauty.co.za/og-image.jpg',
            datePublished: toISODate(post.date) || undefined,
            author: {
              '@type': 'Person',
              name: 'Grace Omoruan',
              jobTitle: 'Founder & Hair Consultant',
            },
            publisher: {
              '@type': 'Organization',
              name: 'House Of Grace Beauty Salon',
              logo: { '@type': 'ImageObject', url: 'https://houseofgracebeauty.co.za/logo.png' },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://houseofgracebeauty.co.za/blog/${post.slug}`,
            },
          },
        }
      : { title: 'Article Not Found', description: 'This article could not be found.', path: '/blog', noindex: true }
  )

  if (!post) return <NotFound />

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden">
            <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display font-semibold text-ink hidden sm:inline">House Of Grace</span>
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary-dark font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>
      </header>

      <article className="px-6 sm:px-10 lg:px-16 pb-24">
        <div className="max-w-3xl mx-auto pt-6">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${BLOG_CATEGORY_COLOR[post.category] || 'bg-primary/10 text-primary-dark'}`}>
              {post.category}
            </span>
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{post.date} · {post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-ink leading-[1.08] tracking-tight mb-8">
            {post.title}
          </h1>

          {/* Author byline */}
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-divider">
            <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
              <img src="/grace-ceo.webp" alt="Grace Omoruan" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <p className="font-display font-medium text-ink text-sm leading-tight">Grace Omoruan</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Founder & Hair Consultant</p>
            </div>
          </div>

          {/* Body — measured for reading, not the site's usual wide layout */}
          <div className="space-y-6">
            {post.body.map((para, idx) => (
              <p key={idx} className="text-ink/85 text-lg leading-[1.8] font-body">
                {para}
              </p>
            ))}
          </div>

          {/* Conversion CTA */}
          <div className="mt-14 p-7 sm:p-9 rounded-4xl bg-primary/5 border border-primary/15 text-center">
            <p className="font-display font-medium text-xl text-ink mb-2">Not sure which treatment is right for you?</p>
            <p className="text-muted text-sm mb-6 max-w-md mx-auto">
              Every plan starts with a professional scalp analysis — book yours and we'll tell you exactly where to start.
            </p>
            <a
              href={SETTINGS.freshaBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-primary/30"
            >
              Book a scalp analysis · R150
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-divider">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark mb-6">╱ Keep reading</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group block p-5 rounded-3xl border border-divider hover:border-primary/30 hover:bg-primary/[0.03] transition-colors"
                  >
                    <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${BLOG_CATEGORY_COLOR[r.category] || 'bg-primary/10 text-primary-dark'}`}>
                      {r.category}
                    </span>
                    <p className="font-display font-medium text-ink leading-snug group-hover:text-primary-dark transition-colors">
                      {r.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
