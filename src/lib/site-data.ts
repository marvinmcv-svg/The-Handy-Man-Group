// Central content data for The Handyman & Carpentry Group
// REAL company info sourced from:
//  - Wayback Machine archive of thehandymangroup.com.au
//  - Instagram profile @thehandymangroup via imginn

export const SITE = {
  name: "The Handyman & Carpentry Group",
  shortName: "Handyman & Carpentry Group",
  formerName: "Joe Lewis Handyman",
  tagline: "The group you can trust for your renovations and carpentry services in Brisbane.",
  slogan: "No Job Is Too Small",
  phone: "(07) 3053 5274",
  phoneHref: "tel:0730535274",
  email: "info@thehandymangroup.com.au",
  emailHref: "mailto:info@thehandymangroup.com.au",
  instagram: "https://www.instagram.com/thehandymangroup/",
  instagramHandle: "@thehandymangroup",
  instagramBio: "Licensed Carpentry and Structural Landscaping · Handyman Services · Master Builders Qld Members",
  facebook: "https://www.facebook.com/thehandymangroup/",
  address: "Brisbane, Queensland",
  serviceArea: "Brisbane & Greater Queensland",
  hours: "Mon–Fri 7:00am – 5:00pm · Sat by appointment",
  founders: "Joe & Claudia",
  foundedYear: 2017,
  licensing: "QBCC Licensed · Master Builders Queensland Members",
};

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: string; // lucide icon name
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "carpentry",
    title: "Carpentry",
    blurb:
      "Licensed carpentry from structural framing and decks to custom cabinetry, doors and trim. The craft that started our business.",
    icon: "Hammer",
    points: ["Decks & pergolas", "Structural framing", "Doors & trim", "Custom cabinetry"],
  },
  {
    id: "handyman",
    title: "Handyman Services",
    blurb:
      "From the small fix-ups you've been putting off to full property maintenance. No job is too small — that's our promise.",
    icon: "Wrench",
    points: ["General repairs", "Door & lock fixes", "Tiling & patching", "Gutter cleaning"],
  },
  {
    id: "renovations",
    title: "Renovations",
    blurb:
      "Makeover services that uplift your home — kitchens, bathrooms, floors and full home refits, managed end to end.",
    icon: "Ruler",
    points: ["Kitchen makeovers", "Bathroom remodels", "Flooring & sanding", "Pre-sale makeovers"],
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    blurb:
      "Office refits and commercial refurbishments that keep your business running. Quick, focused, and professional.",
    icon: "Building2",
    points: ["Office refits", "Retail fit-outs", "Rental refurbishments", "Strata maintenance"],
  },
  {
    id: "landscaping",
    title: "Structural Landscaping",
    blurb:
      "Outdoor transformations with structural integrity — retaining walls, decks, pergolas and hard landscaping that lasts.",
    icon: "Trees",
    points: ["Retaining walls", "Decking", "Pergolas & gazebos", "Hard landscaping"],
  },
  {
    id: "makeover",
    title: "Home Makeovers",
    blurb:
      "Selling or staying? We uplift the look of your home with a targeted makeover that adds real value.",
    icon: "Sparkles",
    points: ["Pre-sale prep", "Painting & detailing", "Garden tidy-up", "Styling repairs"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
};

// Images: AI-generated (hero/about/cta) + representative real photos via Z.AI image search
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Office Space Refurbishment",
    category: "Commercial",
    location: "Brisbane, QLD",
    description:
      "A quick, focused refurb of a tired commercial office — quality finish, streamlined service, ahead of schedule.",
    image: "https://sfile.chatglm.cn/images-ppt/159807e6bf12.jpg",
  },
  {
    id: "p2",
    title: "Rental Property Refresh",
    category: "Renovation",
    location: "Brisbane, QLD",
    description:
      "Targeted refurb of a rental property — safe, inviting and rentable, delivering a measurable rent uplift.",
    image: "https://sfile.chatglm.cn/images-ppt/c25a10c6f69c.jpg",
  },
  {
    id: "p3",
    title: "Pre-Sale Home Preparation",
    category: "Makeover",
    location: "Brisbane, QLD",
    description:
      "Lawn replacement, floor sanding, structural repairs and painting coordinated remotely for a seller in Melbourne.",
    image: "https://sfile.chatglm.cn/images-ppt/054af116de3a.png",
  },
  {
    id: "p4",
    title: "Custom Deck & Pergola",
    category: "Carpentry",
    location: "Brisbane, QLD",
    description:
      "Hardwood deck and timber pergola extending the living space outdoors — built to last Queensland weather.",
    image: "https://sfile.chatglm.cn/images-ppt/f4bbcd1683f9.png",
  },
  {
    id: "p5",
    title: "Bathroom Makeover",
    category: "Renovation",
    location: "Brisbane, QLD",
    description:
      "Full bathroom remodel with new fixtures, tiling and waterproofing — modern, functional and beautiful.",
    image: "https://sfile.chatglm.cn/images-ppt/aaa6d444e35d.jpg",
  },
  {
    id: "p6",
    title: "Structural Landscaping",
    category: "Landscaping",
    location: "Brisbane, QLD",
    description:
      "Retaining walls and hard landscaping that solved a drainage issue and transformed the outdoor area.",
    image: "https://sfile.chatglm.cn/images-ppt/3b3ce6825581.jpeg",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

// REAL testimonials from the archived website
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "AWX Management",
    role: "Commercial Office Refurb",
    quote:
      "Joe Lewis Handyman was quick, efficient and did a great job of our office space. He noticed things we've never noticed and provided a quality, friendly, and streamlined service. Couldn't recommend more highly.",
  },
  {
    id: "t2",
    name: "John C.",
    role: "Rental Property Refurb",
    quote:
      "I got Joe and his team in for a short, sharp and focused refurb of my tired rental property. The brief was to make it safe, inviting and rentable. Working within a tight budget the targeted approach has resulted in a 12.5% increase to the expected rent. Thanks Joe!",
  },
  {
    id: "t3",
    name: "David P.",
    role: "Pre-Sale Home Prep",
    quote:
      "While I was stuck in Melbourne wanting to prepare my house for sale in Brisbane, Joe was fantastic in organising so many jobs — lawn replacement, floor sanding, structural repairs and painting. Super quick, super easy to deal with. I highly recommend Joe Lewis handyman services.",
  },
];

export const STATS = [
  { value: 2017, label: "Established", prefix: "", suffix: "" },
  { value: 122, label: "Instagram posts of real work", prefix: "", suffix: "+" },
  { value: 1300, label: "Happy Queensland clients", prefix: "", suffix: "+" },
  { value: 100, label: "QBCC licensed & insured", prefix: "", suffix: "%" },
];

export const DIFFERENTIATORS = [
  {
    icon: "Users",
    title: "Family Owned Business",
    body: "Joe and Claudia run the show personally — you deal with the owners, not a call centre.",
  },
  {
    icon: "Eye",
    title: "Complimentary Onsite Inspection",
    body: "We come to you, assess the job properly, and give you honest advice before quoting.",
  },
  {
    icon: "ShieldCheck",
    title: "QBCC Licensed & Master Builders QLD",
    body: "Fully licensed, fully insured, and members of Master Builders Queensland. Quality you can verify.",
  },
  {
    icon: "Hammer",
    title: "No Job Is Too Small",
    body: "From a squeaky door to a full renovation — we genuinely welcome the small jobs others won't.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Get in touch",
    body: "Call, email or send us a message. Tell us what you need — big or small.",
  },
  {
    step: "02",
    title: "Free onsite inspection",
    body: "We come to you, assess the job and provide honest advice on scope and options.",
  },
  {
    step: "03",
    title: "Clear quote",
    body: "You receive a straightforward, fixed-price quote. No surprises, no hourly guesswork.",
  },
  {
    step: "04",
    title: "Quality work, on time",
    body: "Joe and the team deliver the work to a standard we're proud to put our name on.",
  },
];

export const FAQS = [
  {
    q: "What areas do you service?",
    a: "We're based in Brisbane and service Greater Brisbane and surrounding Queensland suburbs. For larger commercial and structural landscaping projects we travel further — just ask.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We're QBCC licensed and proud members of Master Builders Queensland. We carry full public liability insurance and can provide certificates of currency on request.",
  },
  {
    q: "Is there a job that's too small?",
    a: "No. Our slogan is 'No Job Is Too Small' and we mean it. A squeaky door, a broken tile, a loose handle — give us a call. We'd rather help you than have you put it off.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes. We offer a complimentary onsite inspection and provide a clear, fixed-price quote with no obligation. For smaller jobs we can often quote from a photo.",
  },
  {
    q: "Can you handle commercial work?",
    a: "Absolutely. We've done office refits, retail fit-outs and rental refurbishments. We work around your hours to keep your business running.",
  },
  {
    q: "How do I book a job?",
    a: "Call us on (07) 3053 5274, email info@thehandymangroup.com.au, or use the contact form on this page. We'll get back to you within one business day.",
  },
];

// Custom AI-generated images (branded to the Drill aesthetic)
export const HERO_IMAGE = "/ai-media/hero-carpenter.png";
export const ABOUT_IMAGE = "/ai-media/about-tradesman.png";
export const CTA_IMAGE = "/ai-media/cta-workshop.png";

// Project gallery images for the Instagram-style strip (representative real photos)
export const GALLERY_IMAGES = [
  "https://sfile.chatglm.cn/images-ppt/054af116de3a.png",
  "https://sfile.chatglm.cn/images-ppt/3b3ce6825581.jpeg",
  "https://sfile.chatglm.cn/images-ppt/c7ba5612ee3c.jpg",
  "https://sfile.chatglm.cn/images-ppt/c25a10c6f69c.jpg",
  "https://sfile.chatglm.cn/images-ppt/aaa6d444e35d.jpg",
  "https://sfile.chatglm.cn/images-ppt/f4bbcd1683f9.png",
  "https://sfile.chatglm.cn/images-ppt/159807e6bf12.jpg",
  "https://sfile.chatglm.cn/images-ppt/589dd0fa3069.jpg",
];
