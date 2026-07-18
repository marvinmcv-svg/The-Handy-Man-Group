// Translation dictionary for EN and ES
// All user-facing strings on the public site are defined here.

export type Locale = "en" | "es";

export const LOCALES: Locale[] = ["en", "es"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export const translations = {
  en: {
    // Header
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.whyUs": "Why Us",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.getQuote": "Get a Free Quote",
    "header.brisbane": "Group · Brisbane",

    // Hero
    "hero.badge": "Brisbane's trusted carpenters & handymen since 2017",
    "hero.headline1": "The group you can",
    "hero.headline2": "trust.",
    "hero.subhead":
      "Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane. Family-owned by Joe & Claudia. No job is too small.",
    "hero.cta.quote": "Get a Free Quote",
    "hero.cta.call": "Call",
    "hero.trust1": "QBCC Licensed",
    "hero.trust2": "Master Builders QLD Members",
    "hero.trust3": "Family owned by Joe & Claudia",
    "hero.scroll": "Scroll",

    // Marquee
    "marquee.carpentry": "Carpentry",
    "marquee.handyman": "Handyman Services",
    "marquee.renovations": "Renovations",
    "marquee.commercial": "Commercial Spaces",
    "marquee.landscaping": "Structural Landscaping",
    "marquee.makeovers": "Home Makeovers",

    // Projects
    "projects.eyebrow": "Explore",
    "projects.title": "Our Projects",
    "projects.subtitle":
      "A selection of recent carpentry, renovation and handyman work across Brisbane. Every job — big or small — gets the same care and attention to detail.",
    "projects.viewAll": "View All Projects",
    "projects.viewProject": "View Project",
    "projects.instagramTitle": "See our latest work on Instagram",
    "projects.follow": "Follow",

    // About
    "about.eyebrow": "About us",
    "about.title1": "We're builders of dreams — Joe & Claudia",
    "about.p1":
      "Formerly established as Joe Lewis Handyman in 2017, we've evolved and changed our name — but not the quality of our services. The Handyman & Carpentry Group is pleased to continue offering our makeover services, from small renovations to repairs that keep your home in its best condition.",
    "about.p2":
      "If you are looking to sell, uplift the look of your home, renovate, or simply want advice from an experienced team — we want to hear from you.",
    "about.stat": "Years serving Brisbane homeowners & businesses",

    // Services
    "services.eyebrow": "What we do",
    "services.title": "Our Services",
    "services.subtitle":
      "One trusted team for carpentry, handyman work, renovations, commercial spaces and structural landscaping. Licensed, insured, and proud of every job we finish.",
    "services.getQuote": "Get a quote",

    // Why Us
    "whyUs.eyebrow": "What makes us different",
    "whyUs.title": "Expert craftsmanship for unmatched service.",
    "whyUs.body":
      "Choosing The Handyman & Carpentry Group means working with a family team that values quality, honesty & client satisfaction. From residential to commercial, we deliver results that last — on time & within budget.",
    "whyUs.contactUs": "Contact us",

    // Stats
    "stats.eyebrow": "By the numbers",
    "stats.title": "Facts & Figures",
    "stats.subtitle": "The numbers that show why Brisbane keeps coming back to Joe & Claudia.",

    // Testimonials
    "testimonials.eyebrow": "Our testimonials",
    "testimonials.title1": "Real clients.",
    "testimonials.title2": "Real reviews.",
    "testimonials.subtitle":
      "Don't take our word for it — hear directly from Brisbane homeowners and businesses who've worked with Joe & the team.",
    "testimonials.rating": "Average rating",
    "testimonials.verified": "Verified clients",
    "testimonials.videoBadge": "Video testimonial",
    "testimonials.video": "Video",

    // Instagram
    "ig.eyebrow": "@thehandymangroup",
    "ig.title": "Straight from our Instagram",
    "ig.subtitle":
      "Real photos and videos from real jobs across Brisbane. Tap any post to view it on Instagram — give us a follow for daily updates.",
    "ig.follow": "Follow",
    "ig.loadMore": "Load more posts",

    // CTA
    "cta.title1": "Ready to uplift",
    "cta.title2": "your space?",
    "cta.body":
      "Contact us today to book your free onsite inspection. From a squeaky door to a full renovation — we want to hear from you.",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title1": "Questions,",
    "faq.title2": "answered.",
    "faq.body":
      "Can't find what you're looking for? Give us a call — Joe or Claudia will answer personally. Or chat with Marvin, our AI assistant.",
    "faq.ask": "Ask your question",

    // Contact
    "contact.eyebrow": "Contact us",
    "contact.title": "Let's Connect",
    "contact.body":
      "Send us a message, and Joe or Claudia will get back to you promptly. We're here to answer your questions and help bring your vision to life.",
    "contact.email": "Send us an email",
    "contact.phone": "Give us a call",
    "contact.area": "Where we work",
    "contact.hours": "Hours",
    "contact.follow": "Follow our work",
    "contact.name": "Your name",
    "contact.phoneField": "Phone",
    "contact.emailField": "Email",
    "contact.suburb": "Suburb",
    "contact.service": "What do you need?",
    "contact.selectService": "Select a service…",
    "contact.other": "Other / Not sure",
    "contact.message": "Project details",
    "contact.messageHint":
      "Tell us what you're trying to achieve, rough timing, and anything else useful.",
    "contact.privacy": "We'll never share your details. No spam, ever.",
    "contact.submit": "Send my request",
    "contact.successTitle": "Quote request received",
    "contact.successBody":
      "Thanks! Your quote request has been received. Joe or Claudia will be in touch within one business day.",
    "contact.sendAnother": "Send another request",

    // Footer
    "footer.ctaTitle": "Ready to uplift your space?",
    "footer.ctaBody":
      "Contact us today to book your free onsite inspection. No job is too small.",
    "footer.services": "Services",
    "footer.explore": "Explore",
    "footer.getInTouch": "Get in touch",
    "footer.tagline": "Family owned by Joe & Claudia · No Job Is Too Small",

    // Marvin
    "marvin.label": "Marvin",
    "marvin.close": "Close",
    "marvin.online": "Joe's AI bot assistant · Online",
    "marvin.placeholder": "Ask Marvin anything…",
    "marvin.poweredBy": "Powered by AI · For bookings call",
    "marvin.greeting":
      "Hi! I'm Marvin, Joe's AI bot assistant 👋 I help visitors with questions about our carpentry, handyman and renovation services in Brisbane. How can I help you today?",
    "marvin.suggested": "Suggested questions",
  },
  es: {
    // Header
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.about": "Nosotros",
    "nav.whyUs": "Por qué elegirnos",
    "nav.reviews": "Reseñas",
    "nav.faq": "Preguntas",
    "nav.contact": "Contacto",
    "nav.getQuote": "Cotización Gratis",
    "header.brisbane": "Group · Brisbane",

    // Hero
    "hero.badge": "Carpinteros y técnicos de confianza en Brisbane desde 2017",
    "hero.headline1": "El grupo en el que",
    "hero.headline2": "puedes confiar.",
    "hero.subhead":
      "Carpintería con licencia, servicios de mantenimiento, renovaciones y paisajismo estructural en toda Brisbane. Empresa familiar de Joe y Claudia. Ningún trabajo es demasiado pequeño.",
    "hero.cta.quote": "Cotización Gratis",
    "hero.cta.call": "Llamar",
    "hero.trust1": "Licencia QBCC",
    "hero.trust2": "Miembros de Master Builders QLD",
    "hero.trust3": "Empresa familiar de Joe y Claudia",
    "hero.scroll": "Desplazar",

    // Marquee
    "marquee.carpentry": "Carpintería",
    "marquee.handyman": "Servicios de Mantenimiento",
    "marquee.renovations": "Renovaciones",
    "marquee.commercial": "Espacios Comerciales",
    "marquee.landscaping": "Paisajismo Estructural",
    "marquee.makeovers": "Renovaciones del Hogar",

    // Projects
    "projects.eyebrow": "Explorar",
    "projects.title": "Nuestros Proyectos",
    "projects.subtitle":
      "Una selección de trabajos recientes de carpintería, renovación y mantenimiento en Brisbane. Cada trabajo — grande o pequeño — recibe el mismo cuidado y atención al detalle.",
    "projects.viewAll": "Ver Todos los Proyectos",
    "projects.viewProject": "Ver Proyecto",
    "projects.instagramTitle": "Mira nuestro trabajo más reciente en Instagram",
    "projects.follow": "Seguir",

    // About
    "about.eyebrow": "Sobre nosotros",
    "about.title1": "Construimos sueños — Joe y Claudia",
    "about.p1":
      "Establecido originalmente como Joe Lewis Handyman en 2017, hemos evolucionado y cambiado nuestro nombre — pero no la calidad de nuestros servicios. The Handyman & Carpentry Group se complace en continuar ofreciendo nuestros servicios de renovación, desde pequeñas reformas hasta reparaciones que mantienen tu hogar en las mejores condiciones.",
    "about.p2":
      "Si estás buscando vender, mejorar el aspecto de tu hogar, renovar, o simplemente quieres consejos de un equipo experimentado — ¡queremos escucharte!",
    "about.stat": "Años sirviendo a hogares y negocios en Brisbane",

    // Services
    "services.eyebrow": "Lo que hacemos",
    "services.title": "Nuestros Servicios",
    "services.subtitle":
      "Un equipo de confianza para carpintería, mantenimiento, renovaciones, espacios comerciales y paisajismo estructural. Con licencia, asegurados, y orgullosos de cada trabajo que terminamos.",
    "services.getQuote": "Solicitar cotización",

    // Why Us
    "whyUs.eyebrow": "Qué nos diferencia",
    "whyUs.title": "Artesanía experta para un servicio inigualable.",
    "whyUs.body":
      "Elegir The Handyman & Carpentry Group significa trabajar con un equipo familiar que valora la calidad, la honestidad y la satisfacción del cliente. De residencial a comercial, entregamos resultados que duran — a tiempo y dentro del presupuesto.",
    "whyUs.contactUs": "Contáctanos",

    // Stats
    "stats.eyebrow": "En números",
    "stats.title": "Datos y Cifras",
    "stats.subtitle":
      "Los números que demuestran por qué Brisbane sigue confiando en Joe y Claudia.",

    // Testimonials
    "testimonials.eyebrow": "Nuestras reseñas",
    "testimonials.title1": "Clientes reales.",
    "testimonials.title2": "Reseñas reales.",
    "testimonials.subtitle":
      "No nos creas a nosotros — escucha directamente a hogares y negocios de Brisbane que han trabajado con Joe y el equipo.",
    "testimonials.rating": "Calificación promedio",
    "testimonials.verified": "Clientes verificados",
    "testimonials.videoBadge": "Reseña en video",
    "testimonials.video": "Video",

    // Instagram
    "ig.eyebrow": "@thehandymangroup",
    "ig.title": "Directo de nuestro Instagram",
    "ig.subtitle":
      "Fotos y videos reales de trabajos reales en Brisbane. Toca cualquier publicación para verla en Instagram — síguenos para actualizaciones diarias.",
    "ig.follow": "Seguir",
    "ig.loadMore": "Cargar más publicaciones",

    // CTA
    "cta.title1": "¿Listo para mejorar",
    "cta.title2": "tu espacio?",
    "cta.body":
      "Contáctanos hoy para reservar tu inspección gratuita en el sitio. Desde una puerta que rechina hasta una renovación completa — queremos escucharte.",

    // FAQ
    "faq.eyebrow": "Preguntas",
    "faq.title1": "Preguntas,",
    "faq.title2": "respondidas.",
    "faq.body":
      "¿No encuentras lo que buscas? Llámanos — Joe o Claudia responderán personalmente. O chatea con Marvin, nuestro asistente de IA.",
    "faq.ask": "Haz tu pregunta",

    // Contact
    "contact.eyebrow": "Contáctanos",
    "contact.title": "Conectemos",
    "contact.body":
      "Envíanos un mensaje y Joe o Claudia te responderá pronto. Estamos aquí para responder tus preguntas y ayudar a hacer realidad tu visión.",
    "contact.email": "Envíanos un correo",
    "contact.phone": "Llámanos",
    "contact.area": "Dónde trabajamos",
    "contact.hours": "Horario",
    "contact.follow": "Sigue nuestro trabajo",
    "contact.name": "Tu nombre",
    "contact.phoneField": "Teléfono",
    "contact.emailField": "Correo",
    "contact.suburb": "Suburbio",
    "contact.service": "¿Qué necesitas?",
    "contact.selectService": "Selecciona un servicio…",
    "contact.other": "Otro / No estoy seguro",
    "contact.message": "Detalles del proyecto",
    "contact.messageHint":
      "Cuéntanos qué quieres lograr, el tiempo aproximado y cualquier otra cosa útil.",
    "contact.privacy": "Nunca compartiremos tus datos. Cero spam.",
    "contact.submit": "Enviar mi solicitud",
    "contact.successTitle": "Solicitud de cotización recibida",
    "contact.successBody":
      "¡Gracias! Hemos recibido tu solicitud de cotización. Joe o Claudia se pondrá en contacto contigo dentro de un día hábil.",
    "contact.sendAnother": "Enviar otra solicitud",

    // Footer
    "footer.ctaTitle": "¿Listo para mejorar tu espacio?",
    "footer.ctaBody":
      "Contáctanos hoy para reservar tu inspección gratuita en el sitio. Ningún trabajo es demasiado pequeño.",
    "footer.services": "Servicios",
    "footer.explore": "Explorar",
    "footer.getInTouch": "Ponte en contacto",
    "footer.tagline": "Empresa familiar de Joe y Claudia · Ningún trabajo es demasiado pequeño",

    // Marvin
    "marvin.label": "Marvin",
    "marvin.close": "Cerrar",
    "marvin.online": "Asistente de IA de Joe · En línea",
    "marvin.placeholder": "Pregúntale a Marvin…",
    "marvin.poweredBy": "Impulsado por IA · Para reservas llama al",
    "marvin.greeting":
      "¡Hola! Soy Marvin, el asistente de IA de Joe 👋 Ayudo a los visitantes con preguntas sobre nuestros servicios de carpintería, mantenimiento y renovación en Brisbane. ¿Cómo puedo ayudarte hoy?",
    "marvin.suggested": "Preguntas sugeridas",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
