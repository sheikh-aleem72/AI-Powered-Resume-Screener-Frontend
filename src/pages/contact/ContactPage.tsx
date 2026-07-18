import { ContactCTA } from "../../features/contact/components/ContactCTA";
import { ContactFAQ } from "../../features/contact/components/ContactFAQ";
import { ContactForm } from "../../features/contact/components/ContactForm";
import { ContactHero } from "../../features/contact/components/ContactHero";
import { ContactOptions } from "../../features/contact/components/ContactOptions";
import { SectionDivider } from "../../features/guide/components/SectionDivider";

export const ContactPage = () => {
  return (
    <main className="relative mx-auto max-w-7xl space-y-20 px-8 py-8 bg-bg-secondary/70">
      <ContactHero />

      <SectionDivider />

      <ContactOptions />

      <SectionDivider />

      <ContactForm />

      <SectionDivider />

      <ContactFAQ />

      <SectionDivider />

      <ContactCTA />
    </main>
  );
};
