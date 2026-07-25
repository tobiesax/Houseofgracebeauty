import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../usePageMeta'

export default function PrivacyPolicy() {
  usePageMeta({
    title: 'Privacy Policy | House Of Grace Beauty Salon',
    description: 'How House Of Grace Beauty Salon collects, uses and safeguards the personal information you share when booking an appointment or contacting us.',
    path: '/privacy',
  })

  return (
    <div className="min-h-screen bg-background px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest mb-12 hover:opacity-70 transition">
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>
      <h1 className="font-display font-semibold text-4xl text-ink mb-4">Privacy Policy</h1>
      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-10">Last updated: June 2026</p>
      <div className="prose prose-sm text-muted space-y-6 leading-relaxed">
        <p>House Of Grace ("we", "us", or "our") is committed to protecting your personal information. This policy explains how we collect, use, and safeguard the data you share with us when visiting our website or booking an appointment.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Information We Collect</h2>
        <p>We may collect your name, email address, phone number, and any messages you submit through our contact form. We do not collect payment details directly on this website.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">How We Use Your Information</h2>
        <p>Information you provide is used solely to respond to your enquiry or confirm your appointment. We do not sell or share your data with third parties for marketing purposes.</p>
        <h2 className="font-display font-medium text-xl text-ink mt-8">Contact</h2>
        <p>For any privacy enquiries, please email us at <a href="mailto:info@houseofgracebeauty.co.za" className="text-primary">info@houseofgracebeauty.co.za</a>.</p>
      </div>
    </div>
  )
}
