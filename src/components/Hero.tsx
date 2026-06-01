import { ArrowRight, ChevronDown } from 'lucide-react'
import MonitoringWall from './MonitoringWall'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060911]"
    >
      {/* ── Muro de cámaras de fondo ── */}
      <MonitoringWall />

      {/* Oscurecido central para legibilidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background:
            'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(6,9,17,0.85) 0%, rgba(6,9,17,0.6) 50%, rgba(6,9,17,0.4) 100%)',
        }}
      />

      {/* Viñeta superior/inferior */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background:
            'linear-gradient(to bottom, rgba(6,9,17,0.8) 0%, transparent 25%, transparent 75%, rgba(6,9,17,0.95) 100%)',
        }}
      />

      {/* Resplandor azul detrás del título */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="w-[650px] h-[650px] rounded-full bg-[#00d4ff]/6 blur-[150px]" />
      </div>

      {/* ── Contenido ── */}
      <div
        className="relative max-w-4xl mx-auto px-6 text-center"
        style={{ zIndex: 10 }}
      >
        {/* Eyebrow */}
        <p
          className="text-[#00d4ff] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-6 animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          Seguridad · Vigilancia · Telecomunicaciones
        </p>

        {/* Titular */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-7 text-shadow-strong animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          Protegemos lo que
          <br />
          <span className="text-[#00d4ff] glow-text">más importa para ti</span>
        </h1>

        {/* Texto comercial */}
        <p
          className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-strong animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Diseñamos, instalamos y monitoreamos sistemas de videovigilancia y
          telecomunicaciones a la medida de tu empresa. Tecnología de punta y un
          equipo certificado que cuida tu tranquilidad las 24 horas del día.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4ff] text-[#060911] font-bold text-base hover:bg-white transition-all glow-primary shadow-lg shadow-[#00d4ff]/25"
          >
            Solicitar cotización
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/5 hover:border-[#00d4ff]/40 transition-all backdrop-blur-sm"
          >
            Conocer servicios
          </a>
        </div>

        {/* Línea de confianza */}
        <p
          className="text-slate-400 text-sm mt-10 tracking-wide animate-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          +500 clientes protegidos · 15 años de experiencia · Empresa certificada en CCTV
        </p>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#servicios"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-[#00d4ff] transition-colors animate-bounce"
        style={{ zIndex: 10 }}
        aria-label="Desplazar hacia servicios"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  )
}
