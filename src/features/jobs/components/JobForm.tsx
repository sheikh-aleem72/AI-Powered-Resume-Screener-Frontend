import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SkillsInput } from "./SkillsInput";
import { ExperienceInput } from "./ExperienceInput";
import { useCreateJob } from "../hooks/useCreateJob";
import { SectionHeader } from "./job-create/SectionHeader";
import { BasicInformationCard } from "./job-create/BasicInformationCard";
import { DescriptionCard } from "./job-create/DescriptionCard";

export interface CreateJobPayload {
  title: string;
  company: string;
  location?: string;
  description: string;
  required_skills: string[];
  prefered_skills: string[];
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateJobPayload>({
    defaultValues: {
      required_skills: [],
      prefered_skills: [],
      experience_level: "Junior",
      min_experience_years: 0,
    },
  });

  // const inputClass =
  //   "w-full px-3 py-2 bg-gray-300 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-action-primary text-black";

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
        <SectionHeader
          step={1}
          eyebrow="Job Details"
          title="Basic Information"
          description="Provide the essential details about the role you're hiring for."
        />

        <div className="mt-6">
          <BasicInformationCard register={register} errors={errors} />
        </div>

        {/* Description */}

        <div className="space-y-6s">
          <SectionHeader
            step={2}
            eyebrow="Role Description"
            title="Job Description"
            description="Describe the responsibilities, qualifications, and expectations for this role."
          />

          <DescriptionCard register={register} watch={watch} errors={errors} />
        </div>

        {/* Skills */}
        <div className="space-y-6">
          <SectionHeader
            step={3}
            eyebrow="Requirements"
            title="Skills"
            description="Define the skills ClearHire should prioritize when ranking candidates."
          />

          <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 space-y-8">
            <div>
              <SkillsInput
                name="required_skills"
                label="Required Skills"
                control={control}
                required
              />
              <p className="mt-3 text-sm text-text-secondary">
                Example: React • Node.js • PostgreSQL • AWS
              </p>
            </div>

            <div className="border-t border-border-subtle" />

            <div>
              <SkillsInput
                name="prefered_skills"
                label="Preferred Skills"
                control={control}
              />
              <p className="mt-3 text-sm text-text-secondary">
                Example: Docker • Kubernetes • GraphQL
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-6">
          <SectionHeader
            step={4}
            eyebrow="Requirements"
            title="Experience"
            description="Define the minimum experience expected for this role."
          />

          <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
            <ExperienceInput control={control} setValue={setValue} />
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Information */}

            <div>
              <h4 className="text-base font-semibold text-text-primary">
                Ready to create this hiring pipeline?
              </h4>

              <p className="mt-1 text-sm text-text-secondary">
                ClearHire will save this job and you'll be able to upload
                resumes immediately.
              </p>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                disabled={isPending}
                className="
          rounded-xl
          border
          border-border-default
          px-5
          py-3
          font-medium
          text-text-secondary
          transition
          hover:bg-bg-primary
        "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="
          rounded-xl
          bg-action-primary
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
              >
                {isPending ? "Creating Pipeline..." : "Create Hiring Pipeline"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
