import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import type { CreateJobPayload } from "../JobForm";

interface DescriptionCardProps {
  register: UseFormRegister<CreateJobPayload>;
  watch: UseFormWatch<CreateJobPayload>;
  errors: FieldErrors<CreateJobPayload>;
}

export const DescriptionCard = ({
  register,
  watch,
  errors,
}: DescriptionCardProps) => {
  const description = watch("description") ?? "";

  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <label className="mb-2 block text-sm font-medium text-text-secondary">
        <>
          Job Description <span className="text-red-400">*</span>
        </>
      </label>

      <textarea
        {...register("description", {
          required: "Job description is required",
          minLength: {
            value: 30,
            message: "Job description must contain at least 30 characters.",
          },
        })}
        rows={10}
        placeholder="Describe the responsibilities, qualifications, technologies, and expectations for this role..."
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-border-default
          bg-bg-primary
          px-4
          py-4
          text-text-primary
          placeholder:text-text-secondary
          outline-none
          transition-all
          focus:border-action-primary
          focus:ring-2
          focus:ring-action-primary/20
        "
      />

      <div className="mt-3 flex items-center justify-between">
        {errors.description ? (
          <p className="text-sm text-state-error">
            {errors.description.message}
          </p>
        ) : (
          <p className="text-sm text-text-secondary">
            ClearHire extracts skills, experience, and semantic meaning from
            your description to improve candidate ranking.
          </p>
        )}

        <p
          className={`text-sm ${
            description.length >= 30
              ? "text-emerald-400"
              : "text-text-secondary"
          }`}
        >
          {description.length} characters
        </p>
      </div>
    </div>
  );
};
