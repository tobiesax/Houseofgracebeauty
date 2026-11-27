export default function FAQSection({ eyebrow = 'FAQ', heading, faqs }) {
  return (
    <section className="mb-16 sm:mb-24">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {eyebrow}</span>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mt-4 leading-[1.05] tracking-tight max-w-2xl">
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
        {faqs.map(({ q, a }) => (
          <div key={q} className="bg-surface border border-divider rounded-4xl p-6 sm:p-7">
            <h3 className="font-display font-medium text-base text-ink mb-2">{q}</h3>
            <p className="text-muted text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
