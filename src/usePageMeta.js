import { useEffect } from 'react'

const SITE = 'https://houseofgracebeauty.co.za'

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
export function usePageMeta({ title, description, path = '', noindex = false }) {
  useEffect(() => {
    document.title = title
    setTag('meta[name="description"]', 'content', description)
    setTag('link[rel="canonical"]', 'href', `${SITE}${path}`)
    setTag('meta[property="og:title"]', 'content', title)
    setTag('meta[property="og:description"]', 'content', description)
    setTag('meta[property="og:url"]', 'content', `${SITE}${path}`)
    setTag('meta[name="robots"]', 'content', noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1')
  }, [title, description, path, noindex])
}
