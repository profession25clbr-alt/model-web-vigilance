import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Valor a mostrar, p. ej. "500+", "15+", "24/7". Se anima el número inicial. */
  value: string
  duration?: number
}

/** Anima un número de 0 a su valor final cuando entra en el viewport.
 *  Conserva cualquier sufijo no numérico (p. ej. "+", "/7"). */
export default function CountUp({ value, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/)
    // Si no empieza por número, mostrar tal cual.
    if (!match) {
      setDisplay(value)
      return
    }

    const target = parseInt(match[1], 10)
    const suffix = match[2]
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(`${target}${suffix}`)
      return
    }

    setDisplay(`0${suffix}`)
    let started = false

    const animate = () => {
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${Math.round(eased * target)}${suffix}`)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          animate()
          obs.unobserve(el)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display}</span>
}
