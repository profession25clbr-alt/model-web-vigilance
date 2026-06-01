import { CheckCircle, Users, Award, Zap, ArrowRight } from 'lucide-react'
import { COMPANY } from '../config'
import Reveal from './Reveal'

const values = [
  {
    icon: CheckCircle,
    title: 'Compromiso',
    desc: 'Cada instalación se realiza con los más altos estándares de calidad y todos los protocolos de seguridad.',
  },
  {
    icon: Users,
    title: 'Equipo Certificado',
    desc: 'Técnicos especializados con certificaciones internacionales en seguridad y telecomunicaciones.',
  },
  {
    icon: Award,
    title: 'Certificación CCTV',
    desc: 'Empresa certificada para la instalación y mantenimiento de sistemas CCTV según las normas vigentes.',
  },
  {
    icon: Zap,
    title: 'Respuesta Rápida',
    desc: 'Tiempo de respuesta garantizado ante cualquier incidencia técnica o emergencia de seguridad.',
  },
]

const stats = [
  { value: '500+', label: 'Clientes protegidos' },
  { value: '15+', label: 'Años de experiencia' },
  { value: '24/7', label: 'Monitoreo activo' },
]

export default function About() {
  return (
    <section id="nosotros" className="py-28 bg-[#080c14] relative overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Columna de texto */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
                Quiénes somos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Más de 15 años{' '}
              <span className="text-[#00d4ff]">protegiendo</span>{' '}
              lo que importa
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-5">
              {COMPANY.fullName} es una empresa especializada en seguridad electrónica
              y telecomunicaciones. Desde nuestros inicios ofrecemos soluciones
              tecnológicas de vanguardia para empresas, instituciones y hogares.
            </p>

            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Contamos con un equipo de ingenieros y técnicos certificados que garantizan
              la correcta instalación, configuración y mantenimiento de cada sistema,
              asegurando el máximo rendimiento y confiabilidad.
            </p>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 mb-9 py-6 border-y border-white/10">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-black text-[#00d4ff] mb-1">{value}</div>
                  <div className="text-slate-400 text-xs leading-tight">{label}</div>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00d4ff] text-[#060911] font-bold hover:bg-white transition-all glow-primary"
            >
              Contáctanos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>

          {/* Tarjetas de valores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group h-full card-border card-hover rounded-2xl p-6 bg-[#111827]">
                  <div className="w-11 h-11 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/20 group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
