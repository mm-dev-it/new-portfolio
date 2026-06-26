export const siteConfig = {
  name: "Matteo Malaspina",
  title: "Matteo Malaspina - Sviluppatore Web",
  url: "https://www.matteomalaspina.it",
  email: "info@matteomalaspina.it",
  phone: "+39 3347145447",
  phoneHref: "tel:+393347145447",
  address: "Contrada Santo Stefano 3, 63900 Fermo (FM) Italy",
  linkedin: "https://www.linkedin.com/in/matteo-malaspina-front-end-developer/",
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/i-miei-lavori" },
    { label: "Chi Sono", href: "/about-me" },
    { label: "Contatti", href: "/contact" },
  ],
} as const;

export const services = [
  {
    title: "Landing Page",
    description:
      "La landing page è una pagina web singola, creata appositamente per una specifica campagna. Viene progettata con un obiettivo e deve quindi essere il più possibile semplice per garantire che il tasso di conversione della campagna collegata si mantenga alto.",
  },
  {
    title: "Sito Web Vetrina",
    description:
      "Un sito web vetrina, come dice la parola stessa, nasce per presentare un'azienda, un professionista o un progetto sul web. Spesso viene usato per esordire online, per segnalare ai potenziali clienti la propria esistenza, proprio come fosse un biglietto da visita.",
  },
  {
    title: "E-commerce",
    description:
      "Un e-commerce è un negozio per la vendita online. Quindi possiamo dire, per semplificare il concetto, che si tratta di un negozio su internet. Naturalmente non è detto che tutti gli e-commerce si propongono nello stesso modo, perché esistono soluzioni differenti in base al tipo di business che si vuole mettere a punto e portare avanti.",
  },
] as const;

export const testimonial = {
  quote:
    '"Grazie alla professionalità e alla dedizione di Matteo Malaspina, che è riuscito ad accogliere le nostre richieste e necessità, realizzando qualcosa che ci rappresenta e valorizza ciò che facciamo tutti i giorni da fluid! Il risultato finale è proprio come ce lo avevamo immaginato, anzi meglio! 😍"',
  author: "Fluid Studio Fisioterapico",
} as const;
