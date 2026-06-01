import { useState, type FormEvent } from 'react'
import { Send, MapPin, Phone, Mail } from 'lucide-react'
import { COMPANY } from '../config'
import Reveal from './Reveal'

const info = [
  { icon: Phone, label: 'Teléfono', value: COMPANY.phone },
  { icon: Mail,  label: 'Email',    value: COMPANY.email },
  { icon: MapPin, label: 'Dirección', value: COMPANY.address },
]

type FormState = 'idle' | 'demo'

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // Prototipo: el formulario no envía datos a ningún backend.
  // Se muestra un aviso de entorno de prueba en lugar de hacer la petición.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setState('demo')
  }

  return (
    <section id="contacto" className="py-28 bg-[#080c14] relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase">
              Hablemos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Da el primer paso hacia tu <span className="text-[#00d4ff]">tranquilidad</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Completa el formulario y un especialista se comunicará contigo en menos de 24 horas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {info.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl card-border bg-[#141d2e]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="p-5 rounded-2xl card-border bg-[#141d2e]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold">Disponible ahora</span>
              </div>
              <p className="text-slate-400 text-sm">
                Nuestro equipo de soporte está en línea para atender tu consulta.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3 card-border rounded-2xl p-8 bg-[#141d2e]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1.5">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1421] border border-[#00d4ff]/15 text-white placeholder-slate-600 focus:outline-none focus:border-[#00d4ff]/50 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1421] border border-[#00d4ff]/15 text-white placeholder-slate-600 focus:outline-none focus:border-[#00d4ff]/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+XX (XXX) XXX-XXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1421] border border-[#00d4ff]/15 text-white placeholder-slate-600 focus:outline-none focus:border-[#00d4ff]/50 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-1.5">Mensaje *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Cuéntanos qué necesitas proteger y en qué podemos ayudarte..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1421] border border-[#00d4ff]/15 text-white placeholder-slate-600 focus:outline-none focus:border-[#00d4ff]/50 transition-colors text-sm resize-none"
                  />
                </div>

                {state === 'demo' && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-red-400 text-sm text-center font-medium border border-red-400/30 bg-red-400/5 rounded-lg py-2.5 px-3"
                  >
                    ⚠ Entorno de prueba — este formulario es demostrativo y no envía información.
                  </p>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#00d4ff] text-[#080c14] font-bold text-sm hover:bg-[#00bde8] transition-colors glow-primary"
                >
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </button>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}
