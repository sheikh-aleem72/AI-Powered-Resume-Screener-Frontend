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
          border-2 border-dashed rounded p-10 text-center transition

          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-action-primary"
          }
          `}
    >
      <input {...getInputProps()} />

      <p className="font-medium">
        {disabled ? "Maximum resumes reached" : "Drag & drop resumes here"}
      </p>

      <p className="text-sm text-gray-400">
        {disabled
          ? `Maximum ${MAX_RESUMES_PER_BATCH} resumes allowed`
          : "or click to select files"}
      </p>
    </div>
  );
}
