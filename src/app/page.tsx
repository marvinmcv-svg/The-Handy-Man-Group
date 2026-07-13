import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Projects } from "@/components/site/projects";
import { About } from "@/components/site/about";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBanner } from "@/components/site/cta-banner";
import { Faq } from "@/components/site/faq";
import { ContactForm } from "@/components/site/contact-form";
import { Marquee } from "@/components/site/marquee";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <About />
        <Process />
        <Testimonials />
        <CtaBanner />
        <Faq />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
