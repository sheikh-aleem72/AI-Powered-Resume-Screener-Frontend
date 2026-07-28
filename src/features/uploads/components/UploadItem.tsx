import type { UploadFileItem } from "../types";

interface Props {
  item: UploadFileItem;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function UploadItem({ item, onRetry, onRemove }: Props) {
  const statusStyles = {
    queued: "bg-slate-500/10 text-slate-300",
    uploading: "bg-action-primary/10 text-action-primary",
    uploaded: "bg-state-success/10 text-state-success",
    failed: "bg-state-error/10 text-state-error",
  };

  const statusLabel = {
    queued: "Queued",
    uploading: "Uploading",
    uploaded: "Uploaded",
    failed: "Upload Failed",
  };

  return (
    <div
      className="
      rounded-2xl
      border
      border-border-default
      bg-bg-primary
      px-5
      py-4
      transition-all
      duration-200
      hover:border-action-primary/40
      hover:bg-bg-secondary
      "
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex flex-1 gap-4">
          {/* File Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-action-primary/10">
            <svg
              className="h-5 w-5 text-action-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 2h7l5 5v15H7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* File Info */}
          <div className="flex-1">
            <p className="font-medium text-text-primary break-all">
              {item.file.name}
            </p>

            <p className="mt-1 text-sm text-text-secondary">
              {(item.file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            {item.status === "uploading" && (
              <div className="mt-4 max-w-xs">
                <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                  <div
                    className="h-full rounded-full bg-action-primary transition-all"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-text-secondary">
                  {item.progress}% uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-4 ">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[item.status]
            }`}
          >
            {statusLabel[item.status]}
          </span>

          <div className="flex gap-4">
            {item.status === "failed" && (
              <button
                onClick={() => onRetry(item.id)}
                className="text-sm font-medium text-action-primary transition-opacity hover:opacity-80"
              >
                Retry
              </button>
            )}

            <button
              onClick={() => onRemove(item.id)}
              className="text-sm font-medium text-state-error transition-opacity hover:opacity-80"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
