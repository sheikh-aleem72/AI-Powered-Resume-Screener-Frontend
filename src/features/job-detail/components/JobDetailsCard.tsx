import { BriefcaseBusiness, CalendarDays, Clock3 } from "lucide-react";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";

interface JobDetailsCardProps {
  experienceLevel: string;
  minimumExperience: number;
  requiredSkills: string[];
  createdAt: string;
  updatedAt: string;
}

export const JobDetailsCard = ({
  experienceLevel,
  minimumExperience,
  requiredSkills,
  createdAt,
  updatedAt,
}: JobDetailsCardProps) => {
  return (
    <section className="space-y-6">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Job Information
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hiring Criteria
        </h2>

        <p className="mt-2 text-text-secondary">
          Review the requirements used to evaluate every candidate.
        </p>
      </div>

      {/* Card */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        {/* Top */}

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Requirements */}

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-text-secondary">
              Requirements
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-action-primary/10 p-3">
                  <BriefcaseBusiness className="h-5 w-5 text-action-primary" />
                </div>

                <div>
                  <p className="text-sm text-text-secondary">
                    Experience Level
                  </p>

                  <p className="mt-1 font-semibold text-text-primary">
                    {experienceLevel}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-action-primary/10 p-3">
                  <Clock3 className="h-5 w-5 text-action-primary" />
                </div>

                <div>
                  <p className="text-sm text-text-secondary">
                    Minimum Experience
                  </p>

                  <p className="mt-1 font-semibold text-text-primary">
                    {minimumExperience} years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-text-secondary">
              Timeline
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-action-primary/10 p-3">
                  <CalendarDays className="h-5 w-5 text-action-primary" />
                </div>

                <div>
                  <p className="text-sm text-text-secondary">Created</p>

                  <p className="mt-1 font-semibold text-text-primary">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-sm text-text-secondary">
                    {formatRelativeTime(createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-action-primary/10 p-3">
                  <CalendarDays className="h-5 w-5 text-action-primary" />
                </div>

                <div>
                  <p className="text-sm text-text-secondary">Last Updated</p>

                  <p className="mt-1 font-semibold text-text-primary">
                    {new Date(updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-sm text-text-secondary">
                    {formatRelativeTime(updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="my-8 border-t border-border-subtle" />

        {/* Skills */}

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Required Skills
          </h3>

          <p className="mt-2 text-sm text-text-secondary">
            Candidates are evaluated against these required technologies.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  bg-action-primary/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-action-primary
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
