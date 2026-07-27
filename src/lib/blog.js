// Loads every content/blog/*.json file at build time and derives each
// post's URL slug from its filename, so adding a new file (by hand or via
// the CMS) is enough to publish a new /blog/:slug page — no code change.
const modules = import.meta.glob('../../content/blog/*.json', { eager: true, import: 'default' })

export const BLOG_POSTS = Object.entries(modules)
  .map(([path, data]) => ({ ...data, slug: path.split('/').pop().replace(/\.json$/, '') }))
  .sort((a, b) => a.id - b.id)

export const BLOG_CATEGORY_COLOR = {
  'Hair Treatment': 'bg-primary/10 text-primary-dark',
  'Hair Growth': 'bg-emerald-50 text-emerald-700',
  'Protective Styles': 'bg-accent/10 text-accent-dark',
  'Hair Health': 'bg-teal-50 text-teal-700',
  'Scalp Care': 'bg-sky-50 text-sky-700',
  'Colour Care': 'bg-rose-50 text-rose-700',
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

// Post dates are stored as "May 2026" for display — this derives the
// ISO date BlogPosting structured data requires, defaulting to the 1st
// since the exact publish day was never tracked.
export function toISODate(displayDate) {
  const [month, year] = (displayDate || '').toLowerCase().split(' ')
  const monthIndex = MONTHS.indexOf(month)
  if (monthIndex === -1 || !year) return null
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`
}
