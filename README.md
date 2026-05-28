# Mundo Eléctrico
 
Plataforma web para una tienda del sector eléctrico, desarrollada como proyecto freelance y desplegada en producción. Cubre tanto el frontend (Nuxt 3) como la configuración y despliegue del backend headless (Strapi Cloud).
 
---
 
## Sobre el proyecto
 
El cliente necesitaba una plataforma para mostrar su catálogo de productos y gestionar el contenido de forma autónoma. Se implementó una arquitectura JAMstack con Nuxt 3 en el frontend consumiendo una API REST de Strapi que yo mismo configuré y desplegué en Strapi Cloud.
 
## Stack tecnológico
 
### Frontend
- **Nuxt 3** — framework Vue con SSR
- **TypeScript** — tipado estático
- **Pinia** — gestión de estado global
- **Tailwind CSS** — estilos utilitarios
- **Flowbite Vue** — componentes UI sobre Tailwind
- **Splide.js** — carruseles y sliders
- **Axios** — cliente HTTP para consumo de API
- **SASS** — preprocesador CSS
### Backend / CMS
- **Strapi** — CMS headless configurado y desplegado en **Strapi Cloud**
- API REST consumida desde el frontend con Axios
## Características
 
- Renderizado del lado del servidor (SSR) para mejor SEO y rendimiento
- Gestión de contenido autónoma para el cliente vía panel de Strapi
- Catálogo de productos dinámico alimentado por la API
- Carruseles de productos e imágenes
- Arquitectura desacoplada frontend/backend
## Arquitectura
 
```
Frontend (Nuxt 3)  ──→  API REST  ──→  Strapi Cloud (CMS headless)
     Vercel / Hosting                   Strapi Cloud
```
 
## Instalación
 
```bash
npm install
npm run dev
```
 
### Variables de entorno
 
```env
NUXT_PUBLIC_API_BASE=https://tu-api.strapiapp.com
```
 
## Aprendizajes clave
 
- Configuración y despliegue de un CMS headless en producción (Strapi Cloud)
- Implementación de SSR con Nuxt 3 para resolver los problemas de SEO presentes en SPAs convencionales
- Gestión de estado con Pinia en una aplicación con múltiples vistas y datos remotos
- Tipado con TypeScript en un proyecto Vue/Nuxt real
## Autor
 
**Julio Martínez**
