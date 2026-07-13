import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CircleCheckBig,
  Clock3,
  TriangleAlert,
  Users,
} from "lucide-react";

import { type RecentJobCardProps } from "../../../types/workspaceSummary";

const STATUS = {
  completed: {
    icon: CircleCheckBig,
    label: "Completed",
    className:
      "bg-state-success/10 text-state-success border border-state-success/20",
  },

  active: {
    icon: Clock3,
    label: "Active",
    className: "bg-state-info/10 text-state-info border border-state-info/20",
  },

  processing: {
    icon: Clock3,
    label: "Processing",
    className:
      "bg-state-warning/10 text-state-warning border border-state-warning/20",
  },
  failed: {
    icon: TriangleAlert,
    label: "Failed",
    className:
      "bg-state-error/10 text-state-error border border-state-error/20",
  },
};

export const RecentJobCard = ({
  id,
  title,
  status,
  createdAt,
  candidateCount,
}: RecentJobCardProps) => {
  const config = STATUS[status];
  const StatusIcon = config.icon;

  return (
    <Link
      to={`/jobs/${id}`}
      className="
      group
      block
      rounded-3xl
      border
      border-border-default
      bg-bg-secondary
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-action-primary/30
      hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]
    "
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="truncate text-2xl font-semibold text-text-primary">
              {title}
            </h3>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {config.label}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-8 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />

              <span>
                {new Date(createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />

              <span>
                {candidateCount} Candidate
                {candidateCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
          flex
          items-center
          gap-2
          text-action-primary
          font-medium
          transition-transform
          group-hover:translate-x-1
        "
        >
          Open
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};
