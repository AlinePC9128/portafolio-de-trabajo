# Angular UX Command Center

Hub central: [Aline Labs](https://github.com/AlinePC9128/portafolio-de-trabajo/tree/main/labs) · [demo](./demo/)

Centro de seguimiento de leads construido como ejemplo de frontend empresarial. La aplicación demuestra cómo organizar estado, datos, formularios y feedback sin perder claridad de uso.

## Stack

- Angular 22 + TypeScript
- Standalone components
- Signals y `computed()` para estado derivado
- Router y `provideHttpClient()`
- Reactive Forms con validación
- RxJS para la capa de datos
- Demo estática en `demo/` para GitHub Pages

## Qué demuestra

- Panel de métricas y pipeline de oportunidades.
- Filtrado por etapa y búsqueda por texto.
- Formulario tipado para capturar un nuevo lead.
- Estados `loading`, `success`, `empty` y `error`.
- Separación entre componente, servicio y modelos.

La carpeta `src/` contiene el ejemplo Angular real. La carpeta `demo/` es una preview estática para que el caso pueda abrirse sin instalar dependencias en GitHub Pages.

## Ejecutar la versión Angular

```bash
npm install
npm start
```

## Honestidad del caso

Es un proyecto demostrativo para evidenciar la forma de trabajar con Angular y TypeScript. No se presenta como experiencia comercial previa en Angular.

## Escenarios incluidos

- Vista cards y vista tabla para el mismo estado.
- Búsqueda por persona, empresa, fuente o etiqueta.
- Filtro por etapa y responsable, detalle de oportunidad y next best action.
- Alta rápida de leads con feedback inmediato.
- Capa de insights para explicar decisiones de priorización.

## Variantes de implementación

1. `src/`: aplicación Angular real con Signals, `computed()`, Reactive Forms, Router y HttpClient.
2. `demo/`: preview estática sin dependencias para revisión rápida.
3. Fallback local en `LeadService` para mantener la UX útil aunque la API no responda.
