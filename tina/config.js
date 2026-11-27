import { defineConfig } from 'tinacms'

// Local-mode toggle: `tinacms dev` sets this automatically so the CMS runs
// against the filesystem with no TinaCloud account needed. Production reads
// real credentials from Vercel env vars — see README "Content editing" section.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

const ICONS = [
  'Scissors', 'Sparkles', 'Gem', 'Leaf', 'Heart', 'SprayCan', 'ShieldCheck', 'Award',
  'ScanSearch', 'Droplet', 'Droplets', 'Sprout', 'Sunrise', 'Dumbbell', 'Flame', 'Feather', 'Wind', 'Waves',
  'Palette', 'Paintbrush', 'Hand', 'Flower2', 'Footprints',
]

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'service',
        label: 'Services & Treatments',
        path: 'content/services',
        format: 'json',
        ui: {
          router: () => '/#services',
        },
        fields: [
          { type: 'string', name: 'title', label: 'Name', isTitle: true, required: true },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: ['Treatment', 'Braids', 'Twist', 'Weave & Sew-In', 'Kids & Specials', 'Nails', 'Massage'],
          },
          { type: 'string', name: 'icon', label: 'Icon', options: ICONS },
          { type: 'string', name: 'duration', label: 'Duration', description: 'e.g. "1 hr" or "2 hr 30 min"' },
          { type: 'number', name: 'price', label: 'Price (ZAR)', required: true },
          {
            type: 'boolean',
            name: 'priceIsPlaceholder',
            label: '⚠ Placeholder price — confirm before launch',
            description: 'Check this while the price is an estimate. Uncheck once Grace has confirmed the real price. Not shown to site visitors — it is only a reminder here in the CMS.',
          },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          { type: 'image', name: 'image', label: 'Photo', description: 'Shown on the dedicated page (e.g. Nails, Massage) for this service. Leave blank to show a placeholder until a real photo is ready.' },
          { type: 'string', name: 'subcategory', label: 'Sub-group (optional)', description: 'Used on dedicated pages (e.g. Nails, Massage) to group services — e.g. "Manicures", "Pedicures", "Enhancements". Leave blank if not needed.' },
          { type: 'number', name: 'order', label: 'Display order', description: 'Lower numbers show first within the category. Leave alone unless you want to reorder.' },
          { type: 'number', name: 'itemId', label: 'Internal ID', description: 'Do not change — used to track bookings.' },
        ],
      },
      {
        name: 'product',
        label: 'Grace Naturals Products',
        path: 'content/products',
        format: 'json',
        ui: {
          router: () => '/#products',
        },
        fields: [
          { type: 'string', name: 'name', label: 'Product Name', isTitle: true, required: true },
          { type: 'string', name: 'tagline', label: 'Tagline' },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          { type: 'string', name: 'treats', label: 'Prescribed for', description: 'Shown as "Prescribed for: ..." on the card' },
          { type: 'number', name: 'price', label: 'Price (ZAR)', required: true },
          { type: 'string', name: 'badge', label: 'Badge', description: 'e.g. "Best Seller", "New Arrival"' },
          { type: 'image', name: 'image', label: 'Product Photo' },
          { type: 'image', name: 'gallery', label: 'Looping Photos', list: true, description: 'Optional — if two or more photos are added here, the card crossfades between them on a continuous loop instead of showing a single static photo.' },
          { type: 'string', name: 'itemId', label: 'Internal ID', description: 'Do not change — used by the cart.' },
        ],
      },
      {
        name: 'blogPost',
        label: 'Blog Articles',
        path: 'content/blog',
        format: 'json',
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: ['Hair Treatment', 'Hair Growth', 'Protective Styles', 'Hair Health', 'Scalp Care', 'Colour Care'],
          },
          { type: 'string', name: 'date', label: 'Date shown', description: 'e.g. "May 2026"' },
          { type: 'string', name: 'readTime', label: 'Read time', description: 'e.g. "5 min read"' },
          { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' }, required: true },
          { type: 'string', name: 'body', label: 'Paragraphs', list: true, ui: { component: 'textarea' } },
          { type: 'number', name: 'itemId', label: 'Internal ID', description: 'Do not change.' },
        ],
      },
      {
        name: 'training',
        label: 'In-Salon Training Page',
        path: 'content/training',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/training',
        },
        fields: [
          {
            type: 'object',
            name: 'hero',
            label: 'Hero',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow label' },
              { type: 'string', name: 'heading', label: 'Heading (line 1)' },
              { type: 'string', name: 'headingAccent', label: 'Heading (accent line)' },
              { type: 'string', name: 'subheading', label: 'Subheading', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'whatWeTrain', label: 'What we train your team in', list: true },
          { type: 'string', name: 'revenueFlow', label: '"Turn knowledge into revenue" flow steps', list: true },
          {
            type: 'object',
            name: 'packages',
            label: 'Training Packages',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Package name' },
              { type: 'string', name: 'tagline', label: 'Tagline' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'treatments',
            label: 'Treatment Services We Can Develop',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Treatment name' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'treatmentsNote', label: 'Note below treatments', ui: { component: 'textarea' } },
          { type: 'string', name: 'whyChoose', label: '"Why salon owners choose this" checklist', list: true },
          {
            type: 'object',
            name: 'closing',
            label: 'Closing CTA',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'subheading', label: 'Subheading', ui: { component: 'textarea' } },
              { type: 'string', name: 'ctaLabel', label: 'Button label' },
            ],
          },
        ],
      },
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content/settings',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/#contact',
        },
        fields: [
          {
            type: 'object',
            name: 'contact',
            label: 'Contact Details',
            fields: [
              { type: 'string', name: 'phone', label: 'Phone (display)', description: 'e.g. "074 468 0171"' },
              { type: 'string', name: 'phoneIntl', label: 'Phone (dial link)', description: 'e.g. "+27744680171" — used for tel: links' },
              { type: 'string', name: 'whatsapp', label: 'WhatsApp number', description: 'Digits only, e.g. "27744680171"' },
              { type: 'string', name: 'email', label: 'Email address' },
              { type: 'string', name: 'address', label: 'Physical address' },
              { type: 'string', name: 'mapsUrl', label: 'Google Maps link', description: 'Full URL opened when visitors tap "Get Directions". A Google Maps search/place link.' },
            ],
          },
          {
            type: 'object',
            name: 'hours',
            label: 'Opening Hours',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.days }) },
            fields: [
              { type: 'string', name: 'days', label: 'Day(s)' },
              { type: 'string', name: 'time', label: 'Time', description: 'e.g. "7:00 am – 9:00 pm" or "Closed"' },
            ],
          },
          {
            type: 'string',
            name: 'freshaBookingUrl',
            label: 'Fresha Booking Link',
            description: 'Every "Book Now" button on the site sends clients here.',
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            fields: [
              { type: 'string', name: 'facebook', label: 'Facebook URL' },
              { type: 'string', name: 'instagram', label: 'Instagram URL' },
              { type: 'string', name: 'tiktok', label: 'TikTok URL' },
            ],
          },
          {
            type: 'object',
            name: 'googleRating',
            label: 'Google Rating (manual fallback)',
            description: 'Used only if the live Google review fetch has not run.',
            fields: [
              { type: 'number', name: 'rating', label: 'Rating out of 5' },
              { type: 'number', name: 'totalReviews', label: 'Total review count' },
            ],
          },
          {
            type: 'object',
            name: 'concerns',
            label: '"Sound Familiar?" Ledger',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.symptom }) },
            fields: [
              { type: 'string', name: 'symptom', label: 'Client symptom (in their words)' },
              { type: 'string', name: 'start', label: 'Where we would start' },
            ],
          },
          {
            type: 'string',
            name: 'specialties',
            label: 'Specialties list',
            list: true,
          },
        ],
      },
    ],
  },
})
