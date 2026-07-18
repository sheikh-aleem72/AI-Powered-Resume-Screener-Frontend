import { ArrowRight, MessageCircle } from "lucide-react";

export const ContactHero = () => {
  const scrollToContactForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="rounded-3xl border border-border-default bg-bg-secondary px-8 py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2">
          <MessageCircle className="h-4 w-4 text-action-primary" />

          <span className="text-sm font-medium text-action-primary">
            Let's Connect
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-text-primary lg:text-5xl">
          Need help with ClearHire?
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
          ClearHire is an independent project that continues to evolve through
          real feedback. Whether you've found a bug, have a feature idea, or
          simply want to say hello, I'd genuinely love to hear from you.
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={scrollToContactForm}
          className="
            mt-10
            inline-flex
            h-12
            items-center
            gap-3
            rounded-xl
            bg-action-primary
            px-6
            font-semibold
            text-white
            shadow-lg
            shadow-action-primary/20
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-action-primary-hover
            hover:shadow-action-primary/40
          "
        >
          Send a Message
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
