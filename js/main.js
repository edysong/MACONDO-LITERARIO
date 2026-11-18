/* ==========================================================================
   MACONDO LITERARIO — Renderizado e interacción
   Todo el contenido se lee de SITE (js/data.js). Este archivo no tiene textos
   editables salvo mensajes de interfaz muy puntuales.
   ========================================================================== */
(function () {
  "use strict";

  /* --------------------------------------------------------- Utilidades */
  var $ = function (id) { return document.getElementById(id); };
  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function texto(el, valor) { if (el) { el.textContent = valor || ""; } }

  function crear(tag, clase, contenido) {
    var el = document.createElement(tag);
    if (clase) { el.className = clase; }
    if (contenido !== undefined && contenido !== null) { el.textContent = contenido; }
    return el;
  }

  function iconoRed(red) {
    var r = (red || "").toLowerCase();
    if (r.indexOf("insta") === 0) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false">' +
        '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>';
    }
    if (r.indexOf("tik") === 0) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
        '<path d="M16.5 3h-2.7v12.1a2.6 2.6 0 1 1-2.1-2.55V9.8a5.6 5.6 0 1 0 4.8 5.54V9.1a6.6 6.6 0 0 0 3.6 1.07V7.5a3.9 3.9 0 0 1-3.6-3.9z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false">' +
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>';
  }

  /* =========================================================== LIGHTBOX */
  var Lightbox = (function () {
    var caja = $("lightbox");
    var img = $("lightbox-img");
    var pie = $("lightbox-pie");
    var btnCerrar = $("lightbox-cerrar");
    var btnPrev = $("lightbox-prev");
    var btnNext = $("lightbox-next");
    var galeria = [];
    var indice = 0;
    var ultimoFoco = null;

    function pintar() {
      var item = galeria[indice];
      if (!item) { return; }
      img.src = item.src;
      img.alt = item.alt || "";
      pie.textContent = item.pie || "";
      pie.hidden = !item.pie;
      var varios = galeria.length > 1;
      btnPrev.style.visibility = varios ? "visible" : "hidden";
      btnNext.style.visibility = varios ? "visible" : "hidden";
    }

    function abrir(items, i) {
      galeria = items || [];
      indice = i || 0;
      if (!galeria.length) { return; }
      ultimoFoco = document.activeElement;
      caja.hidden = false;
      document.body.classList.add("sin-scroll");
      pintar();
      btnCerrar.focus();
    }

    function cerrar() {
      caja.hidden = true;
      img.removeAttribute("src");
      document.body.classList.remove("sin-scroll");
      if (ultimoFoco && ultimoFoco.focus) { ultimoFoco.focus(); }
    }

    function mover(paso) {
      if (!galeria.length) { return; }
      indice = (indice + paso + galeria.length) % galeria.length;
      pintar();
    }

    btnCerrar.addEventListener("click", cerrar);
    btnPrev.addEventListener("click", function () { mover(-1); });
    btnNext.addEventListener("click", function () { mover(1); });
    caja.addEventListener("click", function (e) { if (e.target === caja) { cerrar(); } });
    document.addEventListener("keydown", function (e) {
      if (caja.hidden) { return; }
      if (e.key === "Escape") { cerrar(); }
      else if (e.key === "ArrowLeft") { mover(-1); }
      else if (e.key === "ArrowRight") { mover(1); }
      else if (e.key === "Tab") {
        // Foco atrapado dentro del lightbox
        var focos = [btnCerrar, btnPrev, btnNext];
        var pos = focos.indexOf(document.activeElement);
        e.preventDefault();
        var sig = e.shiftKey ? pos - 1 : pos + 1;
        if (sig < 0) { sig = focos.length - 1; }
        if (sig >= focos.length) { sig = 0; }
        focos[sig].focus();
      }
    });

    return { abrir: abrir };
  })();

  /* =========================================================== 0 · HEADER */
  function renderHeader() {
    texto($("logo-nombre"), SITE.identidad.nombre1);
    texto($("logo-sub"), SITE.identidad.nombre2);

    var lista = $("nav-lista");
    var footerNav = $("footer-nav");
    SITE.nav.forEach(function (item, i) {
      var li = crear("li", i === SITE.nav.length - 1 ? "nav__cta" : "");
      var a = crear("a", "", item.texto);
      a.href = item.href;
      li.appendChild(a);
      lista.appendChild(li);

      var liF = crear("li");
      var aF = crear("a", "", item.texto);
      aF.href = item.href;
      liF.appendChild(aF);
      footerNav.appendChild(liF);
    });

    var toggle = $("nav-toggle");
    var menu = $("nav-menu");
    var fondo = $("nav-backdrop");

    function cerrarMenu() {
      menu.classList.remove("abierto");
      toggle.setAttribute("aria-expanded", "false");
      fondo.hidden = true;
      document.body.classList.remove("sin-scroll");
    }
    function alternarMenu() {
      var abierto = menu.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      fondo.hidden = !abierto;
      document.body.classList.toggle("sin-scroll", abierto);
    }

    toggle.addEventListener("click", alternarMenu);
    fondo.addEventListener("click", cerrarMenu);
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { cerrarMenu(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("abierto")) {
        cerrarMenu();
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) { cerrarMenu(); }
    });
  }

  /* =========================================================== 1 · HERO */
  function renderHero() {
    var id = SITE.identidad;
    texto($("hero-antetitulo"), id.antetitulo);
    texto($("hero-titulo-1"), id.nombre1);
    texto($("hero-titulo-2"), id.nombre2);
    texto($("hero-lema"), "«" + id.lema + "»");
    texto($("hero-descripcion"), id.descripcionHero);
    texto($("hero-fechas-dias"), id.fechas.join(" | "));
    texto($("hero-fechas-mes"), id.fechasTexto);
    texto($("hero-cta"), id.cta);
    $("hero-fechas").setAttribute("aria-label", "Fechas de los encuentros: " + id.fechas.join(", ") + " de " + id.fechasTexto);
  }

  function renderCarrusel() {
    var pista = $("carrusel-pista");
    var puntos = $("carrusel-puntos");
    var slides = [];
    var botones = [];
    var actual = 0;
    var galeria = SITE.posters.map(function (p) {
      return { src: p.img, alt: p.alt, pie: p.titulo };
    });

    SITE.posters.forEach(function (poster, i) {
      var li = crear("li", "carrusel__slide" + (i === 0 ? " activo" : ""));
      li.id = "poster-" + i;
      li.setAttribute("role", "tabpanel");
      li.setAttribute("aria-label", poster.titulo);
      var btn = crear("button", "carrusel__boton");
      btn.type = "button";
      btn.setAttribute("aria-label", "Ampliar " + poster.titulo);
      var img = new Image();
      img.src = poster.img;
      img.alt = poster.alt;
      img.width = poster.w || 620; img.height = poster.h || 1040;
      if (i > 0) { img.loading = "lazy"; }
      btn.appendChild(img);
      btn.addEventListener("click", function () { Lightbox.abrir(galeria, i); });
      li.appendChild(btn);
      pista.appendChild(li);
      slides.push(li);

      var punto = crear("button", "carrusel__punto");
      punto.type = "button";
      punto.setAttribute("role", "tab");
      punto.setAttribute("aria-selected", i === 0 ? "true" : "false");
      punto.setAttribute("aria-controls", "poster-" + i);
      punto.setAttribute("aria-label", "Ver " + poster.titulo);
      punto.addEventListener("click", function () { ir(i); });
      puntos.appendChild(punto);
      botones.push(punto);
    });

    function ir(i) {
      actual = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("activo", n === actual); });
      botones.forEach(function (b, n) { b.setAttribute("aria-selected", n === actual ? "true" : "false"); });
    }

    $("carrusel-prev").addEventListener("click", function () { ir(actual - 1); reiniciar(); });
    $("carrusel-next").addEventListener("click", function () { ir(actual + 1); reiniciar(); });

    // Deslizar con el dedo
    var x0 = null;
    var marco = pista.parentElement;
    marco.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    marco.addEventListener("touchend", function (e) {
      if (x0 === null) { return; }
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { ir(actual + (dx < 0 ? 1 : -1)); reiniciar(); }
      x0 = null;
    });

    // Avance automático
    var temporizador = null;
    function reiniciar() {
      if (sinMovimiento) { return; }
      clearInterval(temporizador);
      temporizador = setInterval(function () { ir(actual + 1); }, 6500);
    }
    function detener() { clearInterval(temporizador); }
    marco.addEventListener("mouseenter", detener);
    marco.addEventListener("mouseleave", reiniciar);
    marco.addEventListener("focusin", detener);
    marco.addEventListener("focusout", reiniciar);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { detener(); } else { reiniciar(); }
    });
    reiniciar();
  }

  function renderMariposas() {
    if (sinMovimiento) { return; }
    var caja = $("mariposas");
    var svg = '<svg viewBox="0 0 32 24" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<path d="M15.6 12c-1.6-4-4.4-8.4-8-9.6C4 1.2 1.6 3.6 2 7.2c.4 3.6 4.8 6.4 9.2 7.6-3.2.8-6.8 2.8-7.2 6 -.3 2.6 1.8 4.2 4.2 3.2 2.8-1.2 5.6-5.2 7.4-8.8z"/>' +
      '<path d="M16.4 12c1.6-4 4.4-8.4 8-9.6C28 1.2 30.4 3.6 30 7.2c-.4 3.6-4.8 6.4-9.2 7.6 3.2.8 6.8 2.8 7.2 6 .3 2.6-1.8 4.2-4.2 3.2-2.8-1.2-5.6-5.2-7.4-8.8z"/></svg>';
    for (var i = 0; i < 6; i++) {
      var m = crear("span", "mariposa");
      m.innerHTML = svg;
      m.style.left = (5 + Math.random() * 70) + "%";
      m.style.bottom = (-10 + Math.random() * 30) + "%";
      m.style.width = (16 + Math.random() * 16) + "px";
      m.style.height = m.style.width;
      m.style.animationDuration = (16 + Math.random() * 14) + "s";
      m.style.animationDelay = (i * 2.4) + "s";
      caja.appendChild(m);
    }
  }

  /* =========================================================== 2 · ¿POR QUÉ UNIRTE? */
  function renderPorQue() {
    var d = SITE.porQue;
    texto($("porque-titulo"), d.titulo);
    texto($("porque-intro"), d.intro);
    texto($("porque-boton"), d.boton.texto);
    $("porque-boton").href = d.boton.href;

    var lista = $("razones");
    d.razones.forEach(function (r) {
      var li = crear("li", "razon revelar");
      var ico = crear("span", "razon__icono", r.emoji);
      ico.setAttribute("aria-hidden", "true");
      li.appendChild(ico);
      li.appendChild(crear("h3", "razon__titulo", r.titulo));
      li.appendChild(crear("p", "razon__texto", r.texto));
      lista.appendChild(li);
    });
  }

  /* =========================================================== 3 · EL AUTOR */
  function renderAutor() {
    var a = SITE.autor;
    texto($("autor-titulo"), a.titulo);
    texto($("autor-nombre"), a.nombre);
    texto($("autor-anios"), a.anios);
    texto($("autor-intro"), a.intro);
    texto($("autor-cierre"), "«" + a.cierre + "»");

    var cita = $("autor-cita");
    cita.appendChild(crear("p", "", "“" + a.cita + "”"));
    cita.appendChild(crear("footer", "", "— " + a.citaAutor));

    var dest = $("autor-destacados");
    a.destacados.forEach(function (d) {
      var li = crear("li", "destacado");
      li.appendChild(crear("h3", "", d.titulo));
      li.appendChild(crear("p", "", d.texto));
      dest.appendChild(li);
    });

    var tl = $("autor-timeline");
    a.hitos.forEach(function (h) {
      var li = crear("li", "timeline__item revelar");
      li.appendChild(crear("span", "timeline__anio", h.anio));
      li.appendChild(crear("p", "timeline__texto", h.texto));
      tl.appendChild(li);
    });

    var img = $("autor-imagen");
    img.src = a.infografia.img;
    img.alt = a.infografia.alt;
    if (a.infografia.w) { img.width = a.infografia.w; img.height = a.infografia.h; }
    texto($("autor-figcaption"), "Línea de tiempo de " + a.nombre);

    var galeria = [{ src: a.infografia.img, alt: a.infografia.alt, pie: "Línea de tiempo de " + a.nombre }];
    function abrir() { Lightbox.abrir(galeria, 0); }
    $("autor-imagen-btn").addEventListener("click", abrir);
    var btn = $("autor-infografia-btn");
    texto(btn, a.infografia.boton);
    btn.addEventListener("click", abrir);
  }

  /* =========================================================== 4 · VIDEOS */
  function renderVideos() {
    var v = SITE.videos;
    texto($("videos-titulo"), v.titulo);
    texto($("videos-intro"), v.intro);

    var marco = $("reproductor-marco");
    var lista = $("videos-lista");
    var tarjetas = [];
    var hayPendientes = false;
    var hayDisponible = function (video) { return !!(video.archivo || video.youtubeId); };

    function reproducir(i, reproducirYa) {
      var video = v.lista[i];
      marco.innerHTML = "";
      marco.classList.toggle("reproductor__marco--vertical", video.vertical !== false);

      if (video.archivo) {
        // Video alojado en la propia página (assets/video/)
        var el = document.createElement("video");
        el.src = video.archivo;
        el.controls = true;
        el.preload = "metadata";
        el.playsInline = true;
        el.setAttribute("playsinline", "");
        el.setAttribute("controlsList", "nodownload");
        if (video.poster) { el.poster = video.poster; }
        el.setAttribute("aria-label", "Video: " + video.titulo);
        marco.appendChild(el);
        if (reproducirYa) {
          var promesa = el.play();
          if (promesa && promesa.catch) { promesa.catch(function () { /* el navegador pide un gesto: no pasa nada */ }); }
        }
      } else if (video.youtubeId) {
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + video.youtubeId + "?rel=0" + (reproducirYa ? "&autoplay=1" : "");
        iframe.title = video.titulo;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        marco.appendChild(iframe);
      } else {
        var vacio = crear("div", "reproductor__vacio");
        vacio.appendChild(crear("strong", "", "Próximamente"));
        vacio.appendChild(crear("span", "", video.titulo + " · Este video se publicará pronto."));
        marco.appendChild(vacio);
      }

      texto($("reproductor-titulo"), video.titulo);
      texto($("reproductor-descripcion"), video.descripcion);
      tarjetas.forEach(function (t, n) { t.setAttribute("aria-pressed", n === i ? "true" : "false"); });
    }

    v.lista.forEach(function (video, i) {
      var disponible = hayDisponible(video);
      if (!disponible) { hayPendientes = true; }

      var li = crear("li", "revelar");
      var btn = crear("button", "video-card" + (disponible ? "" : " video-card--pendiente"));
      btn.type = "button";
      btn.setAttribute("aria-pressed", "false");

      // Miniatura: fotograma del video o marcador con el número
      var mini = crear("span", "video-card__mini");
      mini.setAttribute("aria-hidden", "true");
      if (video.poster) {
        var img = new Image();
        img.src = video.poster;
        img.alt = "";
        img.loading = "lazy";
        img.width = 108; img.height = 144;
        mini.appendChild(img);
      } else {
        mini.appendChild(crear("span", "video-card__mini-num", String(i + 1)));
      }
      mini.appendChild(crear("span", "video-card__play", disponible ? "▶" : "·"));
      if (video.duracion) { mini.appendChild(crear("span", "video-card__duracion", video.duracion)); }
      btn.appendChild(mini);

      var caja = crear("span", "video-card__texto");
      caja.appendChild(crear("span", "video-card__titulo", (i + 1) + ". " + video.titulo));
      caja.appendChild(crear("span", "video-card__desc", video.descripcion));
      if (!disponible) { caja.appendChild(crear("span", "video-card__estado", "Próximamente")); }
      btn.appendChild(caja);

      btn.addEventListener("click", function () { reproducir(i, true); });
      li.appendChild(btn);
      lista.appendChild(li);
      tarjetas.push(btn);
    });

    // Empieza en el primer video disponible
    var inicial = 0;
    for (var i = 0; i < v.lista.length; i++) {
      if (hayDisponible(v.lista[i])) { inicial = i; break; }
    }
    reproducir(inicial, false);

    var nota = $("videos-nota");
    if (hayPendientes) { texto(nota, v.nota); } else { nota.hidden = true; }
  }

  /* =========================================================== 5 · LA OBRA */
  function renderObra() {
    var o = SITE.laObra;
    texto($("obra-titulo"), o.titulo);
    texto($("obra-intro"), o.intro);
    renderContexto(o.contexto);
    renderLineaObra(o.lineaTiempo);
    renderMapa(o.mapaPersonajes);
  }

  function renderContexto(c) {
    texto($("contexto-titulo"), c.titulo);
    texto($("contexto-intro"), c.intro);

    var etiquetas = $("contexto-etiquetas");
    c.etiquetas.forEach(function (e) { etiquetas.appendChild(crear("li", "etiqueta", e)); });

    var hitos = $("contexto-hitos");
    c.hitos.forEach(function (h) {
      var li = crear("li", "contexto-hito");
      li.appendChild(crear("span", "contexto-hito__periodo", h.periodo));
      li.appendChild(crear("h4", "contexto-hito__titulo", h.titulo));
      li.appendChild(crear("p", "contexto-hito__texto", h.texto));
      hitos.appendChild(li);
    });

    // Tabla "Macondo y la realidad"
    texto($("contexto-tabla-titulo"), c.tabla.titulo);
    var tabla = $("contexto-tabla");
    var thead = document.createElement("thead");
    var trh = document.createElement("tr");
    c.tabla.encabezados.forEach(function (th) {
      var celda = crear("th", "", th);
      celda.scope = "col";
      trh.appendChild(celda);
    });
    thead.appendChild(trh);
    tabla.appendChild(thead);
    var tbody = document.createElement("tbody");
    c.tabla.filas.forEach(function (fila) {
      var tr = document.createElement("tr");
      fila.forEach(function (celda, n) {
        var td = crear("td", "", celda);
        // En móvil la tabla se convierte en tarjetas y este rótulo sustituye al encabezado
        td.setAttribute("data-label", c.tabla.encabezados[n] || "");
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);

    // Ideas clave
    texto($("ideas-titulo"), c.ideas.titulo);
    var ideas = $("ideas-lista");
    c.ideas.lista.forEach(function (i) {
      var li = crear("li", "idea");
      li.appendChild(crear("h5", "", i.titulo));
      li.appendChild(crear("p", "", i.texto));
      ideas.appendChild(li);
    });

    // Imagen + PDF
    var img = $("contexto-imagen");
    img.src = c.img;
    img.alt = c.alt;
    if (c.w) { img.width = c.w; img.height = c.h; }
    var galeria = [{ src: c.img, alt: c.alt, pie: c.titulo }];
    function abrir() { Lightbox.abrir(galeria, 0); }
    $("contexto-imagen-btn").addEventListener("click", abrir);
    var btnImg = $("contexto-ver-img");
    texto(btnImg, c.botonImagen);
    btnImg.addEventListener("click", abrir);
    var btnPdf = $("contexto-ver-pdf");
    texto(btnPdf, c.botonPdf);
    btnPdf.href = c.pdf;
  }

  function renderLineaObra(l) {
    texto($("linea-titulo"), l.titulo);
    texto($("linea-intro"), l.intro);

    var lista = $("linea-hitos");
    l.hitos.forEach(function (h, i) {
      var li = crear("li", "zigzag__item");
      var num = crear("span", "zigzag__num", String(i + 1));
      num.setAttribute("aria-hidden", "true");
      li.appendChild(num);
      li.appendChild(crear("h4", "zigzag__titulo", h.titulo));
      li.appendChild(crear("p", "zigzag__texto", h.texto));
      lista.appendChild(li);
    });

    var galeria = [{ src: l.img, alt: l.alt, pie: l.titulo }];
    var btnImg = $("linea-ver-img");
    texto(btnImg, l.botonImagen);
    btnImg.addEventListener("click", function () { Lightbox.abrir(galeria, 0); });
    var btnPdf = $("linea-ver-pdf");
    texto(btnPdf, l.botonPdf);
    btnPdf.href = l.pdf;
  }

  function renderMapa(m) {
    texto($("mapa-titulo"), m.titulo);
    texto($("mapa-texto"), m.texto);
    var btn = $("mapa-boton");
    texto(btn, m.boton);
    if (m.url) {
      btn.href = m.url;
    } else {
      btn.removeAttribute("href");
      btn.setAttribute("aria-disabled", "true");
      texto(btn, "Próximamente");
    }
  }

  /* =========================================================== 6 · REDES Y MEMES */
  function renderRedes() {
    var r = SITE.redes;
    texto($("redes-titulo"), r.titulo);
    texto($("redes-intro"), r.intro);
    texto($("feed-usuario"), r.usuarioFeed ? "@" + r.usuarioFeed : SITE.identidad.nombreCompleto);

    // Botones de redes
    var botones = $("redes-botones");
    var footerRedes = $("footer-redes");
    r.cuentas.forEach(function (c) {
      var li = crear("li");
      var a = document.createElement("a");
      a.className = "red-boton";
      a.innerHTML = '<span class="red-boton__icono">' + iconoRed(c.red) + "</span>";
      var txt = crear("span", "red-boton__texto");
      txt.appendChild(crear("span", "red-boton__red", c.red));
      txt.appendChild(crear("span", "red-boton__usuario", c.url ? (c.usuario || "Síguenos") : "Próximamente"));
      a.appendChild(txt);
      if (c.url) {
        a.href = c.url;
        a.target = "_blank";
        a.rel = "noopener";
      } else {
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("role", "link");
      }
      li.appendChild(a);
      botones.appendChild(li);

      if (c.url) {
        var liF = crear("li");
        var aF = document.createElement("a");
        aF.href = c.url;
        aF.target = "_blank";
        aF.rel = "noopener";
        aF.innerHTML = iconoRed(c.red) + '<span class="sr-only">' + c.red + "</span>";
        liF.appendChild(aF);
        footerRedes.appendChild(liF);
      }
    });

    // Feed de memes dentro del celular
    var feed = $("feed");
    var puntos = $("feed-puntos");
    var galeria = r.memes.map(function (m) { return { src: m.img, alt: m.alt, pie: m.pie }; });
    var botonesPunto = [];

    r.memes.forEach(function (meme, i) {
      var li = crear("li", "feed__item");
      var btn = crear("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Ampliar meme " + (i + 1));
      var img = new Image();
      img.src = meme.img;
      img.alt = meme.alt;
      img.loading = "lazy";
      img.width = meme.w || 800; img.height = meme.h || 1000;
      btn.appendChild(img);
      btn.addEventListener("click", function () { Lightbox.abrir(galeria, i); });
      li.appendChild(btn);
      li.appendChild(crear("p", "feed__pie", meme.pie));
      feed.appendChild(li);

      var p = crear("button", "feed__punto");
      p.type = "button";
      p.setAttribute("role", "tab");
      p.setAttribute("aria-selected", i === 0 ? "true" : "false");
      p.setAttribute("aria-label", "Ver meme " + (i + 1));
      p.addEventListener("click", function () {
        feed.scrollTo({ left: i * feed.clientWidth, behavior: sinMovimiento ? "auto" : "smooth" });
      });
      puntos.appendChild(p);
      botonesPunto.push(p);
    });

    feed.addEventListener("scroll", function () {
      var ancho = feed.clientWidth || 1;
      var activo = Math.round(feed.scrollLeft / ancho);
      botonesPunto.forEach(function (b, n) { b.setAttribute("aria-selected", n === activo ? "true" : "false"); });
    }, { passive: true });
  }

  /* =========================================================== 7 · ÚNETE */
  function renderFormulario() {
    var f = SITE.formulario;
    texto($("unete-titulo"), f.titulo);
    texto($("unete-intro"), f.intro);

    // Fechas de los encuentros
    var encuentros = $("encuentros");
    SITE.identidad.fechasLargas.forEach(function (fecha, i) {
      var li = crear("li", "encuentro");
      var num = crear("span", "encuentro__num", String(i + 1));
      num.setAttribute("aria-hidden", "true");
      li.appendChild(num);
      li.appendChild(crear("span", "encuentro__texto", fecha));
      encuentros.appendChild(li);
    });

    var extra = $("datos-extra");
    if (f.lugar) { extra.appendChild(crear("li", "", "📍 " + f.lugar)); }
    if (f.hora) { extra.appendChild(crear("li", "", "🕒 " + f.hora)); }

    // Etiquetas
    texto($("label-nombre"), f.etiquetas.nombre);
    texto($("label-correo"), f.etiquetas.correo);
    texto($("label-fecha"), f.etiquetas.fecha);
    texto($("label-mensaje"), f.etiquetas.mensaje);
    texto($("form-enviar"), f.etiquetas.enviar);

    var select = $("campo-fecha");
    var vacia = crear("option", "", "Elige una fecha");
    vacia.value = "";
    vacia.disabled = true;
    vacia.selected = true;
    select.appendChild(vacia);
    f.fechasOpciones.forEach(function (op) {
      var o = crear("option", "", op);
      o.value = op;
      select.appendChild(o);
    });

    var form = $("formulario");
    var exito = $("form-exito");
    var aviso = $("form-aviso");
    var enviar = $("form-enviar");
    var http = location.protocol === "http:" || location.protocol === "https:";

    if (f.formspreeId) {
      form.action = "https://formspree.io/f/" + f.formspreeId;
      form.method = "POST";
    } else if (!f.email) {
      aviso.hidden = false;
      texto(aviso, f.avisoSinDestino);
      enviar.disabled = true;
    }

    function validar() {
      var ok = true;
      [["campo-nombre", "error-nombre"], ["campo-correo", "error-correo"], ["campo-fecha", "error-fecha"]]
        .forEach(function (par) {
          var campo = $(par[0]);
          var error = $(par[1]);
          var valido = campo.checkValidity();
          error.hidden = valido;
          campo.setAttribute("aria-invalid", valido ? "false" : "true");
          if (!valido && ok) { campo.focus(); }
          if (!valido) { ok = false; }
        });
      return ok;
    }

    form.addEventListener("submit", function (e) {
      if (!validar()) { e.preventDefault(); return; }

      var datos = {
        nombre: $("campo-nombre").value.trim(),
        correo: $("campo-correo").value.trim(),
        fecha: $("campo-fecha").value,
        mensaje: $("campo-mensaje").value.trim()
      };

      if (f.formspreeId && http) {
        // Envío sin recargar la página (solo con http/https)
        e.preventDefault();
        enviar.disabled = true;
        fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            exito.hidden = false;
            texto(exito, f.exito);
            exito.scrollIntoView({ block: "nearest", behavior: sinMovimiento ? "auto" : "smooth" });
          } else {
            aviso.hidden = false;
            texto(aviso, "No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos por nuestras redes.");
          }
        }).catch(function () {
          aviso.hidden = false;
          texto(aviso, "No pudimos enviar el formulario. Revisa tu conexión e inténtalo de nuevo.");
        }).then(function () {
          enviar.disabled = false;
        });
        return;
      }

      if (f.formspreeId) { return; } // file://: envío normal del formulario

      if (f.email) {
        e.preventDefault();
        var asunto = "Inscripción al club Macondo Literario — " + datos.nombre;
        var cuerpo =
          "Nombre: " + datos.nombre + "\n" +
          "Correo: " + datos.correo + "\n" +
          "Encuentro: " + datos.fecha + "\n\n" +
          (datos.mensaje || "(Sin mensaje)");
        window.location.href = "mailto:" + f.email +
          "?subject=" + encodeURIComponent(asunto) +
          "&body=" + encodeURIComponent(cuerpo);
        exito.hidden = false;
        texto(exito, f.exito);
        return;
      }

      e.preventDefault();
    });

    ["campo-nombre", "campo-correo", "campo-fecha"].forEach(function (idCampo) {
      $(idCampo).addEventListener("input", function () {
        if (this.checkValidity()) {
          this.setAttribute("aria-invalid", "false");
          var err = $("error-" + idCampo.replace("campo-", ""));
          if (err) { err.hidden = true; }
        }
      });
    });
  }

  /* =========================================================== 8 · FOOTER */
  function renderFooter() {
    var f = SITE.footer;
    texto($("footer-nombre"), SITE.identidad.nombre1 + " " + SITE.identidad.nombre2);
    texto($("footer-lema"), "«" + SITE.identidad.lema + "»");
    texto($("footer-creditos"), f.creditos);
    texto($("footer-nota"), f.nota);

    var lista = $("footer-integrantes");
    if (f.integrantes && f.integrantes.length) {
      $("footer-equipo-titulo").hidden = false;
      f.integrantes.forEach(function (p) { lista.appendChild(crear("li", "", p)); });
    }
    if (f.curso) { texto($("footer-curso"), f.curso); }

    // Mientras falten datos, los bloques vacíos no dejan huecos en la cuadrícula
    var equipo = document.querySelector(".footer__equipo");
    if (!(f.integrantes && f.integrantes.length) && !f.curso) { equipo.hidden = true; }
    var redes = $("footer-redes");
    if (!redes.children.length) { redes.hidden = true; }
  }

  /* =========================================================== ANIMACIÓN AL SCROLL */
  function animarAlScroll() {
    var elementos = document.querySelectorAll(".revelar");
    if (sinMovimiento || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(elementos, function (el) { el.classList.add("visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(elementos, function (el) { obs.observe(el); });
  }

  /* =========================================================== NAV ACTIVA */
  function navActiva() {
    if (!("IntersectionObserver" in window)) { return; }
    var enlaces = document.querySelectorAll("#nav-lista a");
    var secciones = [];
    Array.prototype.forEach.call(enlaces, function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s) { secciones.push({ seccion: s, enlace: a }); }
    });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        secciones.forEach(function (par) {
          par.enlace.classList.toggle("activo", par.seccion === e.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secciones.forEach(function (par) { obs.observe(par.seccion); });
  }

  /* =========================================================== ARRANQUE */
  function iniciar() {
    if (typeof SITE === "undefined") {
      console.error("No se encontró SITE: revisa que js/data.js cargue antes que js/main.js.");
      return;
    }
    renderHeader();
    renderHero();
    renderCarrusel();
    renderMariposas();
    renderPorQue();
    renderAutor();
    renderVideos();
    renderObra();
    renderRedes();
    renderFormulario();
    renderFooter();
    animarAlScroll();
    navActiva();
    corregirAncla();
  }

  /* Si se entra con un enlace directo (…index.html#videos), el navegador salta
     antes de que el contenido exista: volvemos a posicionar la página. */
  function corregirAncla() {
    if (!location.hash) { return; }
    var destino = document.querySelector(location.hash);
    if (!destino) { return; }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        destino.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
