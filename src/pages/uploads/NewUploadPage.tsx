import { useState } from "react";
import { useCreateJob } from "../../hooks/job/useCreateJob";

export default function NewUploadPage() {
  const { mutateAsync: createJobMutation, isPending } = useCreateJob();

  const [jobId, setJobId] = useState<string | null>(null);

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Create Job & Upload Resumes</h1>

      {!jobId && (
        <button
          onClick={handleCreateJob}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          {isPending ? "Creating Job..." : "Create Job"}
        </button>
      )}

      {jobId && (
        <div className="p-4 border rounded">
          Job created successfully.
          <br />
          Job ID: {jobId}
        </div>
      )}
    </div>
  );
}
