import { useDropzone } from "react-dropzone";

interface Props {
  onFilesSelected: (files: File[]) => void;
}

export default function Dropzone({ onFilesSelected }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/msword": [],
    },
    onDrop: onFilesSelected,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-10 rounded text-center cursor-pointer"
    >
      <input {...getInputProps()} />

      <p className="font-medium">Drag & drop resumes here</p>
      <p className="text-sm text-gray-400">or click to select files</p>
    </div>
  );
}
