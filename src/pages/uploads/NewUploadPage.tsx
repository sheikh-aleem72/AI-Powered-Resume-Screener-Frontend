import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateJob } from "../../hooks/job/useCreateJob";
import { useCreateBatch } from "../../hooks/batch/useCreateBatch";

import ResumeUploader from "../../features/resume-upload/ResumeUploader";

export default function NewUploadPage() {
  const navigate = useNavigate();

  const { mutateAsync: createJob, isPending: isCreatingJob } = useCreateJob();
  const { mutateAsync: createBatch } = useCreateBatch();

  const [jobId, setJobId] = useState<string | null>(null);

  const [uploadedResumes, setUploadedResumes] = useState<
    { resumeObjectId: string; resumeUrl: string }[]
  >([]);

  const [totalSize, setTotalSize] = useState<number>(0);

  const hasUploadedResumes = uploadedResumes.length > 0;

  /* -------------------------------------------------------------------------- */
  /*                              Job Creation                                  */
  /* -------------------------------------------------------------------------- */

  const handleCreateJob = async () => {
    const job = await createJob({
      title: "Frontend Developer",
      company: "ALSA Infotech",
      description: "React + TypeScript developer",
      required_skills: ["React", "TypeScript"],
      experience_level: "mid",
      min_experience_years: 2,
    });

    setJobId(job._id);
  };

  /* -------------------------------------------------------------------------- */
  /*                             Batch Creation                                 */
  /* -------------------------------------------------------------------------- */

  const handleCreateBatch = async () => {
    if (!jobId || !hasUploadedResumes) return;

    await createBatch({
      jobDescriptionId: jobId,
      resumes: uploadedResumes,
      size: totalSize,
    });

    navigate(`/jobs/${jobId}`);
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Render                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Create Job & Upload Resumes</h1>

      {/* ----------------------------- Create Job ----------------------------- */}

      {!jobId && (
        <button
          onClick={handleCreateJob}
          disabled={isCreatingJob}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          {isCreatingJob ? "Creating Job..." : "Create Job"}
        </button>
      )}

      {/* ----------------------------- Upload Area ---------------------------- */}

      {jobId && (
        <>
          <ResumeUploader
            onUploadComplete={(resumes, size) => {
              setUploadedResumes(resumes);
              setTotalSize(size);
            }}
            onCreateBatch={handleCreateBatch}
          />

          {/* ---------------------------- Batch Action -------------------------- */}

          {/* {hasUploadedResumes && (
            <button
              onClick={handleCreateBatch}
              disabled={isCreatingBatch}
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              {isCreatingBatch
                ? "Starting Processing..."
                : "Create Processing Batch"}
            </button>
          )} */}
        </>
      )}
    </div>
  );
}
