import { Camera, Wifi, Monitor, Shield, Radio, Lock, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const services = [
  {
    icon: Camera,
    title: 'Sistemas CCTV',
    description:
      'Instalación y configuración de cámaras IP, analógicas y HD. Grabación continua con almacenamiento local y en la nube.',
    features: ['Cámaras 4K y HD', 'Visión nocturna', 'Detección de movimiento', 'Acceso remoto'],
  },
  {
    icon: Monitor,
    title: 'Monitoreo 24/7',
    description:
      'Central de monitoreo con operadores certificados que vigilan tus instalaciones las 24 horas, los 7 días de la semana.',
    features: ['Alertas en tiempo real', 'Protocolo de emergencia', 'Reportes diarios', 'App móvil'],
  },
  {
    icon: Wifi,
    title: 'Telecomunicaciones',
    description:
      'Infraestructura de red, fibra óptica, enlaces punto a punto y soluciones de conectividad para empresas.',
    features: ['Fibra óptica', 'Redes empresariales', 'VoIP', 'Enlace redundante'],
  },
  {
    icon: Shield,
    title: 'Control de Acceso',
    description:
      'Sistemas biométricos, tarjetas RFID y control de acceso vehicular para restringir el ingreso a zonas seguras.',
    features: ['Biometría dactilar', 'Tarjetas RFID', 'Acceso vehicular', 'Registro de entradas'],
  },
  {
    icon: Radio,
    title: 'Sistemas de Alarma',
    description:
      'Centrales de alarma con sensores perimetrales, detectores de movimiento y notificaciones inmediatas.',
    features: ['Sensores perimetrales', 'Notificación SMS/app', 'Backup de batería', 'Respuesta rápida'],
  },
  {
    icon: Lock,
    title: 'Cerraduras Electrónicas',
    description:
      'Cerraduras inteligentes con apertura remota, auditoría de accesos e integración total con tu sistema CCTV.',
    features: ['Apertura remota', 'Auditoría de accesos', 'Integración CCTV', 'Respaldo mecánico'],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-[#0a0f1a] relative overflow-hidden">
      {/* Accent superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
      {/* Glow decorativo */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Lo que ofrecemos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Soluciones completas de <span className="text-[#00d4ff]">seguridad</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Cada servicio se diseña a la medida de tu operación, combinando tecnología
            de punta con el respaldo de un equipo certificado.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, features }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <div className="group relative h-full card-border card-hover rounded-2xl p-7 bg-[#111827] flex flex-col gap-5 overflow-hidden">
                {/* Número de fondo */}
                <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.03] group-hover:text-[#00d4ff]/10 transition-colors select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Línea superior animada */}
                <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#00d4ff] to-transparent transition-all duration-500" />

                {/* Ícono */}
                <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center group-hover:bg-[#00d4ff]/20 group-hover:scale-105 transition-all">
                  <Icon className="w-7 h-7 text-[#00d4ff]" />
                </div>

                <div className="relative">
                  <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-2 mt-auto pt-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-400 text-xs">
                      <div className="w-1 h-1 rounded-full bg-[#00d4ff] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="flex items-center gap-1.5 text-[#00d4ff] text-sm font-semibold pt-2 border-t border-white/5 group-hover:gap-3 transition-all"
                >
                  Solicitar servicio <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
    </section>
  )
}
