# Aline Peña — Portfolio técnico

Portafolio demostrativo de Aline Peña, Ingeniera en Sistemas y WordPress Developer. El proyecto está diseñado para presentar experiencia en WordPress, UX/UI, frontend, integraciones, APIs, SEO, analítica y marketing digital mediante ejemplos navegables.

## Qué demuestra

- **UX/UI:** proceso Discover → Organize → Prototype → Validate, arquitectura de información, user flows, wireframes y diseño responsive.
- **Frontend:** HTML semántico, CSS responsive, componentes visuales, estados de interfaz, filtros, modal, navegación móvil y tema claro/oscuro.
- **APIs:** demo funcional con `fetch()`, endpoint REST público, JSON, manejo de loading/error/fallback y filtrado de resultados.
- **WordPress y WooCommerce:** casos de Intersyst y AUTOSISE, Elementor, formularios, SEO, catálogo y experiencia mobile-first.
- **Backend e integraciones:** caso de Clientes_SAE, Perfex CRM, PHP/MySQL, HTTP/POST, webhooks y Zapier.
- **Marketing digital:** campañas, SEO, GA4, Tag Manager, Search Console, Ads, Mailchimp y reportes.
- **Accesibilidad básica:** HTML semántico, etiquetas de formulario, `aria-*`, navegación con teclado y soporte para `prefers-reduced-motion`.

La página `cv.html` contiene una versión breve del perfil profesional, preparada para abrirse en el navegador y guardarse como PDF.

## Laboratorio de proyectos

La ruta `labs/index.html` enlaza seis casos demostrativos independientes: Angular/TypeScript, API Node, CRM/webhooks, WordPress/WooCommerce, UX/UI y marketing digital. La matriz técnica y la estrategia para separar cada caso en su propio repositorio están en `REPOSITORY_PLAN.md`.

## Estructura

```text
.
├── index.html
├── styles.css
├── script.js
├── cv.html
├── assets/favicon.svg
├── README.md
├── .nojekyll
└── .github/workflows/deploy-pages.yml
```

## Ejecutar localmente

No requiere framework ni instalación de dependencias. Puedes abrir `index.html` directamente o levantar un servidor local:

```bash
python3 -m http.server 4173
```

Después visita `http://localhost:4173`.

## Nota de honestidad profesional

El portafolio separa experiencia comprobada de tecnologías que Aline está fortaleciendo. Gutenberg/FSE, React, REST API, WP-CLI y CI/CD aparecen como áreas de desarrollo continuo y como demos de aprendizaje; no se presentan como años de experiencia avanzada.

## Publicar en GitHub Pages

El workflow incluido puede desplegar el sitio cuando el repositorio tenga GitHub Pages configurado con **GitHub Actions** como fuente. El proyecto no utiliza secretos ni datos de clientes.
