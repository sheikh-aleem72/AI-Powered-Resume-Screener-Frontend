import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateJob } from "../../hooks/job/useCreateJob";
import { useCreateBatch } from "../../hooks/batch/useCreateBatch";

import { uploadResumes } from "../../api/resume";

export default function NewUploadPage() {
  const navigate = useNavigate();

  const { mutateAsync: createJob, isPending: isCreatingJob } = useCreateJob();
  const { mutateAsync: createBatch, isPending: isCreatingBatch } =
    useCreateBatch();

  const [jobId, setJobId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedResumes, setUploadedResumes] = useState<
    { resumeObjectId: string; resumeUrl: string }[]
  >([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

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
  /*                              File Selection                                */
  /* -------------------------------------------------------------------------- */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected) return;

    setFiles(Array.from(selected));
  };

  /* -------------------------------------------------------------------------- */
  /*                               Upload Logic                                 */
  /* -------------------------------------------------------------------------- */

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const { resumes, size } = await uploadResumes(files);

      setUploadedResumes(resumes);
      setTotalSize(size);
    } catch (error) {
      console.error("Resume upload failed", error);
    } finally {
      setIsUploading(false);
    }
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
          <div className="border p-4 rounded space-y-4">
            <h2 className="font-medium">Upload Resumes</h2>

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <button
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className="px-4 py-2 bg-green-600 rounded text-white"
            >
              {isUploading ? "Uploading..." : "Upload Resumes"}
            </button>
          </div>

          {/* --------------------------- Uploaded List -------------------------- */}

          {hasUploadedResumes && (
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Uploaded Resumes</h3>

              {uploadedResumes.map((resume) => (
                <div key={resume.resumeObjectId}>{resume.resumeUrl}</div>
              ))}
            </div>
          )}

          {/* ---------------------------- Batch Action -------------------------- */}

          {hasUploadedResumes && (
            <button
              onClick={handleCreateBatch}
              disabled={isCreatingBatch}
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              {isCreatingBatch
                ? "Starting Processing..."
                : "Create Processing Batch"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
