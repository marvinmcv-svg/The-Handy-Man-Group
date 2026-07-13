import { db } from "@/lib/db";

// Seed the database with the real company content.
// Run with: bun run src/lib/seed.ts

async function main() {
  console.log("Seeding database...");

  // Services
  const services = [
    { title: "Carpentry", blurb: "Licensed carpentry from structural framing and decks to custom cabinetry, doors and trim. The craft that started our business.", icon: "Hammer", points: ["Decks & pergolas", "Structural framing", "Doors & trim", "Custom cabinetry"], order: 0 },
    { title: "Handyman Services", blurb: "From the small fix-ups you've been putting off to full property maintenance. No job is too small — that's our promise.", icon: "Wrench", points: ["General repairs", "Door & lock fixes", "Tiling & patching", "Gutter cleaning"], order: 1 },
    { title: "Renovations", blurb: "Makeover services that uplift your home — kitchens, bathrooms, floors and full home refits, managed end to end.", icon: "Ruler", points: ["Kitchen makeovers", "Bathroom remodels", "Flooring & sanding", "Pre-sale makeovers"], order: 2 },
    { title: "Commercial Spaces", blurb: "Office refits and commercial refurbishments that keep your business running. Quick, focused, and professional.", icon: "Building2", points: ["Office refits", "Retail fit-outs", "Rental refurbishments", "Strata maintenance"], order: 3 },
    { title: "Structural Landscaping", blurb: "Outdoor transformations with structural integrity — retaining walls, decks, pergolas and hard landscaping that lasts.", icon: "Trees", points: ["Retaining walls", "Decking", "Pergolas & gazebos", "Hard landscaping"], order: 4 },
    { title: "Home Makeovers", blurb: "Selling or staying? We uplift the look of your home with a targeted makeover that adds real value.", icon: "Sparkles", points: ["Pre-sale prep", "Painting & detailing", "Garden tidy-up", "Styling repairs"], order: 5 },
  ];
  for (const s of services) {
    await db.service.upsert({
      where: { id: `seed-service-${s.order}` },
      update: { title: s.title, blurb: s.blurb, icon: s.icon, points: JSON.stringify(s.points), order: s.order },
      create: { id: `seed-service-${s.order}`, ...s, points: JSON.stringify(s.points) },
    });
  }
  console.log(`  ✓ ${services.length} services`);

  // Projects
  const projects = [
    { title: "Office Space Refurbishment", category: "Commercial", location: "Brisbane, QLD", description: "A quick, focused refurb of a tired commercial office — quality finish, streamlined service, ahead of schedule.", image: "https://sfile.chatglm.cn/images-ppt/159807e6bf12.jpg", order: 0 },
    { title: "Rental Property Refresh", category: "Renovation", location: "Brisbane, QLD", description: "Targeted refurb of a rental property — safe, inviting and rentable, delivering a measurable rent uplift.", image: "https://sfile.chatglm.cn/images-ppt/c25a10c6f69c.jpg", order: 1 },
    { title: "Pre-Sale Home Preparation", category: "Makeover", location: "Brisbane, QLD", description: "Lawn replacement, floor sanding, structural repairs and painting coordinated remotely for a seller in Melbourne.", image: "https://sfile.chatglm.cn/images-ppt/054af116de3a.png", order: 2 },
    { title: "Custom Deck & Pergola", category: "Carpentry", location: "Brisbane, QLD", description: "Hardwood deck and timber pergola extending the living space outdoors — built to last Queensland weather.", image: "https://sfile.chatglm.cn/images-ppt/f4bbcd1683f9.png", order: 3 },
    { title: "Bathroom Makeover", category: "Renovation", location: "Brisbane, QLD", description: "Full bathroom remodel with new fixtures, tiling and waterproofing — modern, functional and beautiful.", image: "https://sfile.chatglm.cn/images-ppt/aaa6d444e35d.jpg", order: 4 },
    { title: "Structural Landscaping", category: "Landscaping", location: "Brisbane, QLD", description: "Retaining walls and hard landscaping that solved a drainage issue and transformed the outdoor area.", image: "https://sfile.chatglm.cn/images-ppt/3b3ce6825581.jpeg", order: 5 },
  ];
  for (const p of projects) {
    await db.project.upsert({
      where: { id: `seed-project-${p.order}` },
      update: { ...p },
      create: { id: `seed-project-${p.order}`, ...p },
    });
  }
  console.log(`  ✓ ${projects.length} projects`);

  // Testimonials (real)
  const testimonials = [
    { name: "AWX Management", role: "Commercial Office Refurb", quote: "Joe Lewis Handyman was quick, efficient and did a great job of our office space. He noticed things we've never noticed and provided a quality, friendly, and streamlined service. Couldn't recommend more highly.", order: 0 },
    { name: "John C.", role: "Rental Property Refurb", quote: "I got Joe and his team in for a short, sharp and focused refurb of my tired rental property. The brief was to make it safe, inviting and rentable. Working within a tight budget the targeted approach has resulted in a 12.5% increase to the expected rent. Thanks Joe!", order: 1 },
    { name: "David P.", role: "Pre-Sale Home Prep", quote: "While I was stuck in Melbourne wanting to prepare my house for sale in Brisbane, Joe was fantastic in organising so many jobs — lawn replacement, floor sanding, structural repairs and painting. Super quick, super easy to deal with. I highly recommend Joe Lewis handyman services.", order: 2 },
  ];
  for (const t of testimonials) {
    await db.testimonial.upsert({
      where: { id: `seed-testimonial-${t.order}` },
      update: { ...t },
      create: { id: `seed-testimonial-${t.order}`, ...t },
    });
  }
  console.log(`  ✓ ${testimonials.length} testimonials`);

  // FAQs
  const faqs = [
    { q: "What areas do you service?", a: "We're based in Brisbane and service Greater Brisbane and surrounding Queensland suburbs. For larger commercial and structural landscaping projects we travel further — just ask.", order: 0 },
    { q: "Are you licensed and insured?", a: "Yes. We're QBCC licensed and proud members of Master Builders Queensland. We carry full public liability insurance and can provide certificates of currency on request.", order: 1 },
    { q: "Is there a job that's too small?", a: "No. Our slogan is 'No Job Is Too Small' and we mean it. A squeaky door, a broken tile, a loose handle — give us a call. We'd rather help you than have you put it off.", order: 2 },
    { q: "Do you offer free quotes?", a: "Yes. We offer a complimentary onsite inspection and provide a clear, fixed-price quote with no obligation. For smaller jobs we can often quote from a photo.", order: 3 },
    { q: "Can you handle commercial work?", a: "Absolutely. We've done office refits, retail fit-outs and rental refurbishments. We work around your hours to keep your business running.", order: 4 },
    { q: "How do I book a job?", a: "Call us on (07) 3053 5274, email info@thehandymangroup.com.au, or use the contact form on this page. We'll get back to you within one business day.", order: 5 },
  ];
  for (const f of faqs) {
    await db.faq.upsert({
      where: { id: `seed-faq-${f.order}` },
      update: { ...f },
      create: { id: `seed-faq-${f.order}`, ...f },
    });
  }
  console.log(`  ✓ ${faqs.length} faqs`);

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
