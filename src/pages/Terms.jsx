import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../usePageMeta'

export default function Terms() {
  usePageMeta({
    title: 'Terms of Service | House Of Grace Beauty Salon',
    description: 'Booking, appointment and service terms for House Of Grace Beauty Salon in Blackheath, Johannesburg.',
    path: '/terms',
  })

  return (
    <div className="min-h-screen bg-background px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest mb-12 hover:opacity-70 transition">
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>
      <h1 className="font-display font-semibold text-4xl text-ink mb-4">Terms of Service</h1>
      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-10">Last updated: June 2026</p>
      <div className="prose prose-sm text-muted space-y-6 leading-relaxed">
        <p>By visiting the House Of Grace website or booking an appointment, you agree to the following terms and conditions.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Appointments</h2>
        <p>We ask that you provide at least 24 hours notice when cancelling or rescheduling an appointment. Repeated no-shows may result in a deposit requirement for future bookings.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Services</h2>
        <p>All services are performed by trained professionals. Results may vary depending on hair type and condition. We will always advise you on what is achievable during your consultation.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Liability</h2>
        <p>House Of Grace is not liable for any allergic reactions to products if you have not disclosed relevant sensitivities prior to your appointment.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Contact</h2>
        <p>For questions, please contact us at <a href="mailto:info@houseofgracebeauty.co.za" className="text-primary">info@houseofgracebeauty.co.za</a>.</p>
      </div>
    </div>
  )
}
