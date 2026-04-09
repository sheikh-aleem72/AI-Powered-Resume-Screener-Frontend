import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SkillsInput } from "./SkillsInput";
import { ExperienceInput } from "./ExperienceInput";
import { useCreateJob } from "../../hooks/job/useCreateJob";

export interface CreateJobPayload {
  title: string;
  company: string;
  location?: string;
  description: string;
  required_skills: string[];
  prefered_skills?: string[];
  experience_level: string;
  min_experience_years: number;
}

export const JobForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateJob();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateJobPayload>({
    defaultValues: {
      required_skills: [],
      prefered_skills: [],
      experience_level: "Mid",
      min_experience_years: 0,
    },
  });

  const inputClass =
    "w-full px-3 py-2 bg-gray-300 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-action-primary text-black";

  const onSubmit = (data: CreateJobPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        navigate(`/jobs/${res._id}`);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg-secondary border border-border-default rounded-2xl p-6 space-y-8"
      >
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Create New Job
          </h2>
          <p className="text-sm text-text-secondary">
            Define clear requirements to improve candidate matching
          </p>
        </div>

        {/* Basics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-text-secondary mb-1 block">
              Job Title *
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={inputClass}
            />
            {errors.title && (
              <p className="text-sm text-state-error">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-text-secondary mb-1 block">
              Company *
            </label>
            <input
              {...register("company", { required: "Company is required" })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary mb-1 block">
            Location
          </label>
          <input {...register("location")} className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-text-secondary mb-1 block">
            Job Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 30, message: "Too short" },
            })}
            className={`${inputClass} min-h-30`}
          />
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <SkillsInput
            name="required_skills"
            label="Required Skills *"
            control={control}
            required
          />
          <SkillsInput
            name="prefered_skills"
            label="Preferred Skills"
            control={control}
          />
        </div>

        {/* Experience */}
        <ExperienceInput control={control} />

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-border-default">
          <button
            type="submit"
            disabled={isPending}
            className="font-medium px-4 py-2 bg-blue-600 rounded text-white disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};
