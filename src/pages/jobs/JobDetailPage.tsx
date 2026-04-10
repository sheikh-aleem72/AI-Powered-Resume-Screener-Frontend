import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useJob } from "../../hooks/job/useJob";
import { useJobResumes } from "../../hooks/job/useJobResumes";
import { useJobUpdates } from "../../hooks/job/useJobUpdates";
import { ResumeTable } from "../../components/jobs/ResumeTable";
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// JobDetailPage
//
// Displays a single job's full detail view:
//   - Job header (title, status badge, metadata)
//   - Processing progress bar
//   - Add Resumes CTA strip
//   - Candidates table with pass/fail filtering and pagination
//
// Real-time resume processing updates are streamed via `useJobUpdates`.
// ---------------------------------------------------------------------------

export const JobDetailPage = () => {
  // -------------------------------------------------------------------------
  // Constants
  // -------------------------------------------------------------------------

  const ITEMS_PER_PAGE = 20;

  // -------------------------------------------------------------------------
  // Routing & URL state
  // -------------------------------------------------------------------------

  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse passFail filter from query string; only accept known values.
  const passFailParam = searchParams.get("passFail");
  const passFail =
    passFailParam === "passed" || passFailParam === "failed"
      ? passFailParam
      : undefined;

  // -------------------------------------------------------------------------
  // Local state
  // -------------------------------------------------------------------------

  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the filter changes to avoid empty pages.
  useEffect(() => {
    setPage(1);
  }, [passFail]);

  // -------------------------------------------------------------------------
  // Data fetching
  // -------------------------------------------------------------------------

  const { data, isLoading, isError, error } = useJob(jobId!);
  const { data: resumeResponse } = useJobResumes(
    jobId!,
    page,
    ITEMS_PER_PAGE,
    passFail
  );

  // Subscribe to real-time resume processing updates via SSE / WebSocket.
  useJobUpdates(jobId!);

  const resumes = resumeResponse?.resumes ?? [];
  const total = resumeResponse?.total ?? 0;

  // -------------------------------------------------------------------------
  // Loading / error states
  // -------------------------------------------------------------------------

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="text-sm">Loading job…</span>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="p-8">
        <div className="rounded-lg border border-state-danger/20 bg-state-danger/5 px-4 py-3 text-sm text-state-danger">
          {(error as Error).message}
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="p-8 text-sm text-muted-foreground">Job not found.</div>
    );

  // -------------------------------------------------------------------------
  // Derived values
  // -------------------------------------------------------------------------

  const progressPercent =
    data.totalResumes === 0
      ? 0
      : Math.round((data.completedResumes / data.totalResumes) * 100);

  const isComplete =
    data.totalResumes > 0 && data.completedResumes === data.totalResumes;

  // Disable "Add Resumes" while a batch is actively processing.
  const isAddDisabled = !isComplete && data.totalResumes > 0;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const rangeStart = total === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(page * ITEMS_PER_PAGE, total);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Back navigation                                                     */}
      {/* ------------------------------------------------------------------ */}

      <button
        onClick={() => navigate("/jobs")}
        className="
          inline-flex items-center gap-1.5
          text-sm text-muted-foreground
          hover:text-foreground
          transition-colors
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 12L6 8l4-4"
          />
        </svg>
        Back to Jobs
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Job header                                                          */}
      {/* Combines identity (title, description) with key metadata in a      */}
      {/* single card so the reader gets the full job context at a glance.   */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-semibold tracking-tight">
                {data.title}
              </h1>
              {/* Status badge — inline with title for immediate context */}
              <StatusBadge
                isComplete={isComplete}
                totalResumes={data.totalResumes}
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Metadata row */}
        <div className="grid grid-cols-3 gap-6 text-sm">
          <MetaField label="Experience Level" value={data.experience_level} />
          <MetaField
            label="Minimum Experience"
            value={`${data.min_experience_years} year${data.min_experience_years !== 1 ? "s" : ""}`}
          />
          <MetaField
            label="Required Skills"
            value={
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.required_skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="
                      text-xs px-2 py-0.5 rounded-md
                      bg-action-primary/10 text-action-primary
                      font-medium
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            }
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Progress bar — lives inside the job card so it reads as part of  */}
        {/* the job's state, not a separate floating section.                */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              {data.completedResumes} / {data.totalResumes} resumes processed
            </span>
            <span className="tabular-nums font-medium">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${isComplete ? "bg-state-success" : "bg-action-primary"}
              `}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Add Resumes CTA strip                                               */}
      {/* Positioned between the job card and the candidates table so the    */}
      {/* action is semantically adjacent to both the job context above and  */}
      {/* the candidate results below.                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          rounded-xl border border-dashed border-border
          bg-card/50 px-5 py-4
          flex items-center justify-between gap-4
        "
      >
        <div className="space-y-0.5 min-w-0">
          <p className="text-sm font-medium truncate">
            {isAddDisabled
              ? "Processing in progress…"
              : data.totalResumes > 0
                ? "Upload additional resumes to this job"
                : "No resumes uploaded yet — get started"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isAddDisabled
              ? "You can add more resumes once the current batch finishes."
              : "Uploaded resumes will be automatically screened against the job criteria."}
          </p>
        </div>

        <button
          disabled={isAddDisabled}
          onClick={() => navigate(`/jobs/${jobId}/uploads/new`)}
          className="
            flex items-center gap-2 px-4 py-2 shrink-0
            rounded-lg bg-action-primary text-white text-sm font-semibold
            ring-1 ring-inset ring-white/10
            hover:bg-action-primary-hover hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          {data.totalResumes > 0 ? "Add More Resumes" : "Add Resumes"}
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Candidates section                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="space-y-4">
        {/* Section toolbar: label + count + pass/fail filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold">Candidates</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {total === 0 ? "0" : `${rangeStart}–${rangeEnd} of ${total}`}
            </span>
          </div>

          {/* Pass/fail filter buttons */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
            {(
              [
                { label: "All", value: undefined },
                { label: "Matched", value: "passed" },
                { label: "Not Matched", value: "failed" },
              ] as const
            ).map(({ label, value }) => {
              const isActive = passFail === value;
              return (
                <button
                  key={label}
                  onClick={() =>
                    value
                      ? setSearchParams({ passFail: value })
                      : setSearchParams({})
                  }
                  className={`
                    px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
                    ${
                      isActive
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Candidates table */}
        <ResumeTable resumes={resumes} />

        {/* Pagination — only shown when there is more than one page */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
                flex items-center gap-1.5 px-3 py-1.5
                text-sm text-muted-foreground border border-border rounded-lg
                hover:text-foreground hover:border-foreground/30
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 12L6 8l4-4"
                />
              </svg>
              Prev
            </button>

            <span className="text-sm text-muted-foreground px-2 tabular-nums">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="
                flex items-center gap-1.5 px-3 py-1.5
                text-sm text-muted-foreground border border-border rounded-lg
                hover:text-foreground hover:border-foreground/30
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors
              "
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 4l4 4-4 4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// StatusBadge
//
// Displays the current processing state of the job inline with the title.
// ---------------------------------------------------------------------------

function StatusBadge({
  isComplete,
  totalResumes,
}: {
  isComplete: boolean;
  totalResumes: number;
}) {
  if (totalResumes === 0) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
        Empty
      </span>
    );
  }

  return (
    <span
      className={`
        text-xs font-medium px-2 py-0.5 rounded-md
        ${
          isComplete
            ? "bg-state-success/10 text-state-success"
            : "bg-state-warning/10 text-state-warning"
        }
      `}
    >
      {isComplete ? "Completed" : "Processing"}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MetaField
//
// Renders a labeled metadata field in the job header grid.
// Accepts either a plain string or a custom React node as the value.
// ---------------------------------------------------------------------------

function MetaField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      {typeof value === "string" ? (
        <p className="font-medium text-sm">{value}</p>
      ) : (
        value
      )}
    </div>
  );
}
