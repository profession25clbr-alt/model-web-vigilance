import { Search, PenTool, Wrench, MonitorCheck } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    icon: Search,
    title: 'Diagnóstico',
    desc: 'Visitamos tus instalaciones, evaluamos riesgos y entendemos tus necesidades de seguridad.',
  },
  {
    icon: PenTool,
    title: 'Diseño',
    desc: 'Elaboramos una propuesta a medida con la tecnología y la cobertura ideal para tu espacio.',
  },
  {
    icon: Wrench,
    title: 'Instalación',
    desc: 'Nuestro equipo certificado instala y configura cada equipo con los más altos estándares.',
  },
  {
    icon: MonitorCheck,
    title: 'Monitoreo',
    desc: 'Supervisamos tus sistemas 24/7 y entregamos soporte continuo ante cualquier incidencia.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="py-28 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
      <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Cómo trabajamos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Un proceso <span className="text-[#00d4ff]">claro</span> de principio a fin
          </h2>
          <p className="text-slate-400 text-lg">
            Acompañamos cada etapa para garantizar una solución de seguridad sólida y a tu medida.
          </p>
        </Reveal>

        {/* Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Línea conectora (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#00d4ff]/30 via-[#00d4ff]/30 to-[#00d4ff]/30" />

          {steps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center gap-4">
                {/* Número + ícono */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#111827] border border-[#00d4ff]/25 flex items-center justify-center group hover:border-[#00d4ff]/60 transition-colors">
                  <Icon className="w-9 h-9 text-[#00d4ff]" />
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#00d4ff] text-[#080c14] text-sm font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
    </section>
  )
}
