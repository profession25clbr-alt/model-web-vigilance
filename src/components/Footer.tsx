import { Shield } from 'lucide-react'
import { COMPANY } from '../config'

const links = {
  Servicios: ['CCTV', 'Monitoreo 24/7', 'Telecomunicaciones', 'Control de Acceso', 'Alarmas'],
  Empresa: ['Nosotros', 'Certificaciones', 'Proyectos', 'Blog'],
  Legal: ['Política de Privacidad', 'Términos de Uso'],
}

export default function Footer() {
  return (
    <footer className="bg-[#0d1421] border-t border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-wider">{COMPANY.logoLine1}</span>
                <span className="text-[#00d4ff] font-bold text-xs tracking-widest">{COMPANY.logoLine2}</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empresa certificada en sistemas de vigilancia CCTV y telecomunicaciones.
              Protegemos lo que más valoras con tecnología de vanguardia.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-[#00d4ff] text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#00d4ff]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} {COMPANY.fullName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-slate-600 text-sm">Sistemas activos 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
