// Filenames (prod-1, prod-2, prod-3) already sort into the intended display
// order, so no explicit `order` field is needed here unlike services.
const modules = import.meta.glob('../../content/products/*.json', { eager: true, import: 'default' })

export const PRODUCTS = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, data]) => data)
