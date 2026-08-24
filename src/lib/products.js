// Filenames (prod-1, prod-2, prod-3, ...) drive the intended display order,
// so no explicit `order` field is needed here unlike services. Sorted
// numerically (not as strings) so prod-10/prod-11 land after prod-9.
const modules = import.meta.glob('../../content/products/*.json', { eager: true, import: 'default' })

const productNumber = (path) => Number(path.match(/prod-(\d+)\.json$/)?.[1] ?? 0)

export const PRODUCTS = Object.entries(modules)
  .sort(([a], [b]) => productNumber(a) - productNumber(b))
  .map(([, data]) => data)
