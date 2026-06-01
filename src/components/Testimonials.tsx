import { Quote, Star } from 'lucide-react'
import Reveal from './Reveal'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'La instalación fue impecable y el monitoreo 24/7 nos da una tranquilidad que no teníamos. El equipo respondió a cada consulta en minutos.',
    name: 'Nombre Apellido',
    role: 'Gerente de Operaciones · Empresa Retail',
    initials: 'NA',
  },
  {
    quote:
      'Migramos toda nuestra red de cámaras y el control de acceso con ellos. Profesionales, puntuales y con tecnología de primer nivel.',
    name: 'Nombre Apellido',
    role: 'Jefe de Seguridad · Centro Logístico',
    initials: 'NA',
  },
  {
    quote:
      'Desde que trabajamos juntos no hemos tenido un solo incidente. El soporte técnico es rápido y siempre están disponibles.',
    name: 'Nombre Apellido',
    role: 'Administrador · Condominio Residencial',
    initials: 'NA',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-28 bg-[#080c14] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Lo que dicen nuestros clientes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Confianza que se <span className="text-[#00d4ff]">construye</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Empresas e instituciones que ya protegen lo que más valoran con nosotros.
          </p>
        </Reveal>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials }, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative h-full card-border card-hover rounded-2xl p-7 bg-[#111827] flex flex-col gap-5">
                <Quote className="w-9 h-9 text-[#00d4ff]/30 group-hover:text-[#00d4ff]/50 transition-colors" />

                {/* Estrellas */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#00d4ff] text-[#00d4ff]" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed flex-grow">"{quote}"</p>

                {/* Autor */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] font-bold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
