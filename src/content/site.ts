export const site = {
  name: "MONOFIX Packaging Solutions",
  legalName: "MONOFIX Solutions LLP",
  tagline: "Innovative Packaging Solutions that mean Business !!",
  hashtags: ["Packaging", "Innovation", "Sustainability"],
  email: "sales@monofix.co.in",
  phone: "+91-9820026080",
  phoneHref: "tel:+919820026080",
  responseTime: "Get in touch… we respond within 24 hours, or earlier.",
  address: {
    line1: "INNOV8 Solitaire Park",
    line2: "Andheri East, Mumbai 400093",
  },
  gst: "27ACFFM0048P1ZW",
  locations: ["Mumbai", "NCR", "Pune", "Jakarta", "USA", "EU", "UK"],
  domains: ["monofix.in", "monofixllp.com", "monofixpackaging.com"],
};

export const team = [
  {
    name: "Krishnaprakash Iyer",
    listName: "Prakash Iyer",
    listOrder: 2,
    initials: "KI",
    linkedin: "https://www.linkedin.com/in/krishnaprakash-iyer-17228813",
    summary: "End to end packaging R&D expertise.",
    sectors: "FMCG | Devices | Cosmetics | Hospitality",
    companies: "Marico | Pacific Inter | Unilever (India China UK)",
    credential: "IIP Mumbai",
  },
  {
    name: "Paul E. Prakash",
    listName: "Paul Prakash",
    listOrder: 1,
    initials: "PP",
    linkedin: "https://www.linkedin.com/in/paul-e-prakash-95975310",
    summary: "4 decades of experience, 33 years in Packaging, 25 years as Head of Packaging with Marico, Reliance-Retail, Dabur & Pidilite (Packaging & Machinery).",
    sectors: "",
    companies: "",
    credential: "B.E (M.I.T) M.M.M.",
  },
  {
    name: "Barun Banerjee",
    listName: "Barun Banerjee",
    listOrder: 3,
    initials: "BB",
    linkedin: "https://www.linkedin.com/in/barunbanerjee",
    summary: "Packg Dev E2E, Sustainability, Flexibles.",
    sectors: "FMCG | Cosmetics | Pharma",
    companies: "Nestle | Himalaya | Oriflame | Ranbaxy | Jupiter",
    credential: "IIP Mumbai",
  },
  {
    name: "Ashutosh S Anmadwar",
    listName: "Ashutosh Anmadwar",
    listOrder: 4,
    initials: "AA",
    linkedin: "https://www.linkedin.com/in/ashutoshanmadwar",
    summary: "Plastics & Packaging.",
    sectors: "",
    companies: "Tropics Ltd | Marico | Aditya Birla Retail",
    credential: "CIPET",
  },
  {
    name: "Anees Cementwala",
    listName: "Anees Cementwala",
    listOrder: 5,
    initials: "AC",
    linkedin: "https://www.linkedin.com/in/aneescementwala",
    summary: "Consumer-centric Design and Innovation.",
    sectors: "Packaging | Branding | Retail | Product",
    companies: "Marico | Aditya Birla | TimesofIndia | Planet-M",
    credential: "IIT Bombay",
  },
] as const;

export const teamList = [...team].sort((a, b) => a.listOrder - b.listOrder);

export const teamHighlights = [
  "250 years of combined experience.",
  "Spanning: FMCG, Chemicals, Lubricants, Retail & Pharma.",
  "Proven expertise of launching fresh Products and Brands from scratch.",
] as const;

/** Home banners live in `public/home/`. Replace a file with the same name to swap a slide. */
export const homeSlides = [
  {
    src: "/home/one-carousel.jpg",
    alt: "Innovative packaging solutions that mean business",
  },
  {
    src: "/home/twoo-carousel.png",
    alt: "From a complex packaging problem to a launch that grows the brand",
  },
  {
    src: "/home/three-carousel.png",
    alt: "Innovative packaging solutions — a clear path through complexity",
  },
  {
    src: "/home/four-carousel.png",
    alt: "Innovative packaging solutions that mean business",
  },
  {
    src: "/home/five-carousel.png",
    alt: "Smarter, sustainable, impactful packaging",
  },
  {
    src: "/home/six-carousel.png",
    alt: "Over 70 percent of consumers prefer sustainable packaging",
  },
] as const;

export const nav = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#why", id: "why", label: "Why MONOFIX" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#gallery", id: "gallery", label: "Gallery" },
  { href: "/#sustainability", id: "sustainability", label: "Sustainability" },
  { href: "/#testimonials", id: "testimonials", label: "Clients" },
  { href: "/#insights", id: "insights", label: "Insights" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export const services = [
  {
    slug: "new-packaging-development",
    number: "01",
    title: "New Packaging Development",
    short: "NPD from brief to a launch-ready pack — structure, materials and brand presence.",
    body: "Help your team in NPD: new product design and development. We take a brief through research, structure, graphics and supplier-ready specifications so the pack is right first time.",
    points: [
      "New pack architecture and material selection",
      "Retail and consumer-led design directions",
      "Specification writing for suppliers and converters",
      "Support through trials, tooling and launch",
    ],
  },
  {
    slug: "cost-savings",
    number: "02",
    title: "Cost Savings, Value Engineering",
    short: "End-to-end cost and value work with a focus on secondary packaging.",
    body: "We identify and implement cost-saving and optimisation projects without stripping quality. Secondary packaging, pallet layouts and material choices are typical levers.",
    points: [
      "Focus on secondary packaging efficiency",
      "Material optimisation and pack-count logic",
      "Pallet, transit and warehouse layout savings",
      "Value engineering that holds up in production",
    ],
  },
  {
    slug: "audit-quality",
    number: "03",
    title: "Audit & Quality",
    short: "Third-party audits, boots-on-the-ground checks and first-time-right quality.",
    body: "Outsourcing specification writing, auditing your third-party partners, or putting boots-on-the-ground. Quality systems that travel across plants and geographies.",
    points: [
      "Packaging and operations audits",
      "Supplier and converter assessments",
      "GMP and quality-system support",
      "Rapid technical support when lines fail",
    ],
  },
  {
    slug: "design-engineering",
    number: "04",
    title: "3D Design, Engineering, CAE & Artworks",
    short: "3D design, CAE/FEA simulations, graphics and colour-true artworks.",
    body: "Structural design backed by predictive modelling (CAE/FEA), plus graphics and artwork colour optimisation so what you approve is what ships.",
    points: [
      "3D design and engineering",
      "Predictive modelling CAE / FEA",
      "Graphics, artworks and colour optimisation",
      "Prototypes that survive real supply-chain loads",
    ],
  },
  {
    slug: "sustainability",
    number: "05",
    title: "Sustainability",
    short: "Mono-material, PCR, circularity, PPWR and EPR — packaging that protects the planet.",
    body: "Find alternative sustainable solutions that still work on line and on shelf: virgin plastic reduction, PCR in rigid and flexible packs, and PPWR / EPR compliance.",
    points: [
      "Mono-material structures and virgin plastic reduction",
      "Plastic circularity and PCR in rigid and flexible packaging",
      "PPWR / EPR — extended producer responsibility compliance",
      "Machine selection for mono-material flexible lines",
    ],
  },
  {
    slug: "resourcing",
    number: "06",
    title: "Resourcing",
    short: "Packaging expertise on tap when your team hits a peak or a gap.",
    body: "Support your company in managing peak-time resource crunch by providing manpower and expertise to help run projects — in India, USA, Europe and beyond.",
    points: [
      "Surge capacity for NPD and launch programmes",
      "Embedded packaging specialists",
      "Specification writing and project running",
      "Coverage across Mumbai, NCR, Pune, Jakarta, USA, EU and UK",
    ],
  },
] as const;

export const whyTable = {
  lead: "Your End-to-End partner, till successful Launch !",
  columns: [
    { id: "agency", label: "Design house / Ad. agency" },
    { id: "monofix", label: "MONOFIX", featured: true },
    { id: "vendor", label: "Vendor / Engineering co." },
  ],
  rows: [
    { capability: "NPD Brainstorming", agency: true, monofix: true, vendor: false },
    { capability: "Creative concepts", agency: true, monofix: true, vendor: false },
    { capability: "Designing", agency: true, monofix: true, vendor: false },
    { capability: "Label Graphics", agency: true, monofix: true, vendor: false },
    { capability: "Engineering + Testing Lab", agency: false, monofix: true, vendor: true },
    { capability: "Predictive Modelling CAE / FEA", agency: false, monofix: true, vendor: false },
    { capability: "Mould-making", agency: false, monofix: true, vendor: true },
    { capability: "Machinery, Filling", agency: false, monofix: true, vendor: true },
    { capability: "Production", agency: false, monofix: true, vendor: true },
    { capability: "Cost Optimisation", agency: false, monofix: true, vendor: true },
    { capability: "Vendor Management", agency: false, monofix: true, vendor: true },
    { capability: "Retail, POP", agency: false, monofix: true, vendor: false },
    { capability: "Training, Hand-holding", agency: false, monofix: true, vendor: false },
    { capability: "End-to-End Expertise", agency: false, monofix: true, vendor: false, emphasize: true },
  ],
} as const;

export const gallery = [
  {
    title: "New packaging design. Coffee.",
    image: "/home/one-carousel.jpg",
    note: "Structural shape and shelf presence for a coffee major.",
  },
  {
    title: "Ethnographic research, consumer insights",
    image: "/home/six-carousel.png",
    note: "How people actually use, store and choose the pack.",
  },
  {
    title: "Retail benchmarking study — soaps",
    image: "/home/four-carousel.png",
    note: "Shelf, format and claim mapping across the aisle.",
  },
  {
    title: "Artworks — colour optimisation",
    image: "/home/five-carousel.png",
    note: "Print-true colour so the brand holds from proof to pallet.",
  },
];

export const sustainabilityPoints = [
  {
    title: "Mono-material structure",
    text: "Virgin plastic reduction through simpler, recyclable structures.",
  },
  {
    title: "Plastic circularity",
    text: "Closing the loop — design that can come back as packaging again.",
  },
  {
    title: "PCR in rigid and flexible packaging",
    text: "Post-consumer resin where it is technically and commercially viable.",
  },
  {
    title: "PPWR / EPR compliance",
    text: "Extended producer responsibility — data organised and portal-ready.",
  },
  {
    title: "Line-ready mono-material",
    text: "Machine selection so flexible lines can actually run the new structure.",
  },
];

export const testimonials = [
  {
    title: "Great new packaging design shape",
    quote:
      "The custom packaging shape developed by the MONOFIX team completely transformed our product's shelf presence and brand identity. Not only does it look stunning and modern, but the structural integrity is also outstanding. Our customers have noticed the upgrade, and our sales have seen a fantastic lift because of it.",
    role: "CMO at a Coffee major",
  },
  {
    title: "Major cost savings end-to-end",
    quote:
      "We brought in MONOFIX to audit our supply chain, and they delivered phenomenal end-to-end cost savings without compromising on quality. From material optimization to smarter pallet layouts, every adjustment they made improved our bottom line. They didn't just find quick fixes; they restructured our packaging efficiency for the long run.",
    role: "COO at a Leading Beverage Co",
  },
  {
    title: "Urgent & expert technical support during a crisis",
    quote:
      "When a major production line failure threatened to halt our holiday shipments, their team responded instantly with expert technical support. They quickly diagnosed the structural defect and guided our suppliers through an immediate, viable fix. Their calm professionalism and rapid troubleshooting saved us from a massive distribution disaster.",
    role: "Head R&D at a Global beauty conglomerate",
  },
];

export const insightTopics = [
  {
    title: "“Packaging for Dummies” — de-mystifying packaging",
    text: "A clear series for marketers, founders and operations teams who need the language of pack without the jargon.",
  },
  {
    title: "Sustainability versus green-washing",
    text: "What actually counts under PPWR and EPR — and what is only a claim.",
  },
  {
    title: "Case studies: where packaging sells more than the product",
    text: "When structure, colour and shelf blocking do the commercial work.",
  },
  {
    title: "Zero packaging as a concept",
    text: "When less pack is the brief, and when it is not.",
  },
  {
    title: "Packaging as a multi-4-tasker",
    text: "Brand-building + USP advertising + shelf-appeal + protection — in one object.",
  },
  {
    title: "Packaging nuances across industries",
    text: "FMCG, beauty, beverage, AlcoBev and food each fail in different ways.",
  },
  {
    title: "Master-class guests",
    text: "MD / CMO / CTO-R&D / IIP experts — invited sessions in their field.",
  },
];

export const priceFeeds = [
  { code: "PET", name: "PET resin" },
  { code: "HDPE", name: "HDPE" },
  { code: "PP", name: "Polypropylene" },
  { code: "Kraft", name: "Kraft paper" },
];

export const caseStudies = [
  { title: "End-to-end delivery of PC products (U)", area: "NPD" },
  { title: "Cost savings — Bkk case study", area: "Value engineering" },
  { title: "Audit / quality — Egypt example", area: "Audit & quality" },
  { title: "Sustainability — Europe PPWR example", area: "Sustainability" },
  { title: "Resource augmentation — AlcoBev USA, cosmetics", area: "Resourcing" },
  { title: "Cartons optimisation — beauty portfolio", area: "Secondary pack" },
  { title: "Sugar operations GMP", area: "Quality" },
];

export const popup = {
  title: "Are you in America or Europe?",
  body: "We offer priority services of: NPD, Design, Value Optimisation, PPWR, Sustainability, Auditing, Outsourcing specification writing, & Resourcing.",
  cta: "Leverage MONOFIX expertise now!",
  regions: [
    {
      id: "usa",
      label: "USA",
      detail: "Priority support for North American brands — NPD, resourcing and value optimisation.",
    },
    {
      id: "eu",
      label: "EU",
      detail: "PPWR, EPR and sustainable pack programmes for European launches.",
    },
  ],
};

export const heldForLater = {
  headline: "India’s Packaging & Design Transformation partner!",
  points: [
    "Packaging excellence.",
    "First time right quality.",
    "Expertise in local and global standards.",
    "Sustainability first.",
    "Embrace digital / AI led solutions for packaging.",
  ],
};
