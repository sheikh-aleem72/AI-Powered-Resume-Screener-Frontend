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
}

export default function ResumeUploader({
  onUploadComplete,
  onCreateBatch,
}: Props) {
  const [items, setItems] = useState<UploadFileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  /* -------------------------------------------------------------------------- */
  /*                             Add Files (Dropzone)                           */
  /* -------------------------------------------------------------------------- */

  const uploadedItems = items.filter((i) => i.status === "uploaded");
  const totalFiles = items.length;
  const uploadedCount = items.filter((i) => i.status === "uploaded").length;
  const remainingCount = totalFiles - uploadedCount;
  const allUploaded = totalFiles > 0 && remainingCount === 0;

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

  const handleFiles = (files: File[]) => {
    setItems((prev) => {
      const existingKeys = new Set(
        prev.map((i) => `${i.file.name}-${i.file.size}`)
      );

      const newItems: UploadFileItem[] = files
        .filter((file) => {
          const key = `${file.name}-${file.size}`;
          return !existingKeys.has(key);
        }) // duplicate protection
        .map((file) => ({
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: "queued",
        }));

      const ignored = files.length - newItems.length;

      if (ignored > 0) {
        alert(`${ignored} duplicate resume(s) were ignored`);
      }

      setOverallProgress(0);

      return [...prev, ...newItems];
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                             Remove File                                    */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                             Retry Upload                                   */
  /* -------------------------------------------------------------------------- */

  const retryUpload = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "queued", progress: 0 } : item
      )
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                             Upload Files                                   */
  /* -------------------------------------------------------------------------- */

  const startUpload = async () => {
    const queued = items.filter((i) => i.status === "queued");

    if (!queued.length) return;

    setIsUploading(true);

    try {
      /* --------------------------- request signatures -------------------------- */

      const fileNames = queued.map((i) => i.file.name);
      const presigned = await uploadApi.getPresignedUrls(fileNames);

      const uploadedMeta = [];

      /* ----------------------------- upload files ------------------------------ */

      for (let index = 0; index < queued.length; index++) {
        const item = queued[index];
        const config = presigned[index];

        /* mark uploading */

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

                const total = active.reduce((sum, i) => sum + i.progress, 0);
                const avg = active.length ? total / active.length : 100;

                setOverallProgress(Math.round(avg));

                return updated;
              });
            }
          );

          uploadedMeta.push({
            filename: item.file.name,
            size: item.file.size,
            format: item.file.type,
            url,
            folder: config.folder,
          });
        } catch (err) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, status: "failed", error: "Upload failed" }
                : i
            )
          );
        }
      }

      /* --------------------------- save metadata batch ------------------------- */

      const savedResumes = await resumeApi.saveResumeMetaBatch(uploadedMeta);

      const resumes = savedResumes.map((r) => ({
        resumeObjectId: r._id,
        resumeUrl: r.url,
      }));

      /* ----------------------------- update items ------------------------------ */

      let resumeIndex = 0;

      setItems((prev) =>
        prev.map((item) => {
          if (item.status !== "uploading") return item;

          const result = resumes[resumeIndex++];

          if (!result) return item;

          return {
            ...item,
            status: "uploaded",
            progress: 100,
            resumeUrl: result.resumeUrl,
            resumeObjectId: result.resumeObjectId,
          };
        })
      );

      setOverallProgress(100);

      /* ----------------------------- total size -------------------------------- */

      // const totalSize = queued.reduce((sum, i) => sum + i.file.size, 0);

      // onUploadComplete(resumes, totalSize);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      console.log("Is Uploading: ", isUploading);
    }
  };

  return (
    <div className="space-y-4">
      <Dropzone onFilesSelected={handleFiles} />

      {/* Upload control panel */}

      {items.length > 0 && (
        <div className="border rounded p-4 space-y-3">
          {/* Status message */}

          {allUploaded ? (
            <div className="text-green-600 font-medium">
              All {uploadedCount} resumes uploaded
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              {remainingCount} resume(s) remaining
            </div>
          )}

          {/* Progress bar */}

          {!allUploaded && (
            <div className="h-2 bg-gray-200 rounded relative">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${overallProgress}%` }}
              />
              <div className="text-sm text-gray-500 absolute right-1 top-3">
                {overallProgress}% uploaded
              </div>
            </div>
          )}

          {/* Buttons */}

          <div className="flex gap-3">
            {!allUploaded && (
              <button
                onClick={startUpload}
                disabled={isUploading}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {isUploading ? "Uploading..." : "Upload Resumes"}
              </button>
            )}

            {uploadedItems.length > 0 && (
              <button
                onClick={onCreateBatch}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Create Processing Batch
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload list */}

      <UploadQueue items={items} onRetry={retryUpload} onRemove={removeItem} />
    </div>
  );
}
