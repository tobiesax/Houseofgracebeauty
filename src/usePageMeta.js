import { useEffect } from 'react'

const SITE = 'https://houseofgracebeauty.co.za'
const JSONLD_ID = 'page-json-ld'

function setTag(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Keeps title/description/canonical in sync per route.
 * This is a client-side SPA, so crawlers only see these after JS runs —
 * fine for Google, but see README notes on prerendering for other crawlers.
 */
export function usePageMeta({ title, description, path = '', noindex = false, jsonLd = null, image = null }) {
  useEffect(() => {
    document.title = title
    setTag('meta[name="description"]', 'content', description)
    setTag('link[rel="canonical"]', 'href', `${SITE}${path}`)
    setTag('meta[property="og:title"]', 'content', title)
    setTag('meta[property="og:description"]', 'content', description)
    setTag('meta[property="og:url"]', 'content', `${SITE}${path}`)
    if (image) setTag('meta[property="og:image"]', 'content', image.startsWith('http') ? image : `${SITE}${image}`)
    setTag('meta[name="robots"]', 'content', noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1')

    // Per-page structured data (e.g. a BlogPosting for an article). Only one
    // of these should exist at a time, so it's added and torn down alongside
    // the homepage's static LocalBusiness block in index.html, not merged
    // with it — search engines are fine reading multiple JSON-LD scripts.
    let script = null
    if (jsonLd) {
      script = document.getElementById(JSONLD_ID)
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = JSONLD_ID
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    }

    return () => {
      script?.remove()
    }
  }, [title, description, path, noindex, jsonLd, image])
}
