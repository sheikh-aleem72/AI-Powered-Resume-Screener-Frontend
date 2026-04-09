import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useJob } from "../../hooks/job/useJob";
import { useJobResumes } from "../../hooks/job/useJobResumes";
import { useJobUpdates } from "../../hooks/job/useJobUpdates";
import { ResumeTable } from "../../components/jobs/ResumeTable";
import { useState, useEffect } from "react";

export const JobDetailPage = () => {
  const limit = 20;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { jobId } = useParams<{ jobId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const passFailParam = searchParams.get("passFail");
  const passFail =
    passFailParam === "passed" || passFailParam === "failed"
      ? passFailParam
      : undefined;

  const { data, isLoading, isError, error } = useJob(jobId!);
  const { data: resumeResponse } = useJobResumes(jobId!, page, limit, passFail);

  const resumes = resumeResponse?.resumes ?? [];
  const total = resumeResponse?.total ?? 0;

  useJobUpdates(jobId!);

  useEffect(() => {
    setPage(1);
  }, [passFail]);

  if (isLoading) return <div className="p-8">Loading job...</div>;
  if (isError)
    return <div className="p-8 text-red-500">{(error as Error).message}</div>;
  if (!data)
    return <div className="p-8 text-muted-foreground">Job not found.</div>;

  const progressPercent =
    data.totalResumes === 0
      ? 0
      : Math.round((data.completedResumes / data.totalResumes) * 100);

  const isComplete = data.completedResumes === data.totalResumes;
  const isAddDisabled = !isComplete && data.totalResumes > 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* ====================== */}
      {/* Job Header Section */}
      {/* ====================== */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{data.title}</h1>
              {/* Status Badge — lives next to the title, contextually logical */}
              <span
                className={`text-xs font-medium px-2 py-1 rounded-sm ${
                  isComplete
                    ? "text-state-success bg-state-success/10"
                    : "text-state-warning bg-state-warning/10"
                }`}
              >
                {isComplete ? "Completed" : "Processing"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-3xl">
              {data.description}
            </p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              Experience Level
            </p>
            <p className="font-medium">{data.experience_level}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              Minimum Experience
            </p>
            <p className="font-medium">{data.min_experience_years} years</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              Required Skills
            </p>
            <p className="font-medium">{data.required_skills.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* Progress Section */}
      {/* ====================== */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span>
            {data.completedResumes} / {data.totalResumes} processed
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div className="h-3 w-full rounded bg-border bg-bg-primary">
          <div
            className="h-3 rounded bg-green-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ====================== */}
      {/* Add Resumes CTA Strip */}
      {/* ====================== */}
      <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-4 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">
            {isAddDisabled
              ? "Processing in progress…"
              : data.totalResumes > 0
                ? "Upload additional resumes to this job"
                : "No resumes uploaded yet — get started below"}
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
            flex items-center gap-2
            px-5 py-2
            rounded-lg
            bg-action-primary
            text-white
            text-sm font-semibold
            ring-1 ring-inset ring-white/10
            hover:bg-action-primary-hover
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          {data.totalResumes > 0 ? "Add More Resumes" : "Add Resumes"}
        </button>
      </div>

      {/* ====================== */}
      {/* Candidates Section */}
      {/* ====================== */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold">Candidates</h2>
            <span className="text-sm text-muted-foreground">
              {total === 0
                ? "No candidates yet"
                : `Showing ${(page - 1) * limit + 1}–${Math.min(
                    page * limit,
                    total
                  )} of ${total}`}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setSearchParams({})}
              className={`px-3 py-1.5 rounded-md border text-sm transition ${
                !passFail
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSearchParams({ passFail: "passed" })}
              className={`px-3 py-1.5 rounded-md border text-sm transition ${
                passFail === "passed"
                  ? "bg-green-500 text-white border-green-500"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              Matched
            </button>

            <button
              onClick={() => setSearchParams({ passFail: "failed" })}
              className={`px-3 py-1.5 rounded-md border text-sm transition ${
                passFail === "failed"
                  ? "bg-red-500 text-white border-red-500"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              Not Matched
            </button>
          </div>
        </div>

        <ResumeTable resumes={resumes} />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
