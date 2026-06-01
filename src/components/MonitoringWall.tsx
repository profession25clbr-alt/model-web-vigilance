import { useState, useEffect } from 'react'

function getTime() {
  return new Date().toLocaleTimeString('es-ES', { hour12: false })
}

// ─── Configuración de cámaras con sus imágenes ────────────────────────────────
// Cada cámara tiene 2 imágenes que se alternan en el carrusel.
// Coloca los archivos en /public/cameras/ con los nombres indicados.

interface CameraConfig {
  id: string
  location: string
  images: [string, string]   // [vista-a, vista-b]
  fallbackBg: string         // color mientras cargan las imágenes
}

// Estrategia de distribución con 9 imágenes en 6 cámaras:
// Set 0 → cámaras muestran imágenes 1-6
// Set 1 → cámaras muestran imágenes 4-9
// Resultado: todas las cámaras cambian de imagen al hacer el switch

const CAMERAS: CameraConfig[] = [
  {
    id: 'CAM-01',
    location: 'ENTRADA PRINCIPAL',
    images: [
      '/cameras/125807563159667686391.jpg',
      '/cameras/18317047325719014460.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#1a2030,#0e1520)',
  },
  {
    id: 'CAM-02',
    location: 'ESTACIONAMIENTO',
    images: [
      '/cameras/125807563159667686392.jpg',
      '/cameras/18317047325719014460b.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#0f1828,#080e18)',
  },
  {
    id: 'CAM-03',
    location: 'PASILLO NORTE',
    images: [
      '/cameras/125807563159667686393.jpg',
      '/cameras/2b32d723-7962-4495-aa81-9463ef8fd2d6d.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#0b1a0b,#061006)',
  },
  {
    id: 'CAM-04',
    location: 'RECEPCIÓN',
    images: [
      '/cameras/18317047325719014460.jpg',
      '/cameras/2b32d723-7962-4495-aa81-9463ef8fd2d6f.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#201a10,#16120a)',
  },
  {
    id: 'CAM-05',
    location: 'ACCESO VEHICULAR',
    images: [
      '/cameras/18317047325719014460b.jpg',
      '/cameras/9334303742865307817.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#101828,#08101c)',
  },
  {
    id: 'CAM-06',
    location: 'PERÍMETRO SUR',
    images: [
      '/cameras/2b32d723-7962-4495-aa81-9463ef8fd2d6d.jpg',
      '/cameras/9334303742865307817d.jpg',
    ],
    fallbackBg: 'linear-gradient(160deg,#080c1c,#040810)',
  },
]

// Cámaras que muestran alerta de movimiento (índices en CAMERAS)
const ALERT_ROTATION = [1, 4, 0, 2]

interface MotionBox { x: number; y: number; w: number; h: number; label: string; color: string }

const MOTION_BOXES: Record<number, MotionBox> = {
  0: { x: 40, y: 22, w: 20, h: 55, label: 'PERSONA',    color: '#ff3c3c' },
  1: { x: 30, y: 35, w: 38, h: 35, label: 'VEHÍCULO',   color: '#ff9900' },
  2: { x: 36, y: 26, w: 28, h: 45, label: 'MOVIMIENTO', color: '#00ff88' },
  4: { x: 25, y: 42, w: 48, h: 32, label: 'VEHÍCULO',   color: '#ff9900' },
}

// ─── CameraFeed ───────────────────────────────────────────────────────────────

interface FeedProps {
  cam: CameraConfig
  idx: number
  currentSet: number        // 0 = imagen-a, 1 = imagen-b
  alertCamIdx: number
  time: string
}

function CameraFeed({ cam, idx, currentSet, alertCamIdx, time }: FeedProps) {
  const isAlert  = alertCamIdx === idx
  const motion   = isAlert ? MOTION_BOXES[idx] : undefined
  const [errA, setErrA] = useState(false)
  const [errB, setErrB] = useState(false)

  const imgA = cam.images[0]
  const imgB = cam.images[1]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: cam.fallbackBg,
        border: `1px solid ${isAlert ? 'rgba(255,55,55,0.75)' : 'rgba(0,212,255,0.18)'}`,
        transition: 'border-color 0.5s ease',
      }}
    >
      {/* Imagen A — visible cuando currentSet === 0 */}
      {!errA && (
        <img
          src={imgA}
          alt=""
          onError={() => setErrA(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentSet === 0 ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      )}

      {/* Imagen B — visible cuando currentSet === 1 */}
      {!errB && (
        <img
          src={imgB}
          alt=""
          onError={() => setErrB(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentSet === 1 ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      )}

      {/* Overlay oscuro encima de la imagen para dar look CCTV */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.28)' }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)',
        }}
      />

      {/* Viñeta */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.65)' }}
      />

      {/* Caja de detección de movimiento */}
      {motion && (
        <div
          className="absolute animate-pulse"
          style={{
            left: `${motion.x}%`, top: `${motion.y}%`,
            width: `${motion.w}%`, height: `${motion.h}%`,
            border: `1.5px solid ${motion.color}`,
            boxShadow: `0 0 10px ${motion.color}66`,
          }}
        >
          <span
            className="absolute font-mono font-bold"
            style={{
              top: '-10px', left: 0,
              fontSize: '6px',
              color: motion.color,
              background: 'rgba(0,0,0,0.85)',
              padding: '0 3px',
              letterSpacing: '0.5px',
            }}
          >
            {motion.label}
          </span>
        </div>
      )}

      {/* Borde rojo de alerta */}
      {isAlert && (
        <div
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{ border: '1.5px solid rgba(255,50,50,0.7)', boxShadow: 'inset 0 0 12px rgba(255,50,50,0.15)' }}
        />
      )}

      {/* Indicador de set activo (pastilla pequeña) */}
      <div
        className="absolute top-0 right-0 flex gap-0.5 p-1"
        style={{ zIndex: 2 }}
      >
        <div style={{ width: 6, height: 3, borderRadius: 2, background: currentSet === 0 ? 'rgba(0,212,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
        <div style={{ width: 6, height: 3, borderRadius: 2, background: currentSet === 1 ? 'rgba(0,212,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Info inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between font-mono"
        style={{ background: 'rgba(0,0,0,0.7)', padding: '2px 5px', fontSize: '6.5px', zIndex: 2 }}
      >
        <span style={{ color: 'rgba(255,255,255,0.75)' }}>
          {cam.id} · {cam.location}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'rgba(255,255,255,0.65)' }}>
          {isAlert
            ? <span style={{ color: '#ff5555', fontWeight: 700 }}>● ALERTA</span>
            : <span style={{ color: '#ff4444' }}>●</span>
          }
          REC {time}
        </span>
      </div>

      {/* ID superior izquierda */}
      <div
        className="absolute top-0 left-0 font-mono"
        style={{ background: 'rgba(0,0,0,0.65)', padding: '1.5px 4px', fontSize: '6px', color: 'rgba(255,255,255,0.65)', zIndex: 2 }}
      >
        {cam.id}
      </div>
    </div>
  )
}

// ─── MonitoringWall ───────────────────────────────────────────────────────────

export default function MonitoringWall() {
  const [time, setTime]           = useState(getTime)
  const [currentSet, setCurrentSet] = useState(0)       // 0 o 1 → qué imagen mostrar
  const [alertStep, setAlertStep] = useState(0)

  // Reloj en vivo
  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  // Carrusel: alternar imagen a/b cada 5 segundos
  useEffect(() => {
    const t = setInterval(() => setCurrentSet((s) => (s === 0 ? 1 : 0)), 5000)
    return () => clearInterval(t)
  }, [])

  // Rotar cámara con alerta cada 3.5s
  useEffect(() => {
    const t = setInterval(() => setAlertStep((s) => (s + 1) % ALERT_ROTATION.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '2px',
        background: '#000',
      }}
    >
      {CAMERAS.map((cam, idx) => (
        <CameraFeed
          key={cam.id}
          cam={cam}
          idx={idx}
          currentSet={currentSet}
          alertCamIdx={ALERT_ROTATION[alertStep]}
          time={time}
        />
      ))}
    </div>
  )
}
