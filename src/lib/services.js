// Loads every content/services/*.json file at build time. Order is driven
// by the explicit `order` field (folder-based collections have no inherent
// sequence), which preserves the deliberate "Consultation first" ordering
// within Treatment. Icons are string names here — the component resolves
// them to the actual lucide-react icon so this module stays presentation-free.
const modules = import.meta.glob('../../content/services/*.json', { eager: true, import: 'default' })

export const SERVICES_FULL = Object.values(modules).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export const SERVICE_CATEGORIES = ['Treatment', 'Braids', 'Twist', 'Weave & Sew-In', 'Kids & Specials']
