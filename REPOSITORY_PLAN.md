# Ecosistema de repositorios del portafolio

Este archivo documenta la separación propuesta para convertir el hub en un portafolio técnico con repositorios individuales.

| Repositorio propuesto | Caso | Demo actual | Tecnologías |
|---|---|---|---|
| `angular-ux-command-center` | Centro de leads | `projects/angular-ux-command-center/demo/` | Angular 22, TypeScript, Signals, RxJS, Forms, HttpClient |
| `api-contract-studio` | API de leads | `projects/api-contract-studio/demo/` | Node.js, TypeScript, Express, Zod, OpenAPI, Vitest, Docker |
| `crm-webhook-orchestrator` | Webhook → CRM | `projects/crm-webhook-orchestrator/public/` | PHP 8.3, MySQL, HTTP/JSON, Docker |
| `wordpress-woo-performance-kit` | Plugin CMS | `projects/wordpress-woo-performance-kit/` | PHP, WordPress, REST API, SEO, WooCommerce |
| `ux-service-blueprint` | Caso de UX | `projects/ux-service-blueprint/` | UX Research, Figma, HTML, CSS, JavaScript, accesibilidad |
| `marketing-growth-lab` | Campañas y funnel | `projects/marketing-growth-lab/` | GA4, Tag Manager, SEO, Ads, Mailchimp, Power BI, JavaScript |

## Estado

Las seis implementaciones están preparadas dentro del hub para que sus demos puedan revisarse de inmediato. La conexión actual de GitHub permite escribir en `AlinePC9128/portafolio-de-trabajo`, pero no expone la creación automática de repositorios nuevos. Por eso cada carpeta tiene estructura, README y demo propios; al crear los seis repositorios vacíos, se pueden mover sin reescribir la arquitectura.

## Regla de presentación profesional

Los proyectos Angular, TypeScript, Node y PHP se presentan como casos demostrativos de aprendizaje y práctica técnica. Los proyectos de WordPress, WooCommerce, SEO, CRM, marketing y documentación se basan en experiencia comprobada.
