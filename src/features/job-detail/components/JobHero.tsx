import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";

interface JobHeroProps {
  title: string;
  description: string;
  status: "processing" | "completed";
  canUpload: boolean;
  jobId: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  requiredSkills: number;
}

export const JobHero = ({
  title,
  description,
  status,
  canUpload,
  jobId,
  location,
  createdAt,
  updatedAt,
  requiredSkills,
}: JobHeroProps) => {
  return (
    <section className="rounded-3xl border border-border-default bg-bg-secondary p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2">
            <BriefcaseBusiness className="h-4 w-4 text-action-primary" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-action-primary">
              Workspace
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-action-primary" />
              <span>{location || "Remote"}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-action-primary" />
              <span>
                Created{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-action-primary" />
              <span>{formatRelativeTime(updatedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-action-primary" />
              <span>{requiredSkills} Required Skills</span>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-5 lg:items-end">
          <span
            className={`
              inline-flex
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${
                status === "completed"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }
            `}
          >
            {status === "completed" ? "Completed" : "Processing"}
          </span>

          <Link
            to={`/jobs/${jobId}/uploads/new`}
            className={`
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              px-6
              font-semibold
              transition-all
              ${
                canUpload
                  ? "bg-action-primary text-white hover:bg-action-primary-hover"
                  : "cursor-not-allowed bg-bg-surface text-text-muted"
              }
            `}
            onClick={(e) => {
              if (!canUpload) e.preventDefault();
            }}
          >
            <Plus className="h-5 w-5" />
            Add Resumes
          </Link>

          {!canUpload && (
            <p className="max-w-xs text-left text-sm text-text-secondary">
              Resume uploads will be available once the current screening
              finishes.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
