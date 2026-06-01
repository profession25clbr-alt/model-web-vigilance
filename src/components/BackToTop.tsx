import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

/** Botón flotante que aparece tras desplazarse y vuelve al inicio de la página. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })

  return (
    <button
      onClick={scrollTop}
      aria-label="Volver arriba"
      className={`fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#00d4ff] text-[#080c14] flex items-center justify-center shadow-lg shadow-[#00d4ff]/30 hover:bg-white transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
