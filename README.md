# Prototipo Web Vigilancia (`model-web-vigilance`)

Plantilla de **landing page para empresas de seguridad y vigilancia** (nombre interno del paquete: `vigitel`). Es un prototipo de una sola página que se personaliza por cliente cambiando un único archivo de configuración, pensado para mostrarle al cliente cómo se vería su sitio antes de construir el definitivo.

> **Estado actual:** prototipo funcional. El formulario de contacto **no envía datos** (muestra un aviso de entorno de prueba); el endpoint PHP de `api/contact.php` existe como base para el sitio definitivo, pero hoy no está conectado. Los textos, el logo y los datos de contacto son de ejemplo.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración y personalización](#configuración-y-personalización)
- [Uso / Ejecución](#uso--ejecución)
- [Secciones de la página](#secciones-de-la-página)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Imágenes de las cámaras](#imágenes-de-las-cámaras)
- [Formulario de contacto y endpoint PHP](#formulario-de-contacto-y-endpoint-php)
- [Despliegue](#despliegue)
- [Estado y límites conocidos](#estado-y-límites-conocidos)
- [Autores](#autores)
- [Licencia](#licencia)

---

## Descripción

Sitio de presentación de una empresa de seguridad, con estética oscura y acento celeste, orientado a la conversión (el orden de las secciones se reordenó para llevar al visitante hacia el contacto). Incluye:

- **Hero** con llamado a la acción y un **muro de monitoreo** (`MonitoringWall`) que simula una central de cámaras con las imágenes de `public/cameras/`.
- Secciones de servicios, proceso de trabajo, nosotros (con contadores animados), testimonios, contacto, preguntas frecuentes y certificaciones.
- **Botón flotante de WhatsApp**, botón «volver arriba» y barra de progreso de scroll.
- Accesibilidad básica: enlace «Saltar al contenido» y navegación por teclado.

Se pensó como **plantilla reutilizable**: todo lo que cambia entre clientes (nombre, logo en dos líneas, correo, teléfono, dirección y WhatsApp) vive en `src/config.ts`.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.2 | Framework UI |
| TypeScript | 6.0 | Tipado estático |
| Vite | 8.0 | Build tool y servidor de desarrollo |
| Tailwind CSS | 4.3 (plugin `@tailwindcss/vite`) | Estilos |
| lucide-react | 1.17 | Íconos |
| ESLint + typescript-eslint | 10 / 8.59 | Análisis estático |
| PHP (opcional) | — | `api/contact.php`, envío de correo en hosting compartido |
| AWS Amplify | — | Hosting del prototipo (`amplify.yml`) |

Sin librerías de componentes ni de animación: las animaciones de aparición (`Reveal`) y los contadores (`CountUp`) son propios.

---

## Requisitos previos

- **Node.js 22 LTS** (versión fijada en `.nvmrc`; Vite 8 y TypeScript 6 la requieren).
- **npm**.

---

## Instalación

```bash
git clone https://github.com/profession25clbr-alt/model-web-vigilance.git
cd model-web-vigilance
npm install
```

---

## Configuración y personalización

Para adaptar el prototipo a un cliente se edita **solo** `src/config.ts`:

```ts
export const COMPANY = {
  logoLine1: 'SU EMPRESA',            // primera línea del logo (grande)
  logoLine2: 'SEGURIDAD',             // segunda línea del logo (acento azul)
  fullName:  'Su Empresa Seguridad',  // textos y pie de página
  email:     'contacto@suempresa.com',
  phone:     '+XX (XXX) XXX-XXXX',
  address:   'Ciudad, País',
  whatsapp:  '56900000000',           // formato internacional, solo dígitos
}
```

Además, para un sitio definitivo hay que revisar:

- Los textos de cada componente en `src/components/`.
- `index.html` (título y metadatos), `public/robots.txt` y `public/sitemap.xml` (dominio real).
- El correo destino de `api/contact.php` (ver más abajo).

---

## Uso / Ejecución

```bash
npm run dev       # servidor de desarrollo con recarga en caliente
npm run build     # tsc -b + vite build → dist/
npm run preview   # sirve dist/ localmente
npm run lint      # ESLint
```

---

## Secciones de la página

Orden actual en `src/App.tsx`:

| # | Sección | Componente |
|---|---|---|
| 1 | Hero (y muro de monitoreo) | `Hero`, `MonitoringWall` |
| 2 | Servicios | `Services` |
| 3 | Proceso de trabajo | `Process` |
| 4 | Nosotros (con contadores) | `About`, `CountUp` |
| 5 | Testimonios | `Testimonials` |
| 6 | Contacto | `Contact` |
| 7 | Preguntas frecuentes | `FAQ` |
| 8 | Certificaciones | `Certifications` |

Transversales: `Navbar`, `Footer`, `ScrollProgress`, `WhatsAppButton`, `BackToTop`.

---

## Estructura del proyecto

```
model-web-vigilance/
├── api/contact.php          # endpoint PHP de contacto (no conectado al frontend todavía)
├── public/
│   ├── cameras/             # imágenes del muro de monitoreo (+ INSTRUCCIONES.md)
│   ├── favicon.svg, icons.svg
│   ├── robots.txt, sitemap.xml
├── src/
│   ├── components/          # una sección o widget por archivo
│   ├── config.ts            # datos de la empresa (único archivo a editar por cliente)
│   ├── App.tsx, main.tsx
│   └── index.css, App.css
├── .htaccess                # HTTPS forzado, SPA, gzip, caché y cabeceras de seguridad (Apache)
├── amplify.yml              # build en AWS Amplify
├── .nvmrc                   # Node 22
└── vite.config.ts, tsconfig*.json, eslint.config.js
```

---

## Imágenes de las cámaras

Las fotos del muro de monitoreo se generan a mano con IA y se guardan en `public/cameras/`. `public/cameras/INSTRUCCIONES.md` describe los nombres esperados (`cam-01-a.jpg` … `cam-06-b.jpg`, dos vistas por cámara; JPG o PNG, 16:9 o 4:3, mínimo 800×600 px).

---

## Formulario de contacto y endpoint PHP

- **Hoy:** `Contact.tsx` no hace ninguna petición; al enviar muestra un aviso de «entorno de prueba».
- **Para producción:** `api/contact.php` recibe un `POST` JSON (`name`, `email`, `phone`, `message`), valida y escapa los campos y envía el correo con `mail()`. Antes de usarlo hay que **cambiar las direcciones `$to` y `From`** (están con un dominio de ejemplo) y conectar el `handleSubmit` del formulario a `/api/contact.php`.
- El `.htaccess` ya excluye `/api/` de la reescritura SPA.
- Si el cliente trata datos personales de los contactos (nombre, correo, teléfono), aplica la Ley 21.719 de protección de datos personales de Chile (plena vigencia 1-dic-2026): informar la finalidad en el formulario y definir un responsable.

---

## Despliegue

- **Prototipo:** AWS Amplify, con `amplify.yml` (`npm install` + `npm run build`, artefacto `dist/`).
- **Hosting compartido con Apache/cPanel:** subir el contenido de `dist/` junto con `.htaccess` y la carpeta `api/` (requiere PHP).

---

## Estado y límites conocidos

- Prototipo: contenido de ejemplo y formulario sin conectar.
- No hay pruebas automatizadas.
- Las rutas del `sitemap.xml` y `robots.txt` deben ajustarse al dominio definitivo.

---

## Autores

| Nombre | Área | Responsabilidades |
|---|---|---|
| **Matheus de Lara** | Fullstack | Diseño, desarrollo y despliegue del prototipo. |

---

## Licencia

Código propietario. Todos los derechos reservados.
