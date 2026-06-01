import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

const faqs = [
  {
    q: '¿Cuánto tarda la instalación de un sistema CCTV?',
    a: 'Depende del tamaño del proyecto, pero una instalación estándar suele completarse en 1 a 3 días hábiles. Tras el diagnóstico te entregamos un plazo exacto.',
  },
  {
    q: '¿El monitoreo funciona realmente las 24 horas?',
    a: 'Sí. Contamos con una central de monitoreo con operadores certificados que supervisan tus instalaciones los 365 días del año, con protocolos de respuesta ante cualquier alerta.',
  },
  {
    q: '¿Puedo ver las cámaras desde mi celular?',
    a: 'Por supuesto. Todos nuestros sistemas incluyen acceso remoto mediante una aplicación móvil para que veas tus cámaras en tiempo real desde donde estés.',
  },
  {
    q: '¿Ofrecen mantenimiento después de la instalación?',
    a: 'Sí, ofrecemos planes de mantenimiento preventivo y correctivo, además de soporte técnico continuo para garantizar el máximo rendimiento de tus equipos.',
  },
  {
    q: '¿Trabajan con empresas de cualquier tamaño?',
    a: 'Diseñamos soluciones tanto para hogares y pequeños comercios como para grandes instituciones e industrias. Cada proyecto se adapta a tu necesidad y presupuesto.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28 bg-[#080c14] relative overflow-hidden">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Preguntas frecuentes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Resolvemos tus <span className="text-[#00d4ff]">dudas</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Lo que más nos consultan antes de comenzar a trabajar juntos.
          </p>
        </Reveal>

        {/* Acordeón */}
        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="card-border rounded-2xl bg-[#111827] overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-white font-semibold text-base">{q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#00d4ff] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
