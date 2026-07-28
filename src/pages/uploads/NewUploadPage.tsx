import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCreateBatch } from "../../features/uploads/hooks/useCreateBatch";
import ResumeUploader from "../../features/uploads/components/ResumeUploader";

export default function NewUploadPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const { mutateAsync: createBatch } = useCreateBatch();

  const [uploadedResumes, setUploadedResumes] = useState<
    { resumeObjectId: string; resumeUrl: string }[]
  >([]);
  const [totalSize, setTotalSize] = useState<number>(0);

  const hasUploadedResumes = uploadedResumes.length > 0;
  const resumeCount = uploadedResumes.length;

  const handleCreateBatch = useCallback(async () => {
    if (!jobId || !hasUploadedResumes) return;

    await createBatch({
      jobDescriptionId: jobId,
      resumes: uploadedResumes,
      size: totalSize,
    });

    navigate(`/jobs/${jobId}`);
  }, [
    jobId,
    hasUploadedResumes,
    uploadedResumes,
    totalSize,
    createBatch,
    navigate,
  ]);

  const handleUploadComplete = useCallback(
    (
      resumes: { resumeObjectId: string; resumeUrl: string }[],
      size: number
    ) => {
      setUploadedResumes(resumes);
      setTotalSize(size);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        {/* =============================== */}
        {/* Hero */}
        {/* =============================== */}

        <div className="flex items-center justify-between gap-10">
          <div className="space-y-5">
            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <button
                onClick={() => navigate(`/jobs/${jobId}`)}
                className="transition-colors hover:text-text-primary"
              >
                Jobs
              </button>

              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <span className="text-text-primary">Upload Resumes</span>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-action-primary">
                Upload Workflow
              </p>

              <h1 className="text-5xl font-bold tracking-tight text-text-primary">
                Upload Candidate Resumes
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-text-secondary">
                Upload candidate resumes for AI-powered parsing, screening,
                ranking, and hiring recommendations.
              </p>
            </div>
          </div>

          {/* Right Stats */}

          <div className="flex gap-4 shrink-0">
            <div className="w-40 flex flex-col gap-1 items-center rounded-2xl border border-border-default bg-bg-secondary px-6 py-5">
              <p className="text-sm text-text-secondary">Maximum</p>

              <p className=" text-3xl font-bold text-text-primary">50</p>

              <p className="text-xs text-text-secondary">Resumes Per Batch</p>
            </div>

            <div className="w-40 rounded-2xl gap-1 border flex flex-col items-center border-border-default bg-bg-secondary px-6 py-5">
              <p className="text-sm text-text-secondary">Supported</p>

              <p className="mt-2 text-xl font-bold text-emerald-400">
                PDF / DOC
              </p>

              <p className="text-sm text-text-secondary">Formats</p>
            </div>
          </div>
        </div>

        {/* =============================== */}
        {/* Upload Card */}
        {/* =============================== */}

        {jobId && (
          <div className="overflow-hidden rounded-3xl border border-border-default bg-bg-secondary">
            {/* Header */}

            <div className="border-b border-border-default px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-action-primary/10">
                    <svg
                      className="h-4 w-4 text-action-primary"
                      fill="none"
                      viewBox="0 0 16 16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 2v8m0-8L5 5m3-3l3 3M2 11v1.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V11"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-semibold text-text-primary">
                      Resume Upload
                    </h2>

                    <p className="text-sm text-text-secondary">
                      Upload candidate resumes before starting AI screening.
                    </p>
                  </div>
                </div>

                {hasUploadedResumes && (
                  <span className="rounded-full bg-state-success/10 px-3 py-1 text-xs font-semibold text-state-success">
                    {resumeCount} Uploaded
                  </span>
                )}
              </div>

              {/* Stepper */}

              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-4">
                  <StepDot
                    number={1}
                    label="Upload"
                    active={true}
                    done={hasUploadedResumes}
                  />

                  <div
                    className={`h-px w-14 transition-colors ${
                      hasUploadedResumes
                        ? "bg-state-success"
                        : "bg-border-default"
                    }`}
                  />

                  <StepDot
                    number={2}
                    label="Process"
                    active={hasUploadedResumes}
                    done={false}
                  />
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="p-6">
              <ResumeUploader
                onUploadComplete={handleUploadComplete}
                onCreateBatch={handleCreateBatch}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDot({
  number,
  label,
  active,
  done,
}: {
  number: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`
          flex h-10 w-10 items-center justify-center rounded-full
          text-sm font-semibold transition-all
          ${
            done
              ? "bg-state-success/10 text-state-success"
              : active
                ? "bg-action-primary text-white"
                : "bg-bg-primary text-text-secondary border border-border-default"
          }
        `}
      >
        {done ? (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            />
          </svg>
        ) : (
          number
        )}
      </div>

      <span
        className={`text-sm font-medium ${
          active || done ? "text-text-primary" : "text-text-secondary"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
