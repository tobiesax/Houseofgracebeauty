/**
 * Regenerates public/sitemap.xml from the static routes plus every file in
 * content/blog/. Runs automatically before each build (see package.json)
 * so a new blog post — added by hand or via the CMS — is in the sitemap
 * on the next deploy with no manual edit.
 */
import { writeFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://houseofgracebeauty.co.za'

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
]

const blogFiles = await readdir(join(ROOT, 'content/blog'))
const blogRoutes = blogFiles
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({
    loc: `/blog/${f.replace(/\.json$/, '')}`,
    changefreq: 'monthly',
    priority: '0.6',
  }))

const urls = [...STATIC_ROUTES, ...blogRoutes]
  .map((r) => `  <url>\n    <loc>${SITE}${r.loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await writeFile(join(ROOT, 'public/sitemap.xml'), xml, 'utf8')
console.log(`[sitemap] Wrote ${urls.split('</url>').length - 1} URLs (${blogRoutes.length} blog posts)`)
