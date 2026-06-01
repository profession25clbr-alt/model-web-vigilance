import { useState, type FormEvent } from 'react'
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import { COMPANY } from '../config'
import Reveal from './Reveal'

const info = [
  { icon: Phone, label: 'Teléfono', value: COMPANY.phone },
  { icon: Mail,  label: 'Email',    value: COMPANY.email },
  { icon: MapPin, label: 'Dirección', value: COMPANY.address },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('loading')

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
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
            {state === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-bold text-xl">¡Mensaje enviado!</h3>
                <p className="text-slate-400 text-center">
                  Nos comunicaremos contigo en menos de 24 horas.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="mt-4 px-6 py-2 rounded-lg border border-[#00d4ff]/30 text-[#00d4ff] text-sm hover:bg-[#00d4ff]/10 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
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

                {state === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Hubo un error al enviar. Por favor intenta nuevamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#00d4ff] text-[#080c14] font-bold text-sm hover:bg-[#00bde8] transition-colors glow-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#080c14]/30 border-t-[#080c14] rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
