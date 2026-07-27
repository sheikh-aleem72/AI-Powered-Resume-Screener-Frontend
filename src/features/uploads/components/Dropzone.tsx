import { useDropzone } from "react-dropzone";

const MAX_RESUMES_PER_BATCH = 50;

interface Props {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export default function Dropzone({ onFilesSelected, disabled = false }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    accept: {
      "application/pdf": [],
      "application/msword": [],
    },
    onDrop: onFilesSelected,
  });

  return (
    <div
      {...getRootProps()}
      className={`
      group
      rounded-2xl
      border-2
      border-dashed
      transition-all
      duration-300
      ${
        disabled
          ? "cursor-not-allowed border-border-default opacity-50"
          : "cursor-pointer border-border-default hover:border-action-primary hover:bg-action-primary/5"
      }
    `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center py-16 px-6">
        {/* Upload Icon */}

        <div
          className={`
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          transition-all
          ${
            disabled
              ? "bg-bg-primary"
              : "bg-action-primary/10 group-hover:bg-action-primary/20"
          }
        `}
        >
          <svg
            className="h-8 w-8 text-action-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 18v1a2 2 0 002 2h12a2 2 0 002-2v-1"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-text-primary">
          {disabled ? "Maximum resumes reached" : "Drag & drop resumes"}
        </h3>

        <p className="mt-2 text-text-secondary">
          {disabled
            ? `Maximum ${MAX_RESUMES_PER_BATCH} resumes allowed`
            : "or browse from your computer"}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-text-muted">
          <span>PDF</span>

          <span>•</span>

          <span>DOC</span>

          <span>•</span>

          <span>Maximum {MAX_RESUMES_PER_BATCH} resumes</span>
        </div>
      </div>
    </div>
  );
}
