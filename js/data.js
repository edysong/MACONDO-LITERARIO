/* ==========================================================================
   MACONDO LITERARIO — Contenido del sitio
   --------------------------------------------------------------------------
   TODO el texto, los links y las imágenes de la página salen de este archivo.
   Para cambiar algo NO hace falta tocar el HTML ni el CSS: edita aquí abajo,
   guarda y recarga la página.

   Los campos que el equipo debe completar están como "" (texto vacío) y
   aparecen marcados con el comentario  // COMPLETAR
   Un campo vacío no rompe la página: se muestra "Próximamente" o se oculta.
   ========================================================================== */

const SITE = {

  /* ---------------------------------------------------------------- 1. Identidad */
  identidad: {
    antetitulo: "Club de lectura",
    nombre1: "MACONDO",
    nombre2: "LITERARIO",
    nombreCompleto: "Macondo Literario",
    lema: "Un universo de historias, un siglo de memoria",
    obra: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anioObra: "1967",
    fechas: ["4", "11", "18"],
    fechasTexto: "noviembre 2026",
    fechasLargas: [
      "Miércoles 4 de noviembre de 2026",
      "Miércoles 11 de noviembre de 2026",
      "Miércoles 18 de noviembre de 2026"
    ],
    cta: "¡Únete!",
    descripcionHero:
      "Un club de lectura para recorrer juntos Macondo: cien años de la familia Buendía, " +
      "entre guerras, mariposas amarillas y memoria. Tres encuentros, muchas ideas, un mismo lugar.",
    frases: [
      "Leer también es viajar",
      "Buenas historias, mejores personas",
      "Grandes historias nos esperan…",
      "Leer es soñar con los ojos abiertos",
      "¡Todos son bienvenidos!",
      "¡Nos vemos allí!",
      "Porque cada libro es un viaje, y cada página, una nueva oportunidad de ver el mundo.",
      "¡Un club, muchas ideas, un mismo lugar!"
    ]
  },

  /* ---------------------------------------------------------------- 2. Navegación */
  nav: [
    { texto: "Inicio", href: "#inicio" },
    { texto: "¿Por qué unirte?", href: "#por-que" },
    { texto: "El autor", href: "#autor" },
    { texto: "Videos", href: "#videos" },
    { texto: "La obra", href: "#la-obra" },
    { texto: "Redes", href: "#redes" },
    { texto: "Únete", href: "#unete" }
  ],

  /* ---------------------------------------------------------------- 3. Pósters (carrusel del hero) */
  /* w y h son las medidas reales del archivo: evitan que la página «salte»
     mientras la imagen carga. Si cambias una imagen, actualiza también sus medidas. */
  posters: [
    {
      img: "assets/img/posters/poster-1-oscuro.jpg",
      alt: "Póster de Macondo Literario con libros, taza de café y biblioteca en tonos cálidos",
      titulo: "Póster 1 · Biblioteca y café",
      w: 622, h: 1254
    },
    {
      img: "assets/img/posters/poster-2-silueta.jpg",
      alt: "Póster con silueta de una lectora que contiene un pueblo colonial, montañas, flores amarillas y libros",
      titulo: "Póster 2 · La lectora y Macondo",
      w: 620, h: 1254
    },
    {
      img: "assets/img/posters/poster-3-collage.jpg",
      alt: "Póster collage con las razones para unirse, las fechas de noviembre y libros apilados",
      titulo: "Póster 3 · Collage de razones",
      w: 853, h: 1280
    }
  ],

  /* ---------------------------------------------------------------- 4. ¿Por qué unirte? */
  porQue: {
    titulo: "¿Por qué unirte?",
    intro: "Cuatro razones para acompañarnos en los tres encuentros de noviembre.",
    razones: [
      {
        icono: "libro",
        emoji: "📖",
        titulo: "Descubrirás nuevos mundos",
        texto: "Nuevos mundos y perspectivas en cada página de Cien años de soledad."
      },
      {
        icono: "personas",
        emoji: "👥",
        titulo: "Conocerás personas",
        texto: "Personas con los mismos intereses, dispuestas a conversar y compartir lecturas."
      },
      {
        icono: "idea",
        emoji: "💡",
        titulo: "Compartirás ideas",
        texto: "Ideas y opiniones sobre la obra, sus personajes y su época."
      },
      {
        icono: "corazon",
        emoji: "❤️",
        titulo: "Disfrutarás de un espacio",
        texto: "Un espacio de lectura, relajación y buena energía."
      }
    ],
    boton: { texto: "Quiero unirme", href: "#unete" }
  },

  /* ---------------------------------------------------------------- 5. El autor */
  autor: {
    titulo: "El autor",
    nombre: "Gabriel García Márquez",
    anios: "1927 – 2014",
    intro:
      "De Aracataca al Nobel: la vida del escritor que convirtió un pueblo del Caribe colombiano " +
      "en el lugar más famoso de la literatura latinoamericana.",
    cita: "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.",
    citaAutor: "Gabriel García Márquez",
    destacados: [
      { titulo: "Nobel 1982", texto: "Premio Nobel de Literatura." },
      { titulo: "1967", texto: "Cien años de soledad, la novela que llevó a Macondo al mundo." }
    ],
    hitos: [
      { anio: "1927", texto: "Nace el 6 de marzo en Aracataca, Magdalena, Colombia." },
      { anio: "1947–1948", texto: "Inicia sus estudios de Derecho y comienza su camino en el periodismo." },
      { anio: "1955", texto: "Publica su primera novela, La hojarasca." },
      { anio: "1967", texto: "Publica Cien años de soledad, su obra más célebre." },
      { anio: "1982", texto: "Recibe el Premio Nobel de Literatura." },
      { anio: "1985", texto: "Publica El amor en los tiempos del cólera." },
      { anio: "2002", texto: "Publica Vivir para contarla, sus memorias." },
      { anio: "2014", texto: "Fallece el 17 de abril en Ciudad de México, dejando un legado fundamental para la literatura universal." }
    ],
    cierre: "Su obra sigue viva, porque en sus historias el tiempo nunca termina.",
    infografia: {
      img: "assets/img/infografias/linea-de-tiempo-autor.jpg",
      alt: "Infografía con la línea de tiempo de la vida de Gabriel García Márquez, de 1927 a 2014",
      boton: "Ver infografía completa",
      w: 1024, h: 1536
    }
  },

  /* ---------------------------------------------------------------- 6. Videos
     Cada video admite dos formas de publicarse:
       archivo:   un video dentro de assets/video/ (se reproduce en la misma página)
       youtubeId: el código del video en YouTube (lo que va después de v=)
     Si los dos están vacíos, la tarjeta se muestra como «Próximamente».
     vertical: true  → formato reel 9:16   ·   false → formato apaisado 16:9        */
  videos: {
    titulo: "Nuestros videos",
    intro:
      "Tres videos hechos por el equipo para invitarte al club: la vida del autor, " +
      "de qué trata la obra y por qué sigue viva hoy.",
    nota: "Los videos marcados como «Próximamente» se publicarán antes del primer encuentro.",
    lista: [
      {
        titulo: "La vida del autor",
        descripcion: "Te invitamos al club contándote la vida de Gabriel García Márquez.",
        archivo: "assets/video/video-1.mp4",
        poster: "assets/video/poster-1.jpg",
        duracion: "0:28",
        vertical: true,
        youtubeId: ""
      },
      {
        titulo: "Generalidades de la obra",
        descripcion: "De qué trata Cien años de soledad: Macondo, los Buendía y su siglo.",
        archivo: "assets/video/video-2.mp4",
        poster: "assets/video/poster-2.jpg",
        duracion: "1:00",
        vertical: true,
        youtubeId: ""
      },
      {
        titulo: "Impacto en la cultura de hoy",
        descripcion: "Cómo la novela sigue viva en la cultura y el mundo actual.",
        archivo: "assets/video/video-3.mp4",
        poster: "assets/video/poster-3.jpg",
        duracion: "0:31",
        vertical: true,
        youtubeId: ""
      }
      /* ¿Quieres añadir otro video? Copia el bloque de arriba después de esta línea,
         pon una coma al final del bloque anterior y cambia titulo, descripcion,
         archivo (súbelo a assets/video/) y duracion. */
    ]
  },

  /* ---------------------------------------------------------------- 7. La obra */
  laObra: {
    titulo: "La obra",
    intro:
      "Cien años de soledad (1967) no se entiende sin la historia de Colombia. " +
      "Aquí está el contexto que la rodea, lo que pasa en sus páginas y quién es quién en la familia Buendía.",

    contexto: {
      titulo: "Contexto histórico",
      intro:
        "Gabriel García Márquez convirtió un siglo de guerras, bonanza y olvido de Colombia " +
        "en la historia de Macondo y de la familia Buendía.",
      etiquetas: ["Publicada en 1967", "Nobel de Literatura 1982"],
      hitos: [
        {
          periodo: "1810–1819",
          titulo: "Independencia y república joven",
          texto: "Colombia rompe con España y la batalla del Puente de Boyacá (1819) sella la libertad, pero deja una élite dividida que se disputará el poder durante todo el siglo."
        },
        {
          periodo: "Siglo XIX",
          titulo: "Liberales contra conservadores",
          texto: "Centralismo e Iglesia contra federalismo y laicismo: una larga cadena de guerras civiles. De ahí salen las 32 sublevaciones que el coronel Aureliano Buendía pierde una tras otra."
        },
        {
          periodo: "1899–1902",
          titulo: "Guerra de los Mil Días",
          texto: "La contienda más sangrienta del siglo, con cerca de 100.000 muertos según estimaciones. Termina con los tratados de Neerlandia y Wisconsin. El abuelo del autor, Nicolás Márquez, fue coronel liberal."
        },
        {
          periodo: "1900s–1920s",
          titulo: "La bonanza bananera",
          texto: "La United Fruit Company se instala cerca de Santa Marta y Ciénaga. Llegan el tren, el dinero fácil y los forasteros, y con ellos el desorden en el pueblo."
        },
        {
          periodo: "1928",
          titulo: "Masacre de las bananeras",
          texto: "El 6 de diciembre el ejército reprime una huelga de trabajadores en Ciénaga. El número de víctimas sigue en disputa. En la novela, el hecho se vuelve la matanza que todo el pueblo olvida."
        },
        {
          periodo: "1948–1958",
          titulo: "La Violencia",
          texto: "El asesinato de Jorge Eliécer Gaitán desata una guerra entre partidos que deja unos 200.000 muertos. Es el clima político en el que crece el escritor."
        },
        {
          periodo: "1967",
          titulo: "Publicación y Boom latinoamericano",
          texto: "Editorial Sudamericana publica la novela en Buenos Aires. Junto a Cortázar, Vargas Llosa y Fuentes, García Márquez sitúa la literatura del continente en el mundo. Nobel en 1982."
        }
      ],
      tabla: {
        titulo: "Macondo y la realidad",
        encabezados: ["En la novela", "En la realidad"],
        filas: [
          ["Macondo", "Aracataca, pueblo natal del autor, y la región bananera del Caribe colombiano"],
          ["Coronel Aureliano Buendía", "Rafael Uribe Uribe y el abuelo Nicolás Márquez, jefes liberales"],
          ["La compañía bananera", "United Fruit Company"],
          ["La matanza de la estación", "Masacre de las bananeras, 1928"],
          ["Las guerras y la paz fallida", "Guerra de los Mil Días y La Violencia"]
        ]
      },
      ideas: {
        titulo: "Ideas que atraviesan la novela",
        lista: [
          {
            titulo: "Realismo mágico",
            texto: "Lo extraordinario se cuenta con naturalidad, como en la oralidad de la abuela del autor."
          },
          {
            titulo: "Ciclo de soledad",
            texto: "Las estirpes condenadas a cien años de soledad no tienen una segunda oportunidad sobre la tierra."
          },
          {
            titulo: "Memoria y olvido",
            texto: "Una versión oficial borra la masacre y el pueblo duda de lo que vio. La novela defiende la memoria frente al olvido."
          }
        ]
      },
      img: "assets/img/infografias/contexto-historico-1.png",
      alt: "Infografía del contexto histórico de Cien años de soledad, con hitos de Colombia entre 1810 y 1967",
      w: 1032, h: 2521,
      pdf: "assets/docs/contexto-historico.pdf",
      botonImagen: "Ver infografía",
      botonPdf: "Descargar PDF"
    },

    lineaTiempo: {
      titulo: "Línea de tiempo de la obra",
      intro: "Doce hitos para seguir los cien años de Macondo y de la familia Buendía.",
      img: "assets/img/infografias/linea-de-tiempo-obra-1.png",
      alt: "Infografía con la línea de tiempo de Cien años de soledad en doce hitos",
      pdf: "assets/docs/linea-de-tiempo-obra.pdf",
      botonImagen: "Ver infografía",
      botonPdf: "Descargar PDF",
      hitos: [
        {
          titulo: "El matrimonio y la maldición",
          texto: "Úrsula y su primo José Arcadio Buendía se casan con miedo a engendrar un hijo con cola de cerdo por el parentesco. José Arcadio mata a Prudencio Aguilar, que se burlaba de él, y el fantasma de Prudencio empieza a acecharlos."
        },
        {
          titulo: "El viaje",
          texto: "Los Buendía deciden irse del pueblo y cruzan la sierra. José Arcadio emprende un viaje para fundar su propio pueblo junto al mar. En el camino nace su primer hijo, que se llamará igual que su padre: José Arcadio."
        },
        {
          titulo: "La fundación de Macondo",
          texto: "Deciden fundar Macondo a orillas de un río. Su segundo hijo, Aureliano, es el primer ser humano nacido en Macondo. Melquíades, un gitano que visita el pueblo, le deja a José Arcadio Buendía un laboratorio de alquimia."
        },
        {
          titulo: "Amaranta y la huida",
          texto: "Nace Amaranta, tercera hija de los Buendía. El hijo mayor, José Arcadio, se va con los gitanos para escapar de sus responsabilidades. Úrsula sale a buscarlo para traerlo de vuelta."
        },
        {
          titulo: "El regreso de Úrsula y Rebeca",
          texto: "Úrsula vuelve y nace Arcadio, hijo de Pilar Ternera y José Arcadio. Los Buendía acogen a Rebeca, una niña huérfana pariente de Úrsula, que come tierra y trae consigo la peste del insomnio."
        },
        {
          titulo: "La peste del insomnio",
          texto: "El insomnio se contagia a todo el pueblo, que empieza a olvidarlo todo. Melquíades regresa, cura el insomnio y se queda en Macondo. Rebeca se compromete con el italiano Pietro Crespi, pero termina casándose con José Arcadio."
        },
        {
          titulo: "La guerra",
          texto: "Empieza una guerra civil y Aureliano se une a ella como coronel. José Arcadio Buendía enloquece y lo amarran a un castaño. Aureliano es condenado a muerte, pero se salva del fusilamiento."
        },
        {
          titulo: "El tren y la bananera",
          texto: "Aureliano Triste trae el tren a Macondo, y con él llegan el comercio, el telégrafo y el cine. Una compañía bananera extranjera trae prosperidad, pero la huelga de los trabajadores termina en una masacre."
        },
        {
          titulo: "El diluvio",
          texto: "Macondo sufre lluvias durante años. Úrsula siente que le llega la hora y espera su muerte. Nace Aureliano Babilonia, uno de los últimos Buendía."
        },
        {
          titulo: "El abandono y los pergaminos",
          texto: "Con los años la gente se marcha y Macondo se vacía. Aureliano Babilonia intenta descifrar los pergaminos que había escrito Melquíades. Regresa Amaranta Úrsula, casada con Gastón."
        },
        {
          titulo: "El último amor",
          texto: "Sin conocer su parentesco, Aureliano Babilonia y Amaranta Úrsula se enamoran y Gastón se va. Ella muere en el parto y nace un niño con cola de cerdo. Aureliano sale a buscar ayuda, pero se emborracha."
        },
        {
          titulo: "El final",
          texto: "Al volver, el niño ha sido devorado por las hormigas. Aureliano logra descifrar los pergaminos de Melquíades: «Porque las estirpes condenadas a cien años de soledad no tenían una segunda oportunidad sobre la tierra»."
        }
      ]
    },

    mapaPersonajes: {
      titulo: "Mapa de personajes",
      texto:
        "Siete generaciones, nombres que se repiten y destinos que se cruzan. " +
        "Explora el árbol de la familia Buendía y descubre cómo se conectan sus personajes.",
      boton: "Ver mapa interactivo",
      url: "https://view.genially.com/6ad68d2a042cf8efb1e0f219"
    }
  },

  /* ---------------------------------------------------------------- 8. Redes y memes */
  redes: {
    titulo: "Síguenos y ríete con nosotros",
    intro:
      "Publicamos los avances del club, los videos y nuestros memes de Cien años de soledad. " +
      "Desliza el celular para verlos.",
    usuarioFeed: "macondo.literario",
    memes: [
      {
        img: "assets/img/memes/meme-1-aureliano-17-hijos.jpg",
        alt: "Meme sobre los 17 hijos del coronel Aureliano Buendía con la frase «Vamo' a reproducirno'»",
        pie: "Cuando Aureliano Buendía tiene 17 hijos: «Vamo' a reproducirno'»",
        w: 823, h: 1280
      },
      {
        img: "assets/img/memes/meme-2-prima-ursula.jpg",
        alt: "Meme sobre el matrimonio entre primos de la familia Buendía",
        pie: "«¡Mamá, Papá! He logrado cortejar a una chica… es mi prima Úrsula»",
        w: 568, h: 1256
      },
      {
        img: "assets/img/memes/meme-3-como-lo-supo.jpg",
        alt: "Meme sobre reconocer a un Buendía por su nombre, con la frase «¿Cómo lo supo?»",
        pie: "Cuando dices que te llamas Aureliano y ya saben que eres un Buendía: «¿Cómo lo supo?»",
        w: 1080, h: 810
      }
    ],
    cuentas: [
      {
        red: "Instagram",
        usuario: "", // COMPLETAR: @usuario
        url: ""      // COMPLETAR: https://www.instagram.com/...
      },
      {
        red: "TikTok",
        usuario: "", // COMPLETAR: @usuario
        url: ""      // COMPLETAR: https://www.tiktok.com/@...
      }
    ]
  },

  /* ---------------------------------------------------------------- 9. Únete / formulario */
  formulario: {
    titulo: "Únete al club",
    intro:
      "Déjanos tus datos y te escribimos con los detalles del encuentro que elijas. " +
      "La entrada es libre: solo hace falta ganas de leer.",
    formspreeId: "", // COMPLETAR: solo el id de Formspree, por ejemplo "xayzbqwe"
    email: "",       // COMPLETAR: correo del club (se usa si no hay formspreeId)
    lugar: "",       // COMPLETAR: lugar de los encuentros (si está vacío no se muestra)
    hora: "",        // COMPLETAR: hora de los encuentros (si está vacía no se muestra)
    fechasOpciones: [
      "Miércoles 4 de noviembre de 2026",
      "Miércoles 11 de noviembre de 2026",
      "Miércoles 18 de noviembre de 2026",
      "Aún no lo sé"
    ],
    etiquetas: {
      nombre: "Nombre y apellido",
      correo: "Correo electrónico",
      fecha: "¿A qué encuentro asistirás?",
      mensaje: "Mensaje (opcional)",
      enviar: "Enviar inscripción"
    },
    exito: "¡Gracias por inscribirte! Te escribiremos pronto con los detalles del encuentro.",
    avisoSinDestino:
      "El formulario todavía no tiene correo de destino configurado. " +
      "Escríbenos por nuestras redes mientras tanto."
  },

  /* ---------------------------------------------------------------- 10. Footer */
  footer: {
    integrantes: [], // COMPLETAR: ["Nombre Apellido", "Nombre Apellido", ...]
    curso: "",       // COMPLETAR: curso / institución
    creditos: "© 2026 Club de lectura Macondo Literario",
    nota: "Trabajo académico. Las imágenes y textos son de creación propia del equipo."
  }
};
