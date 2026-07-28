import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type CreateJobPayload } from "../JobForm";

interface BasicInformationCardProps {
  register: UseFormRegister<CreateJobPayload>;
  errors: FieldErrors<CreateJobPayload>;
}

export const BasicInformationCard = ({
  register,
  errors,
}: BasicInformationCardProps) => {
  const inputClass = `
    w-full
    rounded-xl
    border
    border-border-default
    bg-bg-primary
    px-4
    py-3
    text-text-primary
    placeholder:text-text-secondary
    outline-none
    transition-all
    focus:border-action-primary
    focus:ring-2
    focus:ring-action-primary/20
  `;

  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary">
            <>
              Job Title <span className="text-red-400">*</span>
            </>
          </label>

          <input
            {...register("title", {
              required: "Job title is required",
            })}
            placeholder="e.g. Frontend React Developer"
            className={inputClass}
          />

          {errors.title && (
            <p className="mt-2 text-sm text-state-error">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Company */}

        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary">
            <>
              Company <span className="text-red-400">*</span>
            </>
          </label>

          <input
            {...register("company", {
              required: "Company is required",
            })}
            placeholder="e.g. OpenAI"
            className={inputClass}
          />

          {errors.company && (
            <p className="mt-2 text-sm text-state-error">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      {/* Location */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-text-secondary">
          Location
        </label>

        <input
          {...register("location")}
          placeholder="e.g. Hyderabad, India or Remote"
          className={inputClass}
        />
      </div>
    </div>
  );
};
