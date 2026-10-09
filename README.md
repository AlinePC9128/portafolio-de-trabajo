# Aline Peña — Growth, web y datos

[Ver portafolio](https://alinepc9128.github.io/portafolio-de-trabajo/) · [Probar Growth Lab](https://alinepc9128.github.io/portafolio-de-trabajo/projects/marketing-growth-lab/) · [CV en versión web](https://alinepc9128.github.io/portafolio-de-trabajo/cv.html) · [Descargar CV original](https://alinepc9128.github.io/portafolio-de-trabajo/assets/Aline-Pena-Colunga-CV.pdf)

Portafolio de Aline Peña Colunga, Ingeniera en Sistemas Computacionales con experiencia en adquisición, paid media, desarrollo web, SEO, analítica, CRM y automatización. La presentación conecta el trabajo publicado con el aporte profesional y con demostraciones navegables.

## Trabajo aplicado

La portada presenta Intersyst, las landings Comunicador de Alarma Universal y Cámara de Interior, automatización con Perfex CRM/Zapier/webhooks y AUTOSISE. Cada caso explica el objetivo, mi aporte y lo que permite revisar el enlace público.

La sección de implementación desarrolla tres áreas de experiencia: mejoras de estructura, contenido, formularios, SEO y catálogo; campañas ejecutadas en Google Ads, Meta Ads y TikTok Ads; y automatizaciones de captación, integración, CRM y comunicación. Incluye navegación directa, herramientas, criterios de seguimiento y enlaces a sitios publicados y demos.

El alcance profesional procede del CV actualizado aportado por Aline (octubre de 2026): aproximadamente 200 leads al mes en seguimiento, 31 integraciones, 3 sitios y 4 landing pages, y más de 200 productos administrados en WooCommerce. Estas cifras describen responsabilidades; el portafolio no las convierte en tasas de crecimiento o ventas inventadas.

## Qué puedes probar

- **Análisis de campañas:** filtros por país y canal, CTR, CPL, aceptación comercial y costo por oportunidad. Los totales y las tasas se calculan desde los registros; el CSV exporta el filtro actual.
- **UTM:** constructor con validación de destinos HTTP/HTTPS, conservación de parámetros ajenos a UTMs y del fragmento, y reemplazo de UTMs antiguas.
- **Medición:** plan propuesto de GA4/GTM y simulación de error, recepción confirmada y confirmación repetida. La simulación usa eventos locales y mantiene una sola conversión por solicitud.
- **CRO:** conversión de dos variantes, diferencia en puntos porcentuales y cambio relativo. Es una comparación descriptiva; no declara significancia estadística.
- **CRM, CMS y UX:** se conservan las demos existentes y sus rutas dentro de projects/ y labs/.

Los datos de Growth Lab son ficticios. La inversión se expresa en MXN en todos los países del escenario para mantener una unidad de comparación. Las demos no usan credenciales, cuentas de anuncios ni información de clientes.

## Habilidades y niveles

Google Ads, Meta Ads, TikTok Ads, GA4, GTM, Search Console, WordPress, Elementor, WooCommerce, Perfex CRM, Zapier, Mailchimp, Excel y Power BI se presentan conforme al CV. Looker Studio se describe como nivel principiante. Angular/TypeScript y Node.js permanecen como práctica técnica.

## Estructura

- index.html, styles.css, script.js: portada, casos, habilidades y navegación.
- cv.html, cv.css, cv.js: versión de lectura del CV actualizado, con descarga del PDF original e impresión de la versión web.
- assets/Aline-Pena-Colunga-CV.pdf: archivo PDF recibido de Aline, conservado sin modificaciones.
- projects/marketing-growth-lab/: laboratorio con core.js (cálculos), app.js (interfaz), README y pruebas.
- projects/: demostraciones existentes de CRM, WordPress, UX, Angular y API.
- labs/: laboratorio técnico existente.
- assets/favicon.svg: identidad visual.
- .github/workflows/deploy-pages.yml: publicación existente de GitHub Pages.

## Revisar localmente

Sitio estático sin build ni dependencias de ejecución. Desde la raíz:

```bash
python3 -m http.server 4173
```

Abre http://localhost:4173. Para ejecutar las pruebas del laboratorio:

```bash
node --test projects/marketing-growth-lab/test/core.test.cjs
```

El workflow existente publica los cambios de main en GitHub Pages. Los formularios del laboratorio ejecutan cálculos y simulaciones locales; el contacto del portafolio abre el correo del visitante.

## Referencias de medición

[Medición mejorada de GA4](https://support.google.com/analytics/answer/9216061?hl=es) · [Eventos recomendados de GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm)

El evento recomendado generate_lead representa la generación de un lead. El plan propone usar la confirmación de recepción como disparador y comprobar la instrumentación automática de formularios antes de añadir eventos manuales.

