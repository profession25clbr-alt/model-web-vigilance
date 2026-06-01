import { ShieldCheck, BadgeCheck, Star } from 'lucide-react'
import Reveal from './Reveal'

const certs = [
  { icon: ShieldCheck, name: 'CCTV Certified Installer', body: 'Certificación Internacional', year: '2023' },
  { icon: BadgeCheck, name: 'ISO 9001:2015', body: 'Gestión de Calidad', year: '2022' },
  { icon: Star, name: 'Integrador Hikvision', body: 'Hikvision Partner Program', year: '2024' },
  { icon: ShieldCheck, name: 'Cisco Certified Technician', body: 'Redes y Telecomunicaciones', year: '2023' },
]

const brands = ['Hikvision', 'Dahua', 'Cisco', 'Axis', 'Bosch', 'Genetec', 'Hanwha', 'Ubiquiti']

export default function Certifications() {
  return (
    <section id="certificaciones" className="py-28 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Avales y reconocimientos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Respaldados por los <span className="text-[#00d4ff]">mejores</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Certificaciones de organismos internacionales y alianzas con los fabricantes
            líderes del sector.
          </p>
        </Reveal>

        {/* Tarjetas de certificación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {certs.map(({ icon: Icon, name, body, year }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="group relative h-full card-border card-hover rounded-2xl p-7 bg-[#111827] text-center flex flex-col items-center gap-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-all duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-8 h-8 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
                  <p className="text-slate-500 text-xs">{body}</p>
                </div>
                <span className="mt-auto text-xs font-bold text-[#00d4ff] border border-[#00d4ff]/25 bg-[#00d4ff]/5 px-3 py-1 rounded-full">
                  {year}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Carrusel de marcas */}
        <Reveal>
          <p className="text-center text-slate-500 text-xs mb-8 uppercase tracking-[0.25em]">
            Integradores oficiales de
          </p>
          <div className="relative overflow-hidden">
            {/* Difuminado en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0f1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0f1a] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track gap-4">
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-8 py-4 rounded-xl border border-white/10 bg-[#111827] text-slate-400 font-bold text-base hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all whitespace-nowrap"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
    </section>
  )
}
