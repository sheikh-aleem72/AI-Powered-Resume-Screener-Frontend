import type { UploadFileItem } from "./types";

interface Props {
  item: UploadFileItem;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
}
export default function UploadItem({ item, onRetry, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between border p-3 rounded">
      <div className="flex-1">
        <div className="font-medium">{item.file.name}</div>

        <div className="text-sm text-gray-400">
          {item.status === "queued" && "Queued"}
          {item.status === "uploading" && `Uploading ${item.progress}%`}
          {item.status === "uploaded" && "Uploaded"}
          {item.status === "failed" && "Upload failed"}
        </div>

        {item.status === "uploading" && (
          <div className="mt-2 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        {item.status === "failed" && (
          <button
            onClick={() => onRetry(item.id)}
            className="text-blue-500 text-sm"
          >
            Retry
          </button>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 text-sm"
        >
          {item.status === "uploaded" ? "Remove from batch" : "Remove"}
        </button>
      </div>
    </div>
  );
}
