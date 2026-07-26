/**
 * One-time migration: moves content that was hardcoded in src/App.jsx into
 * content/ as individual JSON files Tina CMS can edit. Safe to re-run —
 * it overwrites by slug, so it won't create duplicates.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

async function writeJson(dir, name, data) {
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')
}

// ---- Services -------------------------------------------------------------
const SERVICES = [
  { id: 1,  category: 'Braids', icon: 'Scissors', title: 'Braids Bra Length',               duration: '3 hr 15 min', price: 580, description: 'Excludes hairpiece' },
  { id: 2,  category: 'Braids', icon: 'Scissors', title: 'Italian Braids',                  duration: '2 hr 30 min', price: 450, description: 'Excludes hairpiece' },
  { id: 4,  category: 'Braids', icon: 'Scissors', title: "Feather's Braids",                duration: '2 hr 45 min', price: 550, description: 'Excludes hairpiece' },
  { id: 5,  category: 'Braids', icon: 'Scissors', title: 'Braids Repair',                   duration: '2 hr',        price: 350, description: 'Includes undo and repair of all-round braids. Does not include a wash or hairpiece' },
  { id: 6,  category: 'Braids', icon: 'Scissors', title: 'Bantu Knots',                     duration: '1 hr',        price: 300, description: 'Excludes hair' },
  { id: 7,  category: 'Braids', icon: 'Scissors', title: 'Short French Braids',             duration: '3 hr 30 min', price: 480, description: 'Excludes hairpiece' },
  { id: 8,  category: 'Braids', icon: 'Heart',    title: 'Cornrow for Kids',                duration: '1 hr',        price: 200, description: 'Kids cornrow styling' },
  { id: 9,  category: 'Braids', icon: 'Heart',    title: 'Miracle Knots (Kids)',            duration: '4 hr',        price: 300, description: 'Excludes hairpiece' },
  { id: 10, category: 'Braids', icon: 'Scissors', title: 'Miracle Knots',                   duration: '4 hr',        price: 500, description: 'Excludes hairpiece' },
  { id: 11, category: 'Braids', icon: 'Scissors', title: 'Fulani Braids (Bum Length)',      duration: '2 hr 45 min', price: 600, description: 'Excludes hairpiece' },
  { id: 12, category: 'Braids', icon: 'Scissors', title: 'Long Boho Braids (Waist)',        duration: '4 hr',        price: 650, description: 'Excluding hairpieces' },
  { id: 13, category: 'Braids', icon: 'Scissors', title: 'Straight Up (Hip Length)',        duration: '3 hr',        price: 380, description: 'Excludes hairpiece' },
  { id: 14, category: 'Braids', icon: 'Scissors', title: 'Braids (Waist Length)',           duration: '4 hr',        price: 680, description: 'Excludes hairpiece' },
  { id: 15, category: 'Braids', icon: 'Scissors', title: 'Braids (Midback Length)',         duration: '3 hr 45 min', price: 580, description: 'Lightweight. Excludes hairpiece' },
  { id: 16, category: 'Braids', icon: 'Scissors', title: 'Braids (Shoulder Length)',        duration: '3 hr',        price: 480, description: 'Lightweight. Excludes hairpiece' },
  { id: 17, category: 'Braids', icon: 'Scissors', title: 'Braids Hip Length',               duration: '5 hr',        price: 750, description: 'Excluding hairpiece' },
  { id: 18, category: 'Braids', icon: 'Scissors', title: 'Undo Braids and Wash',            duration: '1 hr 45 min', price: 280, description: 'Includes gentle removal and wash' },
  { id: 19, category: 'Braids', icon: 'Scissors', title: 'Cornrow Undo',                    duration: '45 min',      price: 60,  description: 'Gentle cornrow removal' },
  { id: 20, category: 'Braids', icon: 'Scissors', title: 'Milano Braids',                   duration: '2 hr 30 min', price: 450, description: 'Excludes hairpiece' },
  { id: 21, category: 'Braids', icon: 'Scissors', title: 'Milano Braids Small',             duration: '2 hr 30 min', price: 550, description: 'Excludes hairpiece' },
  { id: 22, category: 'Braids', icon: 'Scissors', title: 'Havana Braids',                   duration: '2 hr 30 min', price: 450, description: 'Excludes hairpiece' },
  { id: 23, category: 'Braids', icon: 'Scissors', title: 'Fulani Braids (Medium)',          duration: '3 hr 30 min', price: 520, description: 'Excludes hairpiece' },
  { id: 24, category: 'Braids', icon: 'Scissors', title: 'Tribal Braids (Bra Length)',      duration: '3 hr 30 min', price: 550, description: 'Excludes hairpiece. Come with yours or buy from us' },
  { id: 25, category: 'Braids', icon: 'Scissors', title: 'Long French Braids',              duration: '4 hr 30 min', price: 650, description: 'Excludes hairpiece' },
  { id: 26, category: 'Braids', icon: 'Scissors', title: 'French Braids Short (Boho)',      duration: '4 hr',        price: 500, description: 'Price excludes hairpiece. Come with yours or buy from us' },
  { id: 27, category: 'Braids', icon: 'Scissors', title: 'Goddess Braids (Bum Long)',       duration: '3 hr 45 min', price: 650, description: 'Excluding hairpieces' },
  { id: 28, category: 'Braids', icon: 'Scissors', title: 'Long Boho Braid (Bum)',           duration: '4 hr',        price: 680, description: 'Excluding hairpieces' },
  { id: 29, category: 'Braids', icon: 'Scissors', title: 'Boho Braids (Short)',             duration: '3 hr',        price: 500, description: 'Excluding hairpieces' },
  { id: 30, category: 'Braids', icon: 'Scissors', title: 'Half Moon (Boho) Bra Length',     duration: '2 hr 30 min', price: 550, description: 'Price excludes hairpiece' },
  { id: 31, category: 'Braids', icon: 'Scissors', title: 'Half Singles / Half Moon Long',   duration: '3 hr 30 min', price: 600, description: 'Excludes hairpiece' },
  { id: 32, category: 'Braids', icon: 'Scissors', title: 'Short Braids (Shoulder)',         duration: '2 hr 30 min', price: 450, description: 'Excludes hairpiece. Expressions at R60 or Darling at R40 available' },
  { id: 33, category: 'Braids', icon: 'Scissors', title: 'Box Braids Medium (Bra Length)',  duration: '2 hr',        price: 400, description: 'Excludes hairpiece' },
  { id: 34, category: 'Braids', icon: 'Scissors', title: 'Medium Braids (Bra Length)',      duration: '3 hr 30 min', price: 550, description: 'Excludes hairpiece' },
  { id: 35, category: 'Braids', icon: 'Scissors', title: 'Straight Up',                     duration: '2 hr 30 min', price: 300, description: 'Excludes hairpiece' },
  { id: 36, category: 'Braids', icon: 'Scissors', title: 'Straight Back',                   duration: '1 hr 30 min', price: 280, description: 'Excludes hairpiece' },
  { id: 37, category: 'Braids', icon: 'Scissors', title: 'Braids Undo',                     duration: '1 hr',        price: 120, description: 'From ZAR 120. Price may vary' },
  { id: 38, category: 'Braids', icon: 'Gem',      title: 'Wig Lines',                       duration: '30 min',      price: 150, description: 'Professional wig line application' },
  { id: 39, category: 'Braids', icon: 'Scissors', title: 'Cornrow',                         duration: '45 min',      price: 180, description: 'Classic cornrow styling' },
  { id: 40, category: 'Twist', icon: 'SprayCan', title: 'Small Twist',                      duration: '5 hr',        price: 850, description: 'Excludes hairpiece' },
  { id: 41, category: 'Twist', icon: 'SprayCan', title: 'Medium Kinky Twist',               duration: '4 hr',        price: 550, description: 'Excludes hairpiece' },
  { id: 42, category: 'Twist', icon: 'SprayCan', title: 'Yanky Twist',                      duration: '1 hr',        price: 950, description: "A unique hairstyle for the busy woman. One hour and you're done. Service includes hairpiece" },
  { id: 43, category: 'Twist', icon: 'SprayCan', title: 'Mini Twist',                       duration: '4 hr 30 min', price: 650, description: 'Excludes hairpiece' },
  { id: 44, category: 'Twist', icon: 'SprayCan', title: 'Afro Twist (Short)',               duration: '3 hr 30 min', price: 450, description: 'Excludes hairpiece' },
  { id: 45, category: 'Twist', icon: 'SprayCan', title: 'Short Twist (with Expressions)',   duration: '2 hr 45 min', price: 450, description: 'Price excludes hairpiece' },
  { id: 46, category: 'Twist', icon: 'SprayCan', title: 'Twist Own Hair',                   duration: '1 hr 45 min', price: 300, description: 'Twist styling on natural hair' },
  { id: 47, category: 'Twist', icon: 'SprayCan', title: 'Senegalese Twist',                 duration: '3 hr 30 min', price: 550, description: 'Excludes hairpiece' },
  { id: 48, category: 'Weave & Sew-In', icon: 'Gem', title: 'Undo Weave',                   duration: '1 hr',        price: 100, description: 'Gentle weave removal' },
  { id: 49, category: 'Weave & Sew-In', icon: 'Gem', title: 'Crochet',                      duration: '1 hr',        price: 450, description: 'Crochet hair installation' },
  { id: 50, category: 'Weave & Sew-In', icon: 'Gem', title: 'Razor Cut',                    duration: '2 hr',        price: 450, description: 'Precision razor cut styling' },
  { id: 51, category: 'Weave & Sew-In', icon: 'Gem', title: 'Weave',                        duration: '2 hr',        price: 450, description: 'Full weave installation' },
  { id: 57, category: 'Treatment', icon: 'Leaf',     title: 'Consultation & Scalp Analysis', duration: '1 hr',       price: 150, description: 'Start here. A professional scalp assessment and personalised treatment plan — every other therapy is prescribed from this' },
  { id: 52, category: 'Treatment', icon: 'Sparkles', title: 'Scalp Clarity Treatment',      duration: '1 hr',        price: 400, description: 'Gently cleanses and exfoliates the scalp, promoting healthy hair growth. Addresses dandruff, dryness and irritation' },
  { id: 62, category: 'Treatment', icon: 'Sparkles', title: 'Follicle Fuel',                duration: '1 hr',        price: 350, description: 'Hair growth therapy. Rejuvenates dormant follicles to boost volume and thickness' },
  { id: 61, category: 'Treatment', icon: 'Leaf',     title: 'Edge Revival Treatment',       duration: '1 hr',        price: 350, description: 'Focused on restoring thinning edges and fragile hairlines, including traction-related hair loss' },
  { id: 60, category: 'Treatment', icon: 'Sparkles', title: 'Moisture Lock',                duration: '1 hr',        price: 350, description: 'Deeply hydrates and seals in moisture to stop dryness turning into breakage' },
  { id: 59, category: 'Treatment', icon: 'Sparkles', title: 'Strength Fusion',              duration: '1 hr',        price: 350, description: 'Fortifies weak strands and rebuilds hair structure' },
  { id: 58, category: 'Treatment', icon: 'Sparkles', title: 'HoneyMelt Treatment',          duration: '1 hr',        price: 380, description: 'Melts rich humectants into the hair shaft to rehydrate, improve elasticity, reduce breakage and restore shine. Ideal as a monthly moisture reset' },
  { id: 55, category: 'Treatment', icon: 'Sparkles', title: 'Tension Tamer',                duration: '1 hr',        price: 350, description: 'Employs pressotherapy to relieve stress from tight hairstyles. Calms and soothes the scalp after braids or protective styles' },
  { id: 56, category: 'Treatment', icon: 'Leaf',     title: 'Scalp Soother',                duration: '1 hr',        price: 350, description: 'An antiseptic treatment to soothe the scalp and allow it to breathe' },
  { id: 53, category: 'Treatment', icon: 'Sparkles', title: 'Follicle Brightening Treatment', duration: '1 hr',      price: 350, description: 'Revitalizes scalp with noticeable brightness, enhancing natural hair shine and promoting healthy hair growth' },
  { id: 54, category: 'Treatment', icon: 'Sparkles', title: 'Shine Sharpening Treatment',   duration: '1 hr',        price: 350, description: 'Restores vibrancy and shine for both natural and treated hair. Enhances colour depth and rejuvenates dull locks' },
  { id: 63, category: 'Treatment', icon: 'Leaf',     title: 'Shrink Ease Treatment',        duration: '1 hr',        price: 350, description: 'Gently stretches natural curls and coils, reduces excessive shrinkage while keeping hair healthy, shiny and bouncy' },
  { id: 64, category: 'Kids & Specials', icon: 'Heart', title: 'Kiddies Wash n Blow',       duration: '1 hr',        price: 120, description: 'Gentle wash and blow-dry for children' },
  { id: 65, category: 'Kids & Specials', icon: 'Heart', title: 'Kids Braids',               duration: '2 hr 45 min', price: 380, description: 'Excluding hairpiece' },
  { id: 66, category: 'Kids & Specials', icon: 'Heart', title: 'Straight Up (with Hairpiece)', duration: '1 hr 45 min', price: 360, description: 'Including hairpiece' },
  { id: 67, category: 'Kids & Specials', icon: 'Heart', title: 'Straight Up (Hair Alone)',  duration: '1 hr',        price: 200, description: 'Straight up styling using own hair' },
  { id: 68, category: 'Kids & Specials', icon: 'Heart', title: 'Kids Kinky Afro (Cornrow & Bun)', duration: '1 hr 40 min', price: 280, description: 'Including hairpiece' },
  { id: 69, category: 'Kids & Specials', icon: 'Sparkles', title: 'Conditioning Treatment', duration: '1 hr',        price: 300, description: 'Deep conditioning treatment for hair health and shine' },
]

// ---- Products ---------------------------------------------------------
const PRODUCTS = [
  { id: 'prod-1', image: '/product-hairfood.webp', name: 'Grace Hair Growth Hairfood', tagline: 'Nourish from root to tip', description: 'A rich, nutrient-dense hair food packed with natural oils and vitamins that stimulate scalp health and encourage strong, healthy hair growth. Ideal for dry, brittle, or slow-growing hair.', badge: 'Best Seller', treats: 'Slow growth · Dryness · Brittleness', price: 180 },
  { id: 'prod-2', image: '/product-hair-oil.webp', name: 'Grace Hair Oil', tagline: 'Shine, strength & softness', description: 'A lightweight yet deeply nourishing hair oil that tames frizz, adds brilliant shine, and strengthens each strand. Perfect for sealing in moisture after wash day or refreshing your style between appointments.', badge: 'Fan Favourite', treats: 'Moisture loss · Frizz · Breakage', price: 180 },
  { id: 'prod-3', image: '/product-pores-treatment.webp', name: 'Pores Awakening Treatment', tagline: 'Revive your scalp', description: 'A targeted scalp treatment designed to unclog pores, remove build-up, and awaken dormant follicles. Formulated with active botanical extracts to restore balance and create the ideal environment for hair growth.', badge: 'New Arrival', treats: 'Build-up · Flaking · Dormant follicles', price: 380 },
]

// ---- Blog ---------------------------------------------------------------
const BLOG_POSTS = [
  { id: 1, category: 'Hair Treatment', readTime: '5 min read', date: 'May 2026', title: 'Deep Conditioning: The One Treatment Your Hair Absolutely Cannot Skip', excerpt: 'Deep conditioning is not a luxury — it is the foundation of every healthy hair care routine. As a professional stylist, the number one issue I see in clients with dry, brittle, or over-processed hair is a chronic lack of moisture. Here is what the science says, and what you need to start doing right now.', body: [
    'Deep conditioning works by penetrating the cortex of the hair shaft, replacing lost proteins and moisture that everyday styling, heat, and environmental stress strip away. Unlike regular conditioners that coat the surface, a quality deep conditioner actually restructures damaged strands from within.',
    'For natural hair, I recommend deep conditioning every 7–10 days using a product rich in shea butter, argan oil, or keratin. Apply to freshly washed hair in sections, cover with a plastic cap, and sit under a hooded dryer for 20–30 minutes. The heat opens the cuticle and allows maximum absorption.',
    'For relaxed or colour-treated hair, the frequency increases. These hair types have a compromised cuticle and need consistent moisture replenishment to avoid breakage. Incorporate a protein treatment once a month alongside your moisture treatments to maintain that critical protein-moisture balance.',
    'The biggest mistake I see? Clients using heat on dry hair without conditioning first. Always condition before you style, and your hair will reward you with strength, shine, and length retention.',
  ]},
  { id: 2, category: 'Hair Growth', readTime: '6 min read', date: 'April 2026', title: '5 Proven Tips for Faster Hair Growth — Backed by Science and Salon Experience', excerpt: 'Everyone wants longer hair, but very few people understand what actually drives growth. After over a decade working with all hair types, I have seen what works and what is just marketing. Here are the five changes that consistently deliver real results for my clients.', body: [
    '1. Scalp health is everything. Your scalp is the soil your hair grows from. A congested, inflamed, or dry scalp will stunt growth no matter what products you use. Massage your scalp for 4–5 minutes daily to stimulate circulation and remove build-up. Our Pores Awakening Treatment was formulated specifically for this.',
    '2. Protein is non-negotiable. Hair is made of keratin — a protein. If your diet is low in protein, your body will deprioritise hair growth. Include eggs, lentils, chicken, and leafy greens in your daily meals. Combine dietary protein with a keratin-based treatment every 4–6 weeks.',
    '3. Protective styles retain length. Growth happens continuously, but breakage cancels it out. Box braids, cornrows, and wigs give your ends a break from daily manipulation. Just ensure your edges and scalp are moisturised underneath — never install a protective style on a dry or stressed scalp.',
    '4. Sleep on satin. Cotton pillowcases create friction that causes breakage, tangles, and moisture loss overnight. A satin pillowcase or bonnet is one of the cheapest and most effective investments you can make for your hair.',
    '5. Be consistent with oil sealing. After moisturising with a water-based leave-in, seal with a lightweight oil like our Grace Hair Oil to lock in that hydration. Moisture that evaporates cannot support growth.',
  ]},
  { id: 3, category: 'Protective Styles', readTime: '4 min read', date: 'March 2026', title: 'Protective Styles That Actually Protect: What Your Stylist Wants You to Know', excerpt: 'Not all protective styles are created equal. In fact, a poorly installed protective style can cause more damage than wearing your hair out. As someone who installs hundreds of braids, weaves, and twists every year, here is my honest advice.', body: [
    'The purpose of a protective style is to tuck away your ends and reduce daily manipulation — allowing your hair to retain length and recover from stress. But the installation, the duration, and the care routine in between are what determine whether you come out ahead or set back.',
    'Tension is the number one enemy. If your scalp is sore after installation, that style is too tight. Traction alopecia — hair loss along the hairline caused by constant pulling — is one of the most common issues I treat. Always speak up during installation. A skilled stylist will never dismiss your discomfort.',
    'Keep your scalp moisturised throughout. Use a lightweight oil or scalp spray every 2–3 days under your braids or weave. A dry scalp flakes, itches, and eventually causes damage. Our Grace Hair Oil works beautifully for this — a few drops massaged in at the roots is all you need.',
    'Six to eight weeks is the maximum for most protective styles. Beyond that, the new growth and the extension begin to tangle around each other, and removal becomes damaging. When you take the style down, deep condition immediately and give your hair a two-week break before reinstalling.',
  ]},
  { id: 4, category: 'Hair Health', readTime: '5 min read', date: 'February 2026', title: 'Hair Porosity: Understanding It Will Change Your Entire Hair Care Routine', excerpt: 'Porosity is the most important thing about your hair that most people have never heard of. Once you understand yours, every product choice becomes clearer and your hair will respond in ways that feel almost magical.', body: [
    'Hair porosity refers to how well your hair absorbs and retains moisture. It is determined by the structure of your cuticle — the outer layer of each strand. There are three types: low, normal, and high porosity, and each needs a completely different approach.',
    'Low porosity hair has tightly sealed cuticles that resist moisture absorption. Products sit on top rather than penetrating. The fix: use heat when conditioning (warm towel or hooded dryer), choose lightweight liquid-based products, and avoid heavy butters that will just build up on the surface.',
    "High porosity hair — often caused by chemical processing, heat damage, or genetics — absorbs moisture quickly but loses it just as fast. This hair feels rough, tangles easily, and dries quickly after washing. The fix: protein treatments to fill in the gaps in the cuticle, heavier sealants like shea butter, and always finish with a cold rinse to close the cuticle.",
    'Normal porosity hair is the sweet spot — it absorbs and retains moisture well and requires the least intervention. Maintain it with regular deep conditioning and minimal heat. To find your porosity, drop a clean strand into a glass of water. If it floats, low porosity. If it sinks slowly, normal. If it sinks immediately, high porosity.',
  ]},
  { id: 5, category: 'Scalp Care', readTime: '4 min read', date: 'January 2026', title: 'The Scalp Truth: Why Ignoring This Is the Reason Your Hair Is Not Growing', excerpt: 'I have had clients spend thousands on hair products and see zero results — because they were treating their strands while completely neglecting their scalp. Your scalp is a living ecosystem, and it needs as much attention as your skin.', body: [
    'Think of your scalp the way you think of facial skin. It produces sebum, it sheds dead cells, it can become inflamed, congested, or dehydrated. When it is out of balance, hair growth slows, shedding increases, and no amount of length-retaining tricks will compensate.',
    'Washing frequency matters more than most people realise. Washing too infrequently leads to product and sebum build-up that clogs follicles and creates an environment where bacteria and fungus thrive. For most hair types, once a week is ideal. Scalp-only washing mid-week is a great option for those who protective style.',
    'Scalp massages are free and deeply effective. Four minutes of firm circular pressure daily increases blood flow to the follicles, delivering the oxygen and nutrients they need to produce healthy hair. Do it in the shower while shampooing, or apply our Grace Hair Growth Hairfood and massage it in before bed.',
    'Watch for these warning signs that your scalp needs professional attention: persistent itching, flaking, redness, tenderness, or thinning at the hairline. These are not just inconveniences — they are signals. Come in for a scalp consultation and we will identify the root cause and build a targeted treatment plan for you.',
  ]},
  { id: 6, category: 'Colour Care', readTime: '5 min read', date: 'December 2025', title: 'Coloured Hair Survival Guide: How to Keep Your Colour Vibrant Without Wrecking Your Hair', excerpt: 'Colour is one of the most transformative things you can do for your hair — but it comes with responsibility. After years of restoring chemically damaged hair in the salon, I have seen what happens when colour care is neglected. Here is how to protect your investment.', body: [
    'The biggest mistake I see is clients treating their coloured hair exactly the same as before the service. Colour — whether it is a full bleach, a tint, or a semi-permanent — changes the internal structure of the hair shaft. The cuticle is lifted during the process, which means moisture escapes more easily and the hair becomes more vulnerable to breakage and fading.',
    'Start with the right shampoo. Sulphate-free is non-negotiable for coloured hair. Sulphates strip colour molecules from the cortex with every wash, cutting your vibrancy lifespan in half. Washing in cool or lukewarm water makes an equally significant difference — hot water lifts the cuticle and lets colour bleed out faster than anything else.',
    "Deep conditioning is your colour's best friend. Coloured hair needs moisture replenishment at least once a week. Look for treatments that contain keratin, argan oil, or amino acids — these smooth the cuticle back down, locking in both moisture and pigment. Our Grace Hair Growth Hairfood works beautifully as a pre-shampoo treatment on colour-treated hair, sealing and softening before you cleanse.",
    'Sun exposure fades colour faster than you might expect — UV rays break down the dye molecules, especially on lighter shades. A UV-protective hair mist or wearing a hat in direct sun extends your colour significantly. Come back to us every 6–8 weeks for a gloss or toning treatment to refresh and maintain vibrancy between full colour appointments. Healthy colour and healthy hair are not a compromise — with the right routine, you can have both.',
  ]},
]

// ---- Settings (singleton) ------------------------------------------------
const SETTINGS = {
  phone: '074 468 0171',
  phoneIntl: '+27744680171',
  whatsapp: '27744680171',
  email: 'info@houseofgracebeauty.co.za',
  address: '271 Outlook Terrace, Blackheath, Johannesburg',
  hours: [
    { days: 'Monday – Saturday', time: '7:00 am – 9:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],
  freshaBookingUrl: '',
  social: { facebook: '', instagram: '', tiktok: '' },
  googleRating: { rating: 4.8, totalReviews: 9 },
}

const CONCERNS = [
  { symptom: 'My hair is thinning on top', start: 'Follicle Fuel' },
  { symptom: 'My edges are disappearing', start: 'Edge Revival Treatment' },
  { symptom: 'My hair never gets past a certain length', start: 'HoneyMelt Treatment' },
  { symptom: 'It snaps the moment I comb it', start: 'Strength Fusion' },
  { symptom: 'My hair is dry no matter what I use', start: 'Moisture Lock' },
  { symptom: 'My scalp flakes constantly', start: 'Scalp Clarity Treatment' },
  { symptom: 'My scalp itches and feels sore', start: 'Scalp Soother' },
  { symptom: "There's build-up I can't wash out", start: 'Scalp Detox & Exfoliation' },
]

const SPECIALTIES = [
  'Scalp Analysis & Consultation',
  'Customised Hair & Scalp Treatments',
  'Hair Growth Therapy',
  'Hair Loss & Edge Restoration',
  'Scalp Detox & Exfoliation',
  'Moisture & Repair Treatments',
  'Protective Styling for Healthy Hair',
  'Grace Naturals Hair Care',
]

async function main() {
  const seenSlugs = new Map()
  const uniqueSlug = (base) => {
    const n = (seenSlugs.get(base) ?? 0) + 1
    seenSlugs.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  }

  for (const svc of SERVICES) {
    const slug = uniqueSlug(slugify(svc.title))
    await writeJson(join(ROOT, 'content/services'), slug, svc)
  }
  for (const p of PRODUCTS) {
    await writeJson(join(ROOT, 'content/products'), p.id, p)
  }
  for (const post of BLOG_POSTS) {
    const slug = slugify(post.title)
    await writeJson(join(ROOT, 'content/blog'), slug, post)
  }
  await writeJson(join(ROOT, 'content/settings'), 'index', { ...SETTINGS, concerns: CONCERNS, specialties: SPECIALTIES })

  console.log(`Wrote ${SERVICES.length} services, ${PRODUCTS.length} products, ${BLOG_POSTS.length} blog posts, and settings.json`)
}

main()
