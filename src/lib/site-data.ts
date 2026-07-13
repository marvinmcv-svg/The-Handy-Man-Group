// Central content data for The Handy Man Group website
// All images sourced via Z.AI image search (re-hosted on OSS for stability)

export const SITE = {
  name: "The Handy Man Group",
  shortName: "Handy Man Group",
  tagline: "Australia's Trusted Tradespeople",
  phone: "1300 426 379",
  phoneHref: "tel:1300426379",
  email: "hello@thehandymangroup.com.au",
  emailHref: "mailto:hello@thehandymangroup.com.au",
  instagram: "https://www.instagram.com/thehandymangroup/",
  facebook: "https://www.facebook.com/thehandymangroup/",
  address: "Suite 12, 88 Parramatta Road, Sydney NSW 2000",
  serviceArea: "Sydney · Melbourne · Brisbane · Australia-wide",
  hours: "Mon–Fri 7:00am – 6:00pm · Sat 8:00am – 2:00pm",
  abn: "ABN 42 619 882 014",
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
    title: "Carpentry & Joinery",
    blurb:
      "Custom timber work, decking, pergolas, doors, cabinets and structural repairs — crafted to last by licensed carpenters.",
    icon: "Hammer",
    points: ["Custom decking", "Pergolas & gazebos", "Doors & frames", "Built-in cabinetry"],
  },
  {
    id: "renovations",
    title: "Home Renovations",
    blurb:
      "Full-scale renovations for kitchens, bathrooms and living spaces. From design to handover, we manage every trade.",
    icon: "Ruler",
    points: ["Kitchen makeovers", "Bathroom remodels", "Extensions", "Full home refits"],
  },
  {
    id: "painting",
    title: "Painting & Decorating",
    blurb:
      "Interior and exterior painting with premium low-VOC finishes. Flawless prep, sharp lines, lasting colour.",
    icon: "PaintRoller",
    points: ["Interior walls", "Exterior facades", "Feature walls", "Commercial repaints"],
  },
  {
    id: "maintenance",
    title: "Property Maintenance",
    blurb:
      "Ongoing care for homes and investment properties. Fast turnaround on repairs, odd jobs and safety checks.",
    icon: "Wrench",
    points: ["General repairs", "Gutter cleaning", "Door & lock fixes", "Pre-sale makeovers"],
  },
  {
    id: "plumbing-electrical",
    title: "Plumbing & Electrical",
    blurb:
      "Licensed plumbers and electricians for installations, upgrades and emergency call-outs — all under one roof.",
    icon: "Plug",
    points: ["Tap & fixture fitting", "Lighting install", "Switchboard upgrades", "Leak repairs"],
  },
  {
    id: "tiling-flooring",
    title: "Tiling & Flooring",
    blurb:
      "Precision tiling for kitchens, bathrooms and outdoor areas. Hardwood, laminate and hybrid flooring installs.",
    icon: "Grid3x3",
    points: ["Ceramic & porcelain", "Natural stone", "Timber flooring", "Waterproofing"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  span?: "wide" | "tall" | "normal";
};

// Images sourced via Z.AI image search (OSS-hosted, stable URLs)
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Modern Kitchen Refit",
    category: "Renovation",
    location: "Bondi, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/c25a10c6f69c.jpg",
    span: "wide",
  },
  {
    id: "p2",
    title: "Hardwood Deck Build",
    category: "Carpentry",
    location: "Manly, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/f4bbcd1683f9.png",
    span: "tall",
  },
  {
    id: "p3",
    title: "Bathroom Remodel",
    category: "Renovation",
    location: "Surry Hills, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/aaa6d444e35d.jpg",
    span: "normal",
  },
  {
    id: "p4",
    title: "Feature Wall & Trim",
    category: "Painting",
    location: "Newtown, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/ee073a0388fe.jpg",
    span: "normal",
  },
  {
    id: "p5",
    title: "Pergola & Outdoor Living",
    category: "Carpentry",
    location: "Mosman, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/589dd0fa3069.jpg",
    span: "wide",
  },
  {
    id: "p6",
    title: "Workspace Fit-out",
    category: "Commercial",
    location: "Pyrmont, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/159807e6bf12.jpg",
    span: "tall",
  },
  {
    id: "p7",
    title: "Heritage Restoration",
    category: "Renovation",
    location: "Balmain, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/a5879d390e56.jpg",
    span: "normal",
  },
  {
    id: "p8",
    title: "Custom Cabinetry",
    category: "Joinery",
    location: "Paddington, NSW",
    image: "https://sfile.chatglm.cn/images-ppt/c22291bc1bd7.jpg",
    span: "normal",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    role: "Homeowner · Balmain",
    quote:
      "The team rebuilt our back deck and pergola in under two weeks. The craftsmanship is genuinely beautiful — every joint is perfect. Punctual, tidy and honest pricing.",
    rating: 5,
  },
  {
    id: "t2",
    name: "James O'Connor",
    role: "Property Investor · Surry Hills",
    quote:
      "I use The Handy Man Group for every property in my portfolio. They handle maintenance calls fast, document everything, and the work always passes inspection first time.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Café Owner · Newtown",
    quote:
      "We needed a full shop fit-out in three weeks. They delivered on time, on budget, and the joinery detail lifted the whole space. Already booked them for our second venue.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Mark & Linda Thompson",
    role: "Homeowners · Mosman",
    quote:
      "Our bathroom renovation was seamless. Daily clean-ups, clear communication, and the tiling is flawless. They treated our home with real respect.",
    rating: 5,
  },
  {
    id: "t5",
    name: "David Chen",
    role: "Strata Manager · Sydney CBD",
    quote:
      "Reliable, licensed and fully insured — exactly what we need for strata work. Quotes are detailed and transparent, and they never miss a compliance requirement.",
    rating: 5,
  },
];

export const STATS = [
  { value: "12+", label: "Years in business" },
  { value: "4,800+", label: "Jobs completed" },
  { value: "98%", label: "Repeat clients" },
  { value: "24/7", label: "Emergency call-outs" },
];

export const PROCESS = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Submit a quote request or call us. We'll ask the right questions to scope your job accurately.",
  },
  {
    step: "02",
    title: "Get a fixed-price quote",
    body: "Within 48 hours you'll receive a clear, itemised quote — no hourly guesswork, no surprises.",
  },
  {
    step: "03",
    title: "We schedule the work",
    body: "Pick a time that suits you. Our team arrives on time, in uniform, with everything needed.",
  },
  {
    step: "04",
    title: "Quality handover",
    body: "We walk you through the finished work, clean up thoroughly, and back it with our workmanship guarantee.",
  },
];

export const FAQS = [
  {
    q: "Are your tradespeople licensed and insured?",
    a: "Yes. Every tradesperson on our team is fully licensed in their trade and The Handy Man Group carries $20M public liability insurance. Certificates of currency are provided on every job.",
  },
  {
    q: "Which areas do you service?",
    a: "We operate across Greater Sydney, Melbourne, Brisbane and surrounding suburbs. For larger commercial projects we travel Australia-wide — just ask.",
  },
  {
    q: "How fast can you start?",
    a: "For maintenance and small repairs we typically schedule within 2–4 business days. Renovations and larger projects are booked in based on a clear schedule you'll receive with your quote.",
  },
  {
    q: "Do you provide free quotes?",
    a: "Yes. All quotes are free and obligation-free. For most jobs we can provide a fixed price from photos and a phone call; larger renovations may require an on-site visit.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, credit card and EFTPOS. For larger projects we work on a milestone-based payment schedule agreed upfront in your quote.",
  },
  {
    q: "Do you guarantee your work?",
    a: "Every job is backed by our 12-month workmanship guarantee. Material warranties are passed through from manufacturers, often 5–10 years.",
  },
];

// Image collections for hero + gallery sections
export const HERO_IMAGE =
  "https://sfile.chatglm.cn/images-ppt/9486bfdaa854.jpg";

export const ABOUT_IMAGE =
  "https://sfile.chatglm.cn/images-ppt/c9ea1c029926.jpg";

export const CTA_IMAGE =
  "https://sfile.chatglm.cn/images-ppt/8de1f534e07e.png";

export const GALLERY_IMAGES = [
  "https://sfile.chatglm.cn/images-ppt/15002cd4b1f4.jpg",
  "https://sfile.chatglm.cn/images-ppt/2577e3c3a8a9.jpg",
  "https://sfile.chatglm.cn/images-ppt/914c4607ee4e.jpg",
  "https://sfile.chatglm.cn/images-ppt/4f75a15a7181.jpg",
  "https://sfile.chatglm.cn/images-ppt/0907ba6c90ea.jpg",
  "https://sfile.chatglm.cn/images-ppt/1bf93ff31ec7.jpg",
  "https://sfile.chatglm.cn/images-ppt/15fe10fa93c2.jpeg",
  "https://sfile.chatglm.cn/images-ppt/1aee01298083.jpg",
  "https://sfile.chatglm.cn/images-ppt/3fafe1012e97.jpg",
  "https://sfile.chatglm.cn/images-ppt/ce92818f8f7c.jpg",
  "https://sfile.chatglm.cn/images-ppt/b49bb4a56db5.jpg",
  "https://sfile.chatglm.cn/images-ppt/0c670b199a42.jpg",
];
