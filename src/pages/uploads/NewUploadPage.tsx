import { useState } from "react";
import { useCreateJob } from "../../hooks/job/useCreateJob";
import { uploadResumes } from "../../api/resume";

export default function NewUploadPage() {
  const { mutateAsync: createJobMutation, isPending } = useCreateJob();

  const [jobId, setJobId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedResumes, setUploadedResumes] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleCreateJob = async () => {
    const response = await createJobMutation({
      title: "Frontend Developer",
      company: "ALSA Infotech",
      description: "React + TypeScript developer",
      required_skills: ["React", "TypeScript"],
      experience_level: "mid",
      min_experience_years: 2,
    });

    setJobId(response._id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setIsUploading(true);

    try {
      const result = await uploadResumes(files);

      setUploadedResumes(result);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Create Job & Upload Resumes</h1>

      {!jobId && (
        <button
          onClick={handleCreateJob}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Create Job
        </button>
      )}

      {jobId && (
        <>
          <div className="border p-4 rounded space-y-4">
            <h2 className="font-medium">Upload Resumes</h2>

            <input
              type="file"
              multiple
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-green-600 rounded"
            >
              {isUploading ? "Uploading..." : "Upload Resumes"}
            </button>
          </div>

          {uploadedResumes.length > 0 && (
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Uploaded</h3>

              {uploadedResumes.map((r, index) => (
                <div key={index}>{r.resumeUrl}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
