import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useJob } from "../../features/job-detail/hooks/useJob";
import { useJobResumes } from "../../features/job-detail/hooks/useJobResumes";
import { useJobUpdates } from "../../features/job-detail/hooks/useJobUpdates";
import { useDeleteMutation } from "../../features/jobs/hooks/useDeleteJob";

import { JobHero } from "../../features/job-detail/components/JobHero";
import { JobDetailsCard } from "../../features/job-detail/components/JobDetailsCard";
import { PipelineProgress } from "../../features/job-detail/components/PipelineProgress";
import { CandidateToolbar } from "../../features/job-detail/components/CandidateToolbar";
import { ResumeTable } from "../../features/job-detail/components/ResumeTable";
import { JobError } from "../../features/job-detail/components/JobError";
import { EmptyCandidates } from "../../features/job-detail/components/EmptyCandidates";
import { JobLoading } from "../../features/job-detail/components/JobsLoading";
import { JobStats } from "../../features/job-detail/components/JobsStats";
import { PageBackButton } from "../../features/shared/components/PageBackButton";

export const JobDetailPage = () => {
  const ITEMS_PER_PAGE = 20;

  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const [searchParams, setSearchParams] = useSearchParams();

  const deleteMutation = useDeleteMutation();

  const passFailParam = searchParams.get("passFail");

  const passFail =
    passFailParam === "passed" || passFailParam === "failed"
      ? passFailParam
      : undefined;

  const [page, setPage] = useState(1);

  //----------------------------------------------------
  // Queries
  //----------------------------------------------------

  const { data, isLoading, isError, refetch } = useJob(jobId!);

  const { data: resumeResponse } = useJobResumes(
    jobId!,
    page,
    ITEMS_PER_PAGE,
    passFail
  );

  useJobUpdates(jobId!);

  //----------------------------------------------------
  // Loading / Error
  //----------------------------------------------------

  if (isLoading) {
    return <JobLoading />;
  }

  if (isError) {
    return <JobError onRetry={() => refetch()} />;
  }

  if (!data) {
    return <JobError onRetry={() => navigate("/jobs")} />;
  }

  //----------------------------------------------------
  // Derived values
  //----------------------------------------------------

  const resumes = resumeResponse?.resumes ?? [];

  const totalCandidates = resumeResponse?.total ?? 0;

  const processingResumes = Math.max(
    data.totalResumes - data.completedResumes - data.failedResumes,
    0
  );

  const totalPages = Math.ceil(totalCandidates / ITEMS_PER_PAGE);

  const isComplete =
    data.totalResumes > 0 && data.completedResumes === data.totalResumes;

  const canUpload = isComplete || data.totalResumes === 0;

  //----------------------------------------------------
  // Delete Job
  //----------------------------------------------------

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(jobId!, {
      onSuccess: () => navigate("/jobs"),
    });
  };

  //----------------------------------------------------
  // Render
  //----------------------------------------------------

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-8 py-8">
      <PageBackButton to="/jobs" label="Back to Jobs" />

      <JobHero
        title={data.title}
        description={data.description}
        status={isComplete ? "completed" : "processing"}
        canUpload={canUpload}
        jobId={jobId!}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
        location={data?.location}
        requiredSkills={data.required_skills?.length}
      />

      <JobStats
        totalResumes={data.totalResumes}
        completedResumes={data.completedResumes}
        processingResumes={processingResumes}
        failedResumes={data.failedResumes}
      />

      <JobDetailsCard
        experienceLevel={data.experience_level}
        minimumExperience={data.min_experience_years}
        requiredSkills={data.required_skills}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
      />

      <PipelineProgress
        completedResumes={data.completedResumes}
        totalResumes={data.totalResumes}
        failedResumes={data.failedResumes}
      />
      <section className="space-y-6">
        <CandidateToolbar
          totalCandidates={totalCandidates}
          passFail={passFail}
          onFilterChange={(value) => {
            setPage(1);
            if (value) {
              setSearchParams({ passFail: value });
            } else {
              setSearchParams({});
            }
          }}
        />

        {resumes.length === 0 ? (
          <EmptyCandidates />
        ) : (
          <>
            <ResumeTable resumes={resumes} />

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-3xl border border-border-default bg-bg-secondary px-6 py-4">
                <div className="text-sm text-text-secondary">
                  Showing{" "}
                  <span className="font-semibold text-text-primary">
                    {(page - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  –
                  <span className="font-semibold text-text-primary">
                    {" "}
                    {Math.min(page * ITEMS_PER_PAGE, totalCandidates)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-text-primary">
                    {totalCandidates}
                  </span>{" "}
                  candidates
                </div>

                <div className="flex items-center gap-3">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="
                      rounded-xl
                      border
                      border-border-default
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-text-primary
                      transition
                      hover:border-action-primary/40
                      hover:bg-bg-primary
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    Previous
                  </button>

                  <div className="rounded-xl bg-bg-primary px-4 py-2 text-sm font-semibold text-text-primary">
                    Page {page} / {totalPages}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="
                      rounded-xl
                      border
                      border-border-default
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-text-primary
                      transition
                      hover:border-action-primary/40
                      hover:bg-bg-primary
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer Actions */}

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
              Danger Zone
            </p>

            <h2 className="mt-2 text-2xl font-bold text-text-primary">
              Delete Hiring Pipeline
            </h2>

            <p className="mt-2 max-w-2xl text-text-secondary">
              Permanently delete this job along with all uploaded resumes,
              candidate rankings, and processing history. This action cannot be
              undone.
            </p>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="
              inline-flex
              h-12
              items-center
              justify-center
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-6
              font-semibold
              text-red-400
              transition
              hover:bg-red-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </section>
    </div>
  );
};
