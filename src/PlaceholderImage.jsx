import { ImageIcon } from 'lucide-react'

/**
 * Stand-in for a real photo. Used on pages (Nails, Massage) that don't have
 * shoot-ready images yet — swap for a real <img> once photos exist, same
 * className for sizing.
 */
export default function PlaceholderImage({ label, icon: Icon = ImageIcon, className = '' }) {
  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary/12 via-surface to-accent/10 ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <Icon className="relative z-10 h-7 w-7 text-primary-dark/40" strokeWidth={1.5} />
      <span className="relative z-10 mt-2 px-4 text-center font-mono text-[9px] uppercase tracking-widest text-primary-dark/50">
        {label || 'Photo coming soon'}
      </span>
    </div>
  )
}
