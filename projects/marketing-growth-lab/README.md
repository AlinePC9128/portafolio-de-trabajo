# Marketing Growth Lab

[Demo pública](https://alinepc9128.github.io/portafolio-de-trabajo/projects/marketing-growth-lab/) · [Portafolio](../../index.html) · [CV](../../cv.html)

Laboratorio de Aline Peña para demostrar análisis de adquisición, medición y experimentación. El conjunto de seis campañas es ficticio y está declarado en core.js. No representa resultados de clientes.

## Criterio de análisis

La pregunta principal es qué campaña convierte inversión en oportunidades aceptadas por Ventas. Los indicadores son consistentes con el mismo conjunto de registros y con el filtro elegido:

- CTR = clics / impresiones.
- CPL = inversión / leads.
- Aceptación = oportunidades / leads.
- Costo por oportunidad = inversión / oportunidades.
- Conversión de página = leads / clics, una simplificación explícita para este ejemplo.

Las tasas totales usan la suma de numeradores y denominadores; no son el promedio de tasas por campaña. Con un denominador cero, el resultado es N/D. La inversión ficticia se expresa en MXN en todos los países. La comparación propone una siguiente revisión; no asigna presupuesto automáticamente.

## Funcionalidad

1. Filtrar campañas por canal/país y exportar el subconjunto en CSV.
2. Construir una URL UTM con la API URL, conservar parámetros y fragmento, y reemplazar UTMs previas.
3. Descargar un plan de medición JSON y simular error, confirmación y repetición de una solicitud ficticia.
4. Comparar dos variantes CRO con validación de conteos y tratamiento de una conversión base cero.

La simulación de medición crea un registro local. No configura Google Tag Manager ni envía información a una propiedad GA4. La política de una sola confirmación corresponde a este flujo de demo; una implementación real necesita su propia persistencia y deduplicación.

## Arquitectura

- core.js: funciones puras, datos de ejemplo y sesión de eventos en memoria. Compatible con navegador y CommonJS.
- app.js: filtros, renderizado con textContent, descargas, mensajes y formularios.
- index.html y styles.css: interfaz responsive, etiquetas de campos, estados y tablas con navegación por teclado.
- test/core.test.cjs: casos de agregación, filtros vacíos, URL/UTM, comparación CRO y repetición de eventos.

## Ejecutar pruebas

```bash
node --test projects/marketing-growth-lab/test/core.test.cjs
```

No requiere paquetes de Node. La demo se sirve como archivos estáticos. La comparación CRO es descriptiva: calcula tasas y cambios, sin inferencia de significancia ni declaración de ganadores.

## Referencias

- [Medición mejorada de GA4](https://support.google.com/analytics/answer/9216061?hl=es).
- [Eventos recomendados de GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm).
