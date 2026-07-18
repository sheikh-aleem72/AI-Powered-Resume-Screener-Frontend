import { Mail } from "lucide-react";

import { ContactCard } from "./ContactCard";
import { GithubIcon, LinkedinIcon } from "./Icons";

const contactOptions = [
  {
    icon: Mail,
    title: "Email",
    description:
      "Have a question, found a bug, or want to share feedback? Email is the best way to reach me.",
    value: "sheikhaleem363@gmail.com",
    href: "mailto:sheikhaleem363@gmail.com",
    action: "Send Email",
    featured: true,
  },
  {
    icon: GithubIcon,
    title: "GitHub",
    description:
      "Explore the ClearHire source code, follow development progress, and view other projects.",
    value: "github.com/sheikh-aleem72",
    href: "https://github.com/sheikh-aleem72",
    action: "View GitHub",
    featured: false,
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn",
    description:
      "Let's connect professionally and discuss opportunities, ideas, or collaboration.",
    value: "linkedin.com/in/shekh-aalim-467b25240",
    href: "https://www.linkedin.com/in/shekh-aalim-467b25240/",
    action: "Connect",
    featured: false,
  },
];

export const ContactOptions = () => {
  return (
    <section className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Contact Options
        </p>

        <h2 className="mt-4 text-4xl font-bold text-text-primary">
          Choose the best way to reach me
        </h2>

        <p className="mt-4 text-lg leading-8 text-text-secondary">
          Whether you're reporting an issue, asking a question, or sharing an
          idea, I'm always happy to hear your thoughts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {contactOptions.map((option) => (
          <ContactCard
            key={option.title}
            icon={option.icon}
            title={option.title}
            description={option.description}
            value={option.value}
            href={option.href}
            action={option.action}
            featured={option.featured}
          />
        ))}
      </div>
    </section>
  );
};
