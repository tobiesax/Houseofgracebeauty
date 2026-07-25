/**
 * Pulls live Google reviews into src/data/reviews.json at build time.
 *
 * Why build time and not the browser: the legacy Places web service sends no
 * CORS headers, and any key shipped to the client is harvestable. Fetching here
 * keeps the key on the build machine and costs one API call per deploy.
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=xxx GOOGLE_PLACE_ID=ChIJ... npm run fetch:reviews
 *
 * If either variable is missing the script exits 0 and leaves the existing
 * reviews.json untouched, so `npm run build` never breaks on a missing key.
 *
 * Note: Places API returns a maximum of 5 reviews, chosen by Google — you
 * cannot page for more. Google Maps Platform terms allow caching this content
 * for up to 30 days, so re-run at least monthly.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'reviews.json')

const KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

if (!KEY || !PLACE_ID) {
  console.warn('[reviews] GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID not set — keeping existing reviews.json')
  process.exit(0)
}

const FIELDS = ['displayName', 'rating', 'userRatingCount', 'googleMapsUri', 'reviews'].join(',')
const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}?languageCode=en`

const res = await fetch(url, {
  headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': FIELDS },
})

if (!res.ok) {
  console.error(`[reviews] Places API returned ${res.status}: ${await res.text()}`)
  console.error('[reviews] Keeping existing reviews.json')
  process.exit(1)
}

const data = await res.json()

const reviews = (data.reviews ?? []).map((r) => ({
  name: r.authorAttribution?.displayName ?? 'Google user',
  rating: r.rating ?? 5,
  text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
  date: r.publishTime
    ? new Date(r.publishTime).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
    : (r.relativePublishTimeDescription ?? ''),
  authorUrl: r.authorAttribution?.uri ?? '',
  avatar: r.authorAttribution?.photoUri ?? '',
}))

if (reviews.length === 0) {
  console.warn('[reviews] API returned no reviews — keeping existing reviews.json')
  process.exit(0)
}

const previous = JSON.parse(await readFile(OUT, 'utf8'))

const payload = {
  source: 'google-places',
  fetchedAt: new Date().toISOString(),
  rating: data.rating ?? previous.rating,
  totalReviews: data.userRatingCount ?? previous.totalReviews,
  profileUrl: data.googleMapsUri ?? '',
  reviews,
}

await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`[reviews] Wrote ${reviews.length} review(s) · ${payload.rating}★ of ${payload.totalReviews} ratings`)
