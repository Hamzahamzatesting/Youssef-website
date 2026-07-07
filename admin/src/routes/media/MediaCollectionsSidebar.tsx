import { useState } from "react";
import { Plus, Folder, FolderOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useMediaCollections,
  useCreateMediaCollection,
  useDeleteMediaCollection,
} from "@/features/media/useMediaCollections";

export function MediaCollectionsSidebar({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { data: collections } = useMediaCollections();
  const createCollection = useCreateMediaCollection();
  const deleteCollection = useDeleteMediaCollection();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  async function handleCreate() {
    if (!name.trim()) return;
    await createCollection.mutateAsync(name.trim());
    setName("");
    setCreating(false);
  }

  return (
    <div className="w-56 shrink-0 space-y-1 rounded-2xl border border-line/70 bg-white p-3 shadow-[var(--shadow-soft)]">
      <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wide text-ink/35">
        Collections
      </p>
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          activeId === null ? "bg-navy text-white shadow-[0_6px_16px_-6px_rgba(27,31,107,0.5)]" : "text-ink/70 hover:bg-surface-muted"
        )}
      >
        {activeId === null ? <FolderOpen size={15} /> : <Folder size={15} />}
        All media
      </button>
      {collections?.map((c) => (
        <div key={c.id} className="group relative">
          <button
            onClick={() => onSelect(c.id)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              activeId === c.id ? "bg-navy text-white shadow-[0_6px_16px_-6px_rgba(27,31,107,0.5)]" : "text-ink/70 hover:bg-surface-muted"
            )}
          >
            {activeId === c.id ? <FolderOpen size={15} /> : <Folder size={15} />}
            <span className="truncate">{c.name}</span>
          </button>
          <button
            onClick={async () => {
              if (!window.confirm(`Delete collection "${c.name}"? Media stays, just ungrouped.`)) return;
              await deleteCollection.mutateAsync(c.id);
              if (activeId === c.id) onSelect(null);
              toast.success("Collection deleted");
            }}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 opacity-0 transition-opacity group-hover:opacity-100",
              activeId === c.id ? "text-white/70 hover:text-white" : "text-ink/30 hover:text-red-600"
            )}
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      {creating ? (
        <div className="px-1 pt-1">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") setCreating(false);
            }}
            onBlur={handleCreate}
            placeholder="Collection name"
            className="w-full rounded-xl border border-line px-2.5 py-2 text-sm outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
          />
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink/50 transition-colors hover:bg-surface-muted hover:text-navy"
        >
          <Plus size={15} /> New collection
        </button>
      )}
    </div>
  );
}
