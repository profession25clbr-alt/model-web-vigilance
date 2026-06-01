import { useState, useEffect } from 'react'
import { Shield, Menu, X } from 'lucide-react'
import { COMPANY } from '../config'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: resalta el enlace de la sección visible.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Cierra el menú móvil con la tecla Escape y bloquea el scroll del fondo.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c14]/90 border-b border-[#00d4ff]/20 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors">
            <Shield className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-sm tracking-wider">{COMPANY.logoLine1}</span>
            <span className="text-[#00d4ff] font-bold text-xs tracking-widest">{COMPANY.logoLine2}</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                active === l.href
                  ? 'text-[#00d4ff]'
                  : 'text-slate-400 hover:text-[#00d4ff]'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-0.5 bg-[#00d4ff] transition-all duration-300 ${
                  active === l.href ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00d4ff] text-[#080c14] text-sm font-semibold hover:bg-[#00bde8] transition-colors glow-primary"
        >
          Cotizar ahora
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1421]/95 border-t border-[#00d4ff]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className={`text-sm font-medium py-1 transition-colors ${
                active === l.href ? 'text-[#00d4ff]' : 'text-slate-300 hover:text-[#00d4ff]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-2 px-5 py-2 rounded-lg bg-[#00d4ff] text-[#080c14] text-sm font-semibold text-center"
            onClick={() => setMenuOpen(false)}
          >
            Cotizar ahora
          </a>
        </div>
      )}
    </header>
  )
}
