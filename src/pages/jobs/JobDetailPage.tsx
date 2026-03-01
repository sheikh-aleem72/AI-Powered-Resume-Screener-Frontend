import { useParams, useSearchParams } from "react-router-dom";
import { useJob } from "../../hooks/job/useJob";
import { useJobResumes } from "../../hooks/job/useJobResumes";
import { useJobUpdates } from "../../hooks/job/useJobUpdates";
import { ResumeTable } from "../../components/jobs/ResumeTable";
import { useState, useEffect } from "react";

export const JobDetailPage = () => {
  const limit = 20;
  const [page, setPage] = useState(1);

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

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* ====================== */}
      {/* Job Header Section */}
      {/* ====================== */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{data.title}</h1>
            <p className="text-sm text-muted-foreground max-w-3xl">
              {data.description}
            </p>
          </div>

          <div
            className={`text-sm font-medium ${
              isComplete ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {isComplete ? "Completed" : "Processing"}
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
      {/* Candidates Section */}
      {/* ====================== */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {total === 0 ? 0 : (page - 1) * limit + 1}–
            {Math.min(page * limit, total)} of {total} candidates
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-3 py-1 rounded border ${
                !passFail ? "bg-primary text-white" : ""
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSearchParams({ passFail: "passed" })}
              className={`px-3 py-1 rounded border ${
                passFail === "passed" ? "bg-green-500 text-white" : ""
              }`}
            >
              Matched
            </button>

            <button
              onClick={() => setSearchParams({ passFail: "failed" })}
              className={`px-3 py-1 rounded border ${
                passFail === "failed" ? "bg-red-500 text-white" : ""
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
