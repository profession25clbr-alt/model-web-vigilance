import { useEffect, useState } from 'react'

/** Barra fina en la parte superior que se llena según el avance del scroll. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
