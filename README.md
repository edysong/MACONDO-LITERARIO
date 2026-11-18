# Macondo Literario — página del club de lectura

Landing de una sola página para el club de lectura **Macondo Literario**, sobre *Cien años de soledad*
de Gabriel García Márquez. HTML, CSS y JavaScript puros: no hay que instalar ni compilar nada.

Para verla, basta con abrir `index.html` con doble clic.

```
index.html              Estructura de la página
css/styles.css          Estilos (colores, tipografías, responsive)
js/data.js              👉 TODO EL CONTENIDO EDITABLE (textos, links, videos)
js/main.js              Renderizado e interacción (carrusel, lightbox, formulario…)
assets/img/posters/     Los 3 pósters
assets/img/memes/       Los 3 memes
assets/img/infografias/ Línea de tiempo del autor, contexto histórico, línea de tiempo de la obra
assets/video/           Los videos del club y sus miniaturas (poster-N.jpg)
assets/docs/            PDF del contexto histórico y de la línea de tiempo
contenido/contenido.md  Fuente original de los textos
referencia/             Consigna y wireframe
```

---

## 1. Cómo editar el contenido

Todo el texto de la página sale de **`js/data.js`**. Se abre con el Bloc de notas o con
VS Code, se cambia lo que haga falta entre comillas, se guarda y se recarga la página en el navegador.

> Regla de oro: cambia solo lo que está **entre comillas**. No borres las comas, las comillas
> ni las llaves `{ }`. Si algo se rompe, la página se ve en blanco: deshaz el último cambio
> (Ctrl + Z) y vuelve a guardar.

Los campos que faltan por llenar están vacíos (`""`) y marcados con el comentario `// COMPLETAR`.

### Lo que falta completar

Quedan pendientes las redes sociales, el destino del formulario y los datos del equipo.
Los videos ya están listos.

**a) Los videos (ya están los tres)**

Los tres videos del club están en `assets/video/` y se reproducen dentro de la misma página,
sin YouTube y sin necesidad de internet. No hay nada pendiente aquí.

*Para cambiar un video:* reemplaza el archivo en `assets/video/` conservando el nombre
(`video-1.mp4`, `video-2.mp4`, `video-3.mp4`) y, si cambia la duración, actualízala en `js/data.js`.

*Para añadir uno más:* copia el archivo a `assets/video/` y duplica un bloque en `videos.lista`:

```js
{
  titulo: "Título del video",
  descripcion: "Una línea explicando de qué trata.",
  archivo: "assets/video/video-4.mp4",
  poster: "",            // opcional: imagen de portada
  duracion: "0:35",      // opcional: se muestra sobre la miniatura
  vertical: true,        // false si el video es apaisado
  youtubeId: ""
}
```

También puedes enlazar uno desde YouTube en vez de subirlo: deja `archivo: ""` y pon en
`youtubeId` la parte del enlace que va **después de `v=`**
(`https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`).
Si un video no tiene ni `archivo` ni `youtubeId`, su tarjeta aparece como «Próximamente»
y la página sigue funcionando igual.

> Los videos del club son verticales (formato reel), por eso el reproductor es vertical.
> Si subes uno apaisado, pon `vertical: false` y el reproductor se adapta.
> Conviene que cada archivo no pase de unos 20 MB (GitHub no admite más de 100 MB por archivo).

**b) Instagram y TikTok**

En `redes.cuentas`:

```js
{ red: "Instagram", usuario: "@macondo.literario", url: "https://www.instagram.com/macondo.literario" }
```

Si la `url` está vacía, el botón aparece como «Próximamente» y desaparece del pie de página.

**c) El formulario de inscripción**

En `formulario` hay dos opciones; basta con una:

- **Formspree** (recomendado): crea un formulario gratis en [formspree.io](https://formspree.io),
  copia el id de tu endpoint (`https://formspree.io/f/xayzbqwe` → el id es `xayzbqwe`) y ponlo en
  `formspreeId: "xayzbqwe"`. Los datos llegan al correo del club.
- **Correo**: deja `formspreeId: ""` y escribe el correo en `email: "clubmacondo@ejemplo.com"`.
  Al enviar, se abre el programa de correo del visitante con el mensaje ya escrito.

También puedes llenar `lugar` y `hora`; si los dejas vacíos, simplemente no se muestran.

**d) El equipo**

En `footer`:

```js
integrantes: ["Nombre Apellido", "Nombre Apellido", "Nombre Apellido"],
curso: "Nombre del curso · Institución",
```

### Otros cambios habituales

| Qué quieres cambiar | Dónde |
|---|---|
| Lema, fechas, texto del hero | `identidad` |
| Las 4 razones para unirse | `porQue.razones` |
| Hitos de la vida del autor | `autor.hitos` |
| Contexto histórico, tabla e ideas | `laObra.contexto` |
| Los 12 hitos de la obra | `laObra.lineaTiempo.hitos` |
| Link del mapa de personajes | `laObra.mapaPersonajes.url` |
| Pies de los memes | `redes.memes` |

Para **cambiar una imagen**, reemplaza el archivo dentro de `assets/` conservando el mismo nombre,
o cambia la ruta en `js/data.js`. Describe siempre la imagen en su campo `alt`: es lo que leen
las personas que usan lector de pantalla.

---

## 2. Cómo publicar la página

El repositorio es <https://github.com/edysong/MACONDO-LITERARIO> y la página se publica en Vercel.

### Paso 1 — Subir los cambios a GitHub

Desde la carpeta del proyecto, en la terminal:

```bash
git add -A
git commit -m "Actualiza el contenido"
git push
```

(La primera vez, si aún no está enlazado el repositorio:
`git remote add origin https://github.com/edysong/MACONDO-LITERARIO.git` y luego `git push -u origin main`.)

Quien prefiera no usar la terminal puede subir los archivos desde la web de GitHub, con
*Add file → Upload files*, arrastrando la carpeta completa.

### Paso 2 — Publicar en Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con la cuenta de GitHub.
2. **Add New → Project** y elige el repositorio `MACONDO-LITERARIO`.
3. En *Framework Preset* deja **Other**. No hay que tocar nada más:
   *Build Command* y *Output Directory* se quedan vacíos, porque la página no se compila.
4. Pulsa **Deploy**. En menos de un minuto queda publicada en
   `https://macondo-literario.vercel.app` (el nombre se puede cambiar en *Settings → Domains*).

A partir de ahí, **cada `git push` republica la página sola**. Vercel además deja una vista previa
de cada cambio antes de tocar la dirección principal.

### Alternativas

- **GitHub Pages:** en el repositorio, *Settings → Pages*, en *Source* elige
  **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Queda en
  `https://edysong.github.io/MACONDO-LITERARIO/`.
- **Netlify:** entra en [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta
  del proyecto. Da una dirección al instante, sin repositorio.

### Enviar el trabajo sin publicar

Comprime la carpeta en un `.zip` y envíala: quien la reciba solo tiene que descomprimirla y abrir
`index.html`. La página funciona sin internet, salvo las tipografías de Google y los videos de
YouTube, que necesitan conexión.

---

## 3. Detalles técnicos

- Sin frameworks, sin dependencias y sin paso de compilación. Funciona con `file://` y en cualquier hosting estático.
- Responsive de 360 px a 1440 px; menú hamburguesa por debajo de 1024 px.
- Accesibilidad: un solo `h1`, `alt` en todas las imágenes, foco visible, navegación por teclado
  (el lightbox se cierra con `Esc` y se recorre con las flechas) y soporte de `prefers-reduced-motion`
  (quien tenga activada esa opción no ve las animaciones ni las mariposas).
- Los videos propios se reproducen con la etiqueta `<video>` del navegador (`preload="metadata"`:
  solo se descarga el video cuando alguien le da a reproducir). Los de YouTube usan
  `youtube-nocookie.com` y se cargan únicamente al seleccionarlos.
- Las imágenes usan carga diferida (`loading="lazy"`), menos el primer póster, y llevan sus medidas
  reales declaradas para que la página no «salte» mientras cargan.
- La tabla «Macondo y la realidad» se convierte en tarjetas por debajo de 560 px, para no obligar
  a desplazar de lado en el celular.

### Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| La página se ve en blanco | Hay un error de sintaxis en `js/data.js`: falta una coma o una comilla. Abre la consola del navegador con `F12` para ver la línea. |
| Las tipografías se ven distintas | No hay internet. Se usan tipografías de respaldo; con conexión vuelven a la normalidad. |
| Un video no aparece | Revisa la ruta de `archivo` en `js/data.js` o, si usas YouTube, que el `youtubeId` sea solo el código y no el enlace completo. |
| Un video se ve con franjas negras | Es la proporción del archivo. Si el video es apaisado, pon `vertical: false` en `js/data.js`. |
| El formulario no envía nada | Falta `formspreeId` o `email` en `js/data.js`. |
| Una imagen no carga | Revisa que el nombre del archivo en `assets/` coincida exactamente con el de `js/data.js` (mayúsculas incluidas). |
