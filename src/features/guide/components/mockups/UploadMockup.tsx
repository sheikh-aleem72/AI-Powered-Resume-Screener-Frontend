import { CheckCircle2, FileText, UploadCloud } from "lucide-react";

export const UploadMockup = () => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      {/* Dropzone */}

      <div className="rounded-2xl border-2 border-dashed border-action-primary/30 bg-bg-primary p-8 text-center">
        <UploadCloud className="mx-auto h-10 w-10 text-action-primary" />

        <h3 className="mt-4 text-lg font-semibold text-text-primary">
          Drag & Drop Resumes
        </h3>

        <p className="mt-2 text-sm text-text-secondary">
          PDF and DOCX supported
        </p>
      </div>

      {/* Upload Queue */}

      <div className="mt-8 space-y-4">
        {[
          { file: "john_doe.pdf", progress: 100 },
          { file: "alex_resume.pdf", progress: 100 },
          { file: "emma_cv.docx", progress: 68 },
        ].map(({ file, progress }) => (
          <div
            key={file}
            className="rounded-xl border border-border-default bg-bg-primary p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-action-primary" />

                <span className="text-sm text-text-primary">{file}</span>
              </div>

              {progress === 100 ? (
                <CheckCircle2 className="h-5 w-5 text-state-success" />
              ) : (
                <span className="text-xs text-text-secondary">{progress}%</span>
              )}
            </div>

            {progress !== 100 && (
              <div className="mt-3 h-2 rounded-full bg-border-subtle">
                <div
                  className="h-2 rounded-full bg-action-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
