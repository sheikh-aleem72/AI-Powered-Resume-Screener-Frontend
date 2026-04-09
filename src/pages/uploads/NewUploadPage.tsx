import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCreateBatch } from "../../hooks/batch/useCreateBatch";
import ResumeUploader from "../../features/resume-upload/ResumeUploader";

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

  const handleCreateBatch = async () => {
    if (!jobId || !hasUploadedResumes) return;
    await createBatch({
      jobDescriptionId: jobId,
      resumes: uploadedResumes,
      size: totalSize,
    });
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* ====================== */}
        {/* Page Header            */}
        {/* ====================== */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <button
                onClick={() => navigate(`/jobs/${jobId}`)}
                className="hover:text-foreground transition-colors"
              >
                Job
              </button>
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 2.5l3 3.5-3 3.5"
                />
              </svg>
              <span className="text-foreground font-medium">
                Upload Resumes
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Upload Resumes
            </h1>
            <p className="text-sm text-muted-foreground max-w-md">
              Drop in your candidate PDFs. Once uploaded, start processing to
              automatically screen them against the job criteria.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <StepDot
              number={1}
              label="Upload"
              active={true}
              done={hasUploadedResumes}
            />
            <div
              className={`w-8 h-px transition-colors duration-300 ${
                hasUploadedResumes ? "bg-action-primary" : "bg-border"
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

        {/* ====================== */}
        {/* Upload Card            */}
        {/* ====================== */}
        {jobId && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Card header */}
            <div className="px-5 pt-5 pb-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-action-primary/10 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-action-primary"
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
                <span className="text-sm font-medium">Resume files</span>
              </div>

              {hasUploadedResumes && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-state-success/10 text-state-success">
                  {resumeCount} uploaded
                </span>
              )}
            </div>

            {/* Uploader body */}
            <div className="p-5">
              <ResumeUploader
                onUploadComplete={(resumes, size) => {
                  setUploadedResumes(resumes);
                  setTotalSize(size);
                }}
                onCreateBatch={handleCreateBatch}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================= */
/* StepDot sub-component         */
/* ============================= */
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
    <div className="flex flex-col items-center gap-1">
      <div
        className={`
          w-7 h-7 rounded-full flex items-center justify-center
          text-xs font-semibold transition-all duration-300
          ${
            done
              ? "bg-state-success/10 text-state-success"
              : active
                ? "bg-action-primary text-white"
                : "bg-muted text-muted-foreground"
          }
        `}
      >
        {done ? (
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          number
        )}
      </div>
      <span
        className={`text-xs transition-colors ${
          active || done ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
