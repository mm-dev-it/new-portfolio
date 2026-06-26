import { homeWorkSlideImages } from "./homeWorkImages";

export type Project = {
  slug: string;
  title: string;
  category: string;
  collaboration?: string;
  portfolioSubtitle?: string;
  client: string;
  year: string;
  type: string;
  website?: string;
  image: string;
  video?: string;
  poster?: string;
  description: string;
  lightImage?: boolean;
  ogImage?: string;
};

/** Progetti in evidenza — ordine allineato alla home (portfolio /i-miei-lavori) */
export const portfolioProjects: Project[] = [
  {
    slug: "barrakuda",
    title: "BarraKuda",
    category: "Menù digitale & Web App",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "BarraKuda",
    year: "2026",
    type: "Web App",
    website: "https://barrakudapsg.it/",
    image: homeWorkSlideImages[0],
    ogImage: homeWorkSlideImages[0],
    description:
      "Esperienza digitale per la ristorazione con menù interattivo e web app pensati per valorizzare l'identità del locale e semplificare la fruizione dei contenuti da mobile. È stata realizzata anche una dashboard admin per il ristorante, con cui aggiornare prezzi e descrizioni dei piatti o aggiungere nuove voci al menù in autonomia.",
  },
  {
    slug: "gm-shop",
    title: "GM Shop",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "GM Shop",
    year: "2026",
    type: "E-commerce",
    website: "https://gianlucamattiozzi.com/",
    image: homeWorkSlideImages[1],
    ogImage: homeWorkSlideImages[1],
    description:
      "Piattaforma e-commerce realizzata per un negozio di sartoria fisico che vende anche online, con catalogo prodotti e un percorso d'acquisto pensato per valorizzare capi su misura e collezioni uomo e donna.",
  },
  {
    slug: "ecom-ai",
    title: "Ecom-Ai",
    category: "Landing Page Startup AI",
    client: "Ecom-Ai Solutions",
    year: "2026",
    type: "Landing Page",
    website: "https://ecomaisolutions.it/",
    image: homeWorkSlideImages[2],
    ogImage: homeWorkSlideImages[2],
    description:
      "Landing page per startup AI pensata per raccogliere contatti e supportare le attività di marketing, con struttura di tracciamento GTM, GA4, Microsoft Clarity e pixel.",
  },
  {
    slug: "roger-sushi-lab",
    title: "Roger SushiLab",
    category: "Sito e Menù ristorante",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Roger SushiLab",
    year: "2022",
    type: "Menù",
    website: "https://rogersushilab.com/",
    image: homeWorkSlideImages[3],
    ogImage: homeWorkSlideImages[3],
    description:
      "Roger Sushi Lab nasce nel centro di Porto San Giorgio con l'obiettivo di portare la classica cucina giapponese con un volto contemporaneo. Dopo anni di studi e ricerche ci ispiriamo all'autentica cucina nipponica con un tocco di innovazione e una particolare cura alla selezione delle materie prime.",
  },
  {
    slug: "explora-expedition",
    title: "Explora Expedition",
    category: "Sito Vetrina",
    portfolioSubtitle: "Sito viaggi con roadmap e itinerari prenotabili",
    client: "Explora Expedition",
    year: "2025",
    type: "Sito Vetrina",
    website: "https://exploraexpedition.com/",
    image: homeWorkSlideImages[4],
    ogImage: homeWorkSlideImages[4],
    description:
      "Sito vetrina per brand di viaggio ed expedition con mete mostrate, roadmap e itinerario giornaliero e possibilità di prenotazione tramite mail per ogni viaggio mostrato.",
  },
  {
    slug: "rita-gas",
    title: "Rita Gas",
    category: "Sito Web Aziendale",
    client: "Rita Gas",
    year: "2026",
    type: "Sito Vetrina",
    website: "https://ritagas.com/",
    image: homeWorkSlideImages[5],
    ogImage: homeWorkSlideImages[5],
    description:
      "Sito vetrina realizzato per dare a RitaGas una presenza online chiara e professionale nel settore del gas metano. La struttura presenta l'azienda, i servizi offerti e le aree di intervento con un percorso semplice da consultare, pensato per valorizzare l'esperienza del brand e facilitare il contatto con clienti e partner interessati alle soluzioni disponibili.",
  },
  {
    slug: "samiflox",
    title: "Samiflox",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Samiflox",
    year: "2026",
    type: "E-commerce",
    website: "https://samiflox.com/",
    image: homeWorkSlideImages[6],
    ogImage: homeWorkSlideImages[6],
    description:
      "E-commerce dedicato alla vendita di piumini e guanciali del Trentino-Alto Adige, con catalogo prodotti Daunex, schede dettagliate e un percorso d'acquisto pensato per valorizzare qualità dei materiali e comfort del riposo.",
  },
  {
    slug: "il-riccio-tra-le-pagine",
    title: "Il Riccio tra le Pagine",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Il Riccio tra le Pagine",
    year: "2026",
    type: "E-commerce",
    website: "https://ilricciotralepagine.com/",
    image: "/assets/img/portfolio/il-riccio-work-mm.jpg",
    ogImage: "/assets/img/portfolio/il-riccio-work-mm.jpg",
    description:
      "E-commerce per libreria indipendente dedicata a bambini e ragazzi, con catalogo libri, albi illustrati, silent book, giochi e percorsi d'acquisto pensati per valorizzare la selezione editoriale e l'identità del negozio fisico e online.",
  },
  {
    slug: "le-castellane",
    title: "Le Castellane",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Le Castellane",
    year: "2026",
    type: "E-commerce",
    website: "http://lecastellaneceramiche.it/",
    image: homeWorkSlideImages[7],
    ogImage: homeWorkSlideImages[7],
    description:
      "E-commerce per ceramiche fatte a mano, con catalogo prodotti, collezioni da appendere e per la tavola, area bomboniere e personalizzazioni pensata per valorizzare il lavoro artigianale del laboratorio.",
  },
  {
    slug: "carolina-gugliardini",
    title: "Carolina Gugliardini",
    category: "Sito Vetrina",
    client: "Carolina Gugliardini",
    year: "2025",
    type: "Sito Vetrina",
    website: "https://carolinaguliardini.com/",
    image: "/assets/img/portfolio/carolina-work-mm.jpg",
    ogImage: "/assets/img/portfolio/carolina-work-mm.jpg",
    description:
      "Sito vetrina per l'artista Carolina Gugliardini, pensato per presentare il catalogo, raccontare il suo percorso creativo e trasformare l'interesse dei visitatori in richieste di opere su commissione attraverso un percorso chiaro verso il contatto.",
  },
];

const legacyProjects: Project[] = [
  {
    slug: "lagoa-world",
    title: "Lagoa World",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Lagoa World",
    year: "2022",
    type: "E-commerce",
    website: "https://lagoaworld.com/",
    image: "/assets/img/portfolio/lagoa-work.jpg",
    ogImage: "/assets/img/portfolio/lagoa-work.jpg",
    description:
      "LagoaWorld mira costantemente ad unire differenti modi di fare scarpe con lo scopo di creare un unico stile dal carattere naturale Lo stile LagoaWorld, libero e versatile, trae isprazione da scenari urbani e cosmopoliti. Perfetto per tutti coloro che cercano una creazione di qualità, pongono l'accento sulla cura dei particolari ma, al tempo stesso, amano la scoperta di nuovi stili e di nuovi mondi….",
  },
  {
    slug: "boho-folks-dream",
    title: "Boho Folks Dream",
    category: "Shop",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Boho Folks Dreams",
    year: "2022",
    type: "Shop",
    website: "https://bohofolksdreams.com/",
    image: "/assets/img/portfolio/BohoFolksDream.jpg",
    ogImage: "/assets/img/portfolio/BohoFolksDream.jpg",
    description:
      "Hai mai sentito parlare della comunità Wayyu? Il nostro obiettivo è valorizzare l'artigianalità delle diverse culture Colombiane. Scegliendo i nostri prodotti aiuterai più di 140 comunità indigene a proseguire la loro tradizione.",
  },
  {
    slug: "barbato",
    title: "Barbato Design",
    category: "Sito Web",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Barbato Design",
    year: "2022",
    type: "Sito Vetrina",
    website: "https://barbatodesignstudio.com/",
    image: "/assets/img/portfolio/barbato-design.png",
    ogImage: "/assets/img/portfolio/barbato-design.png",
    description:
      "La BARBATO DESIGN STUDIO è un team di stilisti di calzature e abbigliamento che propone consulenze stilistiche a livello internazionale. Con oltre 40 anni di collaborazioni, la BARBATO DESIGN STUDIO è conosciuta per la facoltà di percepire le intuizioni che anticipano le tendenze future e farle diventare veri e propri successi. Il team BARBATO DESIGN STUDIO si affianca da sempre al cliente in molteplici modi, dalla creazione di una collezione fino alla direzione creativa di un brand.",
  },
  {
    slug: "verdesalus",
    title: "Verdesalus",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Verdesalus",
    year: "2022",
    type: "E-commerce",
    website: "https://verdesalus.com/",
    image: "/assets/img/portfolio/verdesalus.jpg",
    ogImage: "/assets/img/portfolio/verdesalus.jpg",
    description:
      "Il progetto Verdesalus nasce dalla volontà di creare una linea cosmetica rispettosa della natura e della bellezza, valorizzando al massimo il potere antiossidante e rigenerante dei polifenoli estratti da: ippocastano, limone, uva e nocciolo. Le saponine e l'escina dell'Ippocastano, l'esperidina e la citrina del Limone, gli antociani e il resveratrolo dell' Uva, i tannini e gli stilbeni del Nocciolo, sono i nostri punti di forza, preziosi alleati della tua bellezza e del tuo benessere psico fisico.",
  },
  {
    slug: "namahsi",
    title: "Namahsì Spiritual Path",
    category: "Piattaforma corsi online e in presenza",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Namahsì Spiritual Path",
    year: "2022",
    type: "E-commerce",
    website: "https://namahsi.com/",
    image: "/assets/img/portfolio/Namahsi.jpeg",
    ogImage: "/assets/img/portfolio/Namahsi.jpeg",
    description:
      "Namahsì è un progetto che nasce dall'amore per la vita, per la natura, per l'arte e per i saperi ancestrali e contemporanei. Miriamo all'evoluzione dell'Essere Umano nell'amore e nella consapevolezza attraverso la pratica delle discipline olistiche e delle vie di crescita spirituale e di illuminazione.",
  },
  {
    slug: "fluid",
    title: "FLUID Studio",
    category: "Sito Web",
    client: "Fluid Studio",
    year: "2022",
    type: "Sito Vetrina",
    website: "https://fluidfisioterapia.it/",
    image:
      "/assets/img/portfolio/fluid-studio-fisioterapico-fermo-portosangiorgio.png",
    ogImage:
      "/assets/img/portfolio/fluid-studio-fisioterapico-fermo-portosangiorgio.png",
    description:
      "Fluid è uno studio fisioterapico che da diversi anni offre ai propri pazienti la possibilità di fruire del supporto di personale competente capace di risolvere qualsiasi genere di problematica con trattamenti ottimali. Ascoltare e comprendere il problema di ogni paziente è fondamentale per il percorso di cura.",
    lightImage: true,
  },
  {
    slug: "dixy-store",
    title: "Dixy's Store",
    category: "E-commerce",
    collaboration: "in collaborazione con Wemadeit Studio",
    client: "Dixy's Store",
    year: "2022",
    type: "E-commerce",
    website: "https://dixystore.com/",
    image: "/assets/img/portfolio/pink-dog-coat.jpg",
    ogImage: "/assets/img/portfolio/pink-dog-coat.jpg",
    description:
      "Ciao! Siamo Dixy – piccola modella, \"coccolosa\" influencer e Zaira – attenta e premurosa coinquilina, imprenditrice amante degli animali, e co-fondatrice di Dixy's. Se non ti importa di quelle persone che criticano il fatto di vestire il tuo pelosetto, con dixystore.com darai loro un motivo in più per farlo! Noi a Dixy's sappiamo quanto sia importante avere un look favoloso, anche quando esci per fare una piccola passeggiata.",
  },
];

/** Lista completa pagina /i-miei-lavori: nuovi in evidenza + archivio legacy */
export const worksPageProjects: Project[] = [
  ...portfolioProjects,
  ...legacyProjects,
];

export const projects: Project[] = worksPageProjects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
