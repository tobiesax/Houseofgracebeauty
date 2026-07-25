import { useSyncExternalStore } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

const SHOW_AFTER = 600

function subscribeToScroll(onChange) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

const getScrolledPast = () => window.scrollY > SHOW_AFTER

/**
 * Floating home control, mounted once for every route.
 *
 * On the landing page it acts as back-to-top and only appears once you've
 * scrolled past the hero. On any other route it is always visible and
 * navigates back to "/".
 *
 * Sits bottom-left: the right rail already carries the booking cart,
 * WhatsApp and the chat assistant.
 */
export default function HomeButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  // Scroll position is external state, so read it rather than mirroring it
  // into an effect — that keeps a reload mid-page showing the right thing.
  const scrolledPast = useSyncExternalStore(subscribeToScroll, getScrolledPast, () => false)
  const show = !isHome || scrolledPast

  const handleClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isHome ? 'Back to top' : 'Go to the home page'}
      title={isHome ? 'Back to top' : 'Home'}
      className={`fixed bottom-6 left-6 z-30 h-12 w-12 rounded-full bg-surface border border-divider shadow-xl shadow-primary/10 flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <Home className="h-5 w-5" strokeWidth={1.8} />
    </button>
  )
}
