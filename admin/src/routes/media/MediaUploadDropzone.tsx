import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useUploadMedia, type UploadProgress } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";

export function MediaUploadDropzone({ collectionId }: { collectionId: string | null }) {
  const [dragOver, setDragOver] = useState(false);
  const [progressList, setProgressList] = useState<UploadProgress[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadMedia();
  const logActivity = useLogActivity();

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setProgressList(files.map((f) => ({ fileName: f.name, status: "compressing" as const })));

    const uploaded = await upload.mutateAsync({
      files,
      collectionId,
      onProgress: (p) =>
        setProgressList((prev) => {
          const next = [...prev];
          const idx = next.findIndex((x) => x.fileName === p.fileName);
          if (idx >= 0) next[idx] = p;
          return next;
        }),
    });

    for (const asset of uploaded) {
      await logActivity({ action: "upload", entityType: "media_asset", entityId: asset.id, entityLabel: asset.storage_path.split("/").pop() });
    }
    const failed = files.length - uploaded.length;
    if (uploaded.length) toast.success(`Uploaded ${uploaded.length} file${uploaded.length > 1 ? "s" : ""}`);
    if (failed > 0) toast.error(`${failed} file${failed > 1 ? "s" : ""} failed to upload`);
    setTimeout(() => setProgressList([]), 1500);
  }

  return (
    <div>
      <div
        onDragOver={(e: DragEvent) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e: DragEvent) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200",
          dragOver
            ? "scale-[1.01] border-navy bg-navy/[0.04] shadow-[var(--shadow-lift)]"
            : "border-line bg-white shadow-[var(--shadow-soft)] hover:border-navy/30 hover:shadow-[var(--shadow-lift)]"
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-soft text-white shadow-[0_8px_16px_-6px_rgba(27,31,107,0.4)]">
          <UploadCloud size={19} />
        </div>
        <p className="text-sm font-semibold text-ink">Drag & drop photos or videos here</p>
        <p className="text-xs text-ink/40">or click to browse — bulk upload supported</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {progressList.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {progressList.map((p) => (
            <div
              key={p.fileName}
              className="flex items-center justify-between rounded-lg bg-white px-3.5 py-2 text-xs"
            >
              <span className="truncate text-ink/70">{p.fileName}</span>
              <span
                className={cn(
                  "flex items-center gap-1.5",
                  p.status === "error" ? "text-red-600" : "text-ink/40"
                )}
              >
                {(p.status === "compressing" || p.status === "uploading") && (
                  <Loader2 size={12} className="animate-spin" />
                )}
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
