import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSendMessage } from "../hooks/useSendMessage";
import type { ContactPayload } from "../api";

export const ContactForm = () => {
  const mutation = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactPayload) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);

        reset();
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Something went wrong. Please try again."
        );
      },
    });
  };

  return (
    <section id="contact-form">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border-default bg-bg-secondary p-8 md:p-10">
        {/* Card Header */}

        <div className="border-b border-border-subtle pb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
            Contact Form
          </p>

          <h2 className="mt-3 text-3xl font-bold text-text-primary">
            Send a Message
          </h2>

          <p className="mt-3 text-text-secondary">
            Have a question, found a bug, or want to share an idea? I'd
            genuinely love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-7"
          noValidate
        >
          {/* Name + Email */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                disabled={mutation.isPending}
                {...register("name", {
                  required: "Please enter your name.",
                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Name cannot exceed 100 characters.",
                  },
                })}
                className="
                  w-full
                  rounded-xl
                  border
                  border-border-default
                  bg-bg-primary
                  px-4
                  py-3
                  text-text-primary
                  placeholder:text-text-muted
                  outline-none
                  transition
                  focus:border-action-primary
                  focus:ring-2
                  focus:ring-action-primary/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {errors.name && (
                <p className="mt-2 text-sm text-state-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                disabled={mutation.isPending}
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                className="
                  w-full
                  rounded-xl
                  border
                  border-border-default
                  bg-bg-primary
                  px-4
                  py-3
                  text-text-primary
                  placeholder:text-text-muted
                  outline-none
                  transition
                  focus:border-action-primary
                  focus:ring-2
                  focus:ring-action-primary/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {errors.email && (
                <p className="mt-2 text-sm text-state-error">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="Feature request"
              disabled={mutation.isPending}
              {...register("subject", {
                required: "Please enter a subject.",
                minLength: {
                  value: 5,
                  message: "Subject must contain at least 5 characters.",
                },
                maxLength: {
                  value: 120,
                  message: "Subject cannot exceed 120 characters.",
                },
              })}
              className="
                w-full
                rounded-xl
                border
                border-border-default
                bg-bg-primary
                px-4
                py-3
                text-text-primary
                placeholder:text-text-muted
                outline-none
                transition
                focus:border-action-primary
                focus:ring-2
                focus:ring-action-primary/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.subject && (
              <p className="mt-2 text-sm text-state-error">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={7}
              placeholder="Tell me what's on your mind..."
              disabled={mutation.isPending}
              {...register("message", {
                required: "Please enter your message.",
                minLength: {
                  value: 20,
                  message: "Message must contain at least 20 characters.",
                },
                maxLength: {
                  value: 3000,
                  message: "Message cannot exceed 3000 characters.",
                },
              })}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-border-default
                bg-bg-primary
                px-4
                py-3
                text-text-primary
                placeholder:text-text-muted
                outline-none
                transition
                focus:border-action-primary
                focus:ring-2
                focus:ring-action-primary/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.message && (
              <p className="mt-2 text-sm text-state-error">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Footer */}

          <div className="border-t border-border-subtle pt-8">
            <button
              type="submit"
              disabled={mutation.isPending || isSubmitting}
              className="
                inline-flex
                h-12
                items-center
                justify-center
                rounded-xl
                bg-action-primary
                px-6
                font-semibold
                text-white
                opacity-70
                transition
                w-full
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
