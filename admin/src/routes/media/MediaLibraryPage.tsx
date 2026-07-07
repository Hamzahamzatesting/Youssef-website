import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Film, Pencil, Repeat, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MediaUploadDropzone } from "@/routes/media/MediaUploadDropzone";
import { MediaCollectionsSidebar } from "@/routes/media/MediaCollectionsSidebar";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  useMediaAssets,
  useDeleteMediaAsset,
  useReplaceMediaAsset,
  useReorderMediaAssets,
} from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";
import { supabase } from "@/lib/supabaseClient";
import { formatBytes } from "@/lib/utils";
import type { MediaAsset } from "@/types/database";

function AssetCard({ asset }: { asset: MediaAsset }) {
  const deleteAsset = useDeleteMediaAsset();
  const replaceAsset = useReplaceMediaAsset();
  const logActivity = useLogActivity();
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState(asset.alt_text ?? "");
  const [editingAlt, setEditingAlt] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this file permanently?")) return;
    await deleteAsset.mutateAsync(asset);
    await logActivity({ action: "delete", entityType: "media_asset", entityLabel: asset.alt_text ?? asset.storage_path });
    toast.success("Deleted");
  }

  async function handleReplace(file: File | undefined) {
    if (!file) return;
    await replaceAsset.mutateAsync({ asset, file });
    await logActivity({ action: "update", entityType: "media_asset", entityId: asset.id, entityLabel: "replaced file" });
    toast.success("File replaced");
  }

  async function saveAlt() {
    await supabase.from("media_assets").update({ alt_text: altText }).eq("id", asset.id);
    setEditingAlt(false);
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="group relative overflow-hidden rounded-2xl border border-line/70 bg-white shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <div className="absolute left-2 top-2 z-10 rounded-lg bg-ink/50 p-1 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <DragHandle />
      </div>
      <div className="aspect-square overflow-hidden bg-surface-sunken">
        {asset.kind === "image" ? (
          <img
            src={asset.public_url}
            alt={asset.alt_text ?? ""}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-ink/30">
            <Film size={24} />
            <span className="text-[10px] uppercase tracking-wide">Video</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1.5 bg-gradient-to-t from-ink/70 to-transparent p-2.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => setEditingAlt(true)}
            className="rounded-lg bg-white/95 p-1.5 text-ink shadow-sm hover:bg-white"
            title="Edit alt text"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => replaceInputRef.current?.click()}
            className="rounded-lg bg-white/95 p-1.5 text-ink shadow-sm hover:bg-white"
            title="Replace file"
          >
            <Repeat size={13} />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-white/95 p-1.5 text-red-600 shadow-sm hover:bg-white"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleReplace(e.target.files?.[0])}
        />
      </div>
      <div className="px-3 py-2.5">
        {editingAlt ? (
          <input
            autoFocus
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            onBlur={saveAlt}
            onKeyDown={(e) => e.key === "Enter" && saveAlt()}
            placeholder="Alt text…"
            className="w-full rounded-md border border-line px-1.5 py-1 text-xs outline-none focus:border-navy"
          />
        ) : (
          <p className="truncate text-xs font-medium text-ink/60">{asset.alt_text || "No alt text"}</p>
        )}
        <p className="mt-0.5 text-[10px] text-ink/35">{formatBytes(asset.file_size_bytes)}</p>
      </div>
    </motion.div>
  );
}

export function MediaLibraryPage() {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const { data: assets, isLoading } = useMediaAssets(collectionId);
  const reorder = useReorderMediaAssets();

  return (
    <div className="flex gap-8">
      <MediaCollectionsSidebar activeId={collectionId} onSelect={setCollectionId} />
      <div className="min-w-0 flex-1 space-y-6">
        <MediaUploadDropzone collectionId={collectionId} />

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton aspect-square rounded-2xl" />
            ))}
          </div>
        )}
        {!isLoading && (assets?.length ?? 0) === 0 && (
          <p className="rounded-2xl border border-dashed border-line bg-white py-12 text-center text-sm text-ink/40">
            No media in this collection yet.
          </p>
        )}
        {assets && assets.length > 0 && (
          <SortableList
            items={assets}
            strategy="grid"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((a, i) => ({ id: a.id, sort_order: i })))
            }
            renderItem={(asset) => <AssetCard asset={asset} />}
          />
        )}
      </div>
    </div>
  );
}
