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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Services />
        <WhyUs />
        <Stats />
        <Testimonials />
        <CtaBanner />
        <Faq />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
