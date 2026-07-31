# Portafolio profesional de Aline Peña Colunga

Sitio web estático creado para mostrar experiencia en Ingeniería en Sistemas,
WordPress, marketing digital, CRM, UX/UI, documentación de procesos y análisis de datos.

## Archivos incluidos

- `index.html`: página principal del portafolio.
- `styles.css`: diseño adaptable para computadora y celular.
- `script.js`: menú móvil, animaciones y botón de impresión del CV.
- `cv.html`: versión web del currículum, lista para guardar como PDF.
- `assets/favicon.svg`: ícono del sitio.
- `.nojekyll`: evita que GitHub Pages procese el sitio con Jekyll.

## Antes de compartirlo

Busca en `index.html` y `cv.html` la frase:

> Agrega tu correo y LinkedIn

Reemplázala por tus datos reales. También puedes agregar botones con estas plantillas:

```html
<a href="mailto:TU_CORREO">Correo</a>
<a href="TU_LINKEDIN" target="_blank" rel="noopener noreferrer">LinkedIn</a>
```

No publiques números telefónicos, direcciones o información confidencial si no deseas
que aparezcan en internet.

## Cómo subirlo desde la página de GitHub

1. Entra al repositorio `portafolio-de-trabajo`.
2. Presiona **Add file**.
3. Selecciona **Upload files**.
4. Arrastra todos los archivos y la carpeta `assets`.
5. En la parte inferior escribe un mensaje, por ejemplo:
   `Publicar portafolio profesional`
6. Presiona **Commit changes**.

## Cómo activar GitHub Pages

1. Abre el repositorio.
2. Entra a **Settings**.
3. En el menú lateral selecciona **Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama **main**.
6. Selecciona la carpeta **/(root)**.
7. Presiona **Save**.

Tu dirección será:

`https://alinepc9128.github.io/portafolio-de-trabajo/`

## Cómo crear el PDF del CV

1. Abre `cv.html` desde el portafolio.
2. Presiona **Guardar como PDF**.
3. En la ventana de impresión selecciona **Guardar como PDF**.
4. Guarda el archivo como `CV-Aline-Pena-Colunga.pdf`.

## Personalización rápida

Los colores principales se encuentran al inicio de `styles.css`, dentro de `:root`.

```css
--primary: #7657ff;
--accent: #4bc6b9;
--dark: #0c1222;
```

Puedes cambiar esos valores sin modificar el resto del diseño.
