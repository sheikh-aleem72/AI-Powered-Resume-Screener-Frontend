import { useEffect, useState } from "react";

import Dropzone from "./Dropzone";
import UploadQueue from "./UploadQueue";

import type { UploadFileItem } from "./types";

import { uploadApi } from "../../api/uploads";
import { resumeApi } from "../../api/resume";

interface Props {
  onUploadComplete: (
    resumes: { resumeObjectId: string; resumeUrl: string }[],
    size: number
  ) => void;
  onCreateBatch: () => void;
  isCreatingBatch?: boolean;
  onCancel?: () => void;
}

export default function ResumeUploader({
  onUploadComplete,
  onCreateBatch,
  isCreatingBatch = false,
  onCancel,
}: Props) {
  const [items, setItems] = useState<UploadFileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // const uploadedItems = items.filter((i) => i.status === "uploaded");
  const totalFiles = items.length;
  const uploadedCount = items.filter((i) => i.status === "uploaded").length;
  const remainingCount = totalFiles - uploadedCount;
  const allUploaded = totalFiles > 0 && remainingCount === 0;
  const hasQueued = items.some((i) => i.status === "queued");

  /* -------------------------------------------------------------------------- */
  /*                              Side Effects                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isUploading && items.length === 0) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isUploading, items]);

  useEffect(() => {
    const uploaded = items
      .filter((i) => i.status === "uploaded")
      .map((i) => ({
        resumeObjectId: i.resumeObjectId!,
        resumeUrl: i.resumeUrl!,
      }));
    const size = items
      .filter((i) => i.status === "uploaded")
      .reduce((sum, i) => sum + i.file.size, 0);
    onUploadComplete(uploaded, size);
  }, [items]);

  /* -------------------------------------------------------------------------- */
  /*                              File Handlers                                 */
  /* -------------------------------------------------------------------------- */

  const handleFiles = (files: File[]) => {
    setItems((prev) => {
      const existingKeys = new Set(
        prev.map((i) => `${i.file.name}-${i.file.size}`)
      );
      const newItems: UploadFileItem[] = files
        .filter((file) => !existingKeys.has(`${file.name}-${file.size}`))
        .map((file) => ({
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: "queued",
        }));
      if (files.length - newItems.length > 0)
        alert(
          `${files.length - newItems.length} duplicate resume(s) were ignored`
        );
      setOverallProgress(0);
      return [...prev, ...newItems];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      const uploaded = updated
        .filter((i) => i.status === "uploaded")
        .map((i) => ({
          resumeObjectId: i.resumeObjectId!,
          resumeUrl: i.resumeUrl!,
        }));
      const totalSize = updated
        .filter((i) => i.status === "uploaded")
        .reduce((sum, i) => sum + i.file.size, 0);
      onUploadComplete(uploaded, totalSize);
      return updated;
    });
  };

  const retryUpload = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "queued", progress: 0 } : item
      )
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              Upload Logic                                  */
  /* -------------------------------------------------------------------------- */

  const uploadSingle = async (item: UploadFileItem, config: any) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, status: "uploading", progress: 0 } : i
      )
    );
    try {
      const url = await uploadApi.uploadFileToCloudinary(
        item.file,
        config,
        (progress) => {
          setItems((prev) => {
            const updated = prev.map((i) =>
              i.id === item.id ? { ...i, progress } : i
            );
            const active = updated.filter(
              (i) => i.status === "uploading" || i.status === "queued"
            );
            const avg = active.length
              ? active.reduce((sum, i) => sum + i.progress, 0) / active.length
              : 100;
            setOverallProgress(Math.round(avg));
            return updated;
          });
        }
      );
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: "uploaded", progress: 100, resumeUrl: url }
            : i
        )
      );
      return {
        filename: item.file.name,
        size: item.file.size,
        format: item.file.type,
        url,
        folder: config.folder,
      };
    } catch {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: "failed", error: "Upload failed" }
            : i
        )
      );
      return null;
    }
  };

  const processQueue = async (queued: UploadFileItem[], presigned: any[]) => {
    const results: any[] = [];
    let currentIndex = 0;
    const worker = async () => {
      while (currentIndex < queued.length) {
        const index = currentIndex++;
        const result = await uploadSingle(queued[index], presigned[index]);
        if (result) results.push(result);
      }
    };
    await Promise.all(Array.from({ length: 4 }, () => worker()));
    return results;
  };

  const startUpload = async () => {
    const queued = items.filter((i) => i.status === "queued");
    if (!queued.length) return;
    setIsUploading(true);
    try {
      const presigned = await uploadApi.getPresignedUrls(
        queued.map((i) => i.file.name)
      );
      const uploadedMeta = await processQueue(queued, presigned);
      const savedResumes = await resumeApi.saveResumeMetaBatch(uploadedMeta);
      let resumeIndex = 0;
      setItems((prev) =>
        prev.map((item) => {
          if (item.status !== "uploaded" || item.resumeObjectId) return item;
          const result = savedResumes[resumeIndex++];
          if (!result) return item;
          return { ...item, resumeObjectId: result._id, resumeUrl: result.url };
        })
      );
      setOverallProgress(100);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              Render                                        */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <Dropzone onFilesSelected={handleFiles} />

      {/* Control panel — only shown once files are queued */}
      {items.length > 0 && (
        <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
          {/* Status bar */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              {allUploaded ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-state-success/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3 h-3 text-state-success"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.03 2.47a.75.75 0 010 1.06L4.5 9.06 1.97 6.53a.75.75 0 011.06-1.06L4.5 6.94l4.47-4.47a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-state-success">
                    All {uploadedCount} resume{uploadedCount !== 1 ? "s" : ""}{" "}
                    uploaded
                  </span>
                </>
              ) : (
                <>
                  {isUploading ? (
                    <svg
                      className="w-4 h-4 animate-spin text-action-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isUploading
                      ? `Uploading… ${uploadedCount} of ${totalFiles} done`
                      : `${remainingCount} file${remainingCount !== 1 ? "s" : ""} queued`}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {totalFiles} file{totalFiles !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Progress bar — hidden once all uploaded */}
          {!allUploaded && (
            <div className="px-4 py-3 space-y-1.5 border-b border-border">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Overall progress</span>
                <span className="tabular-nums">{overallProgress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-action-primary transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload button row — visible while queued files remain */}
          {hasQueued && (
            <div className="px-4 py-3 flex items-center gap-3">
              <button
                onClick={startUpload}
                disabled={isUploading}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-action-primary text-white text-sm font-semibold
                  ring-1 ring-inset ring-white/10
                  hover:bg-action-primary-hover hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                "
              >
                {isUploading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Uploading…
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 16 16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 2v8m0-8L5 5m3-3l3 3M2 11v1.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V11"
                      />
                    </svg>
                    Upload
                    {remainingCount > 0
                      ? ` ${remainingCount} File${remainingCount !== 1 ? "s" : ""}`
                      : ""}
                  </>
                )}
              </button>

              {!isUploading && uploadedCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  {uploadedCount} already uploaded
                </span>
              )}
            </div>
          )}

          {/* ====================== */}
          {/* Batch Action Footer    */}
          {/* — replaces the old     */}
          {/*   Start Processing btn */}
          {/* ====================== */}
          {allUploaded && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 border-t border-border">
              {/* Left: status summary */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-state-success/10 text-state-success flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {uploadedCount} resume{uploadedCount !== 1 ? "s" : ""} ready
                    to process
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                    Candidates will be automatically scored and ranked.
                  </p>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-3 shrink-0">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="
                      px-4 py-2 text-sm text-muted-foreground
                      border border-border rounded-lg
                      hover:text-foreground hover:border-foreground/30
                      transition-colors
                    "
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={onCreateBatch}
                  disabled={isCreatingBatch}
                  className="
                    flex items-center gap-2 px-5 py-2 rounded-lg
                    bg-action-primary text-white text-sm font-semibold
                    ring-1 ring-inset ring-white/10
                    hover:bg-action-primary-hover hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                  "
                >
                  {isCreatingBatch ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Starting…
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Start Processing
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* File list */}
      <UploadQueue items={items} onRetry={retryUpload} onRemove={removeItem} />
    </div>
  );
}
