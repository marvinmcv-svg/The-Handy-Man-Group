import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Projects } from "@/components/site/projects";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBanner } from "@/components/site/cta-banner";
import { Faq } from "@/components/site/faq";
import { ContactForm } from "@/components/site/contact-form";
import { InstagramFeed } from "@/components/site/instagram-feed";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { MarvinChat } from "@/components/site/marvin-chat";
import { WhatsAppWidget } from "@/components/site/whatsapp-widget";
import { getServices, getProjects, getTestimonials, getFaqs } from "@/lib/content";

// Revalidate every 60s so admin edits show up
export const revalidate = 60;

export default async function Home() {
  const [services, projects, testimonials, faqs] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <Marquee />
        <Projects projects={projects} />
        <About />
        <Services services={services} />
        <WhyUs />
        <Stats />
        <Testimonials testimonials={testimonials} />
        <InstagramFeed />
        <CtaBanner />
        <Faq faqs={faqs} />
        <ContactForm />
      </main>
      <SiteFooter />
      <MarvinChat />
      <WhatsAppWidget />
    </>
  );
}
