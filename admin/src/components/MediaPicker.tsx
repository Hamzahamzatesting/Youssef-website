import { useState } from "react";
import { Check, Film, Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types/database";

export function MediaPicker({
  open,
  onClose,
  onSelect,
  multiple = false,
  title = "Select media",
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (assets: MediaAsset[]) => void;
  multiple?: boolean;
  title?: string;
}) {
  const { data: assets, isLoading } = useMediaAssets();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MediaAsset[]>([]);

  const filtered = (assets ?? []).filter((a) =>
    (a.alt_text ?? a.storage_path).toLowerCase().includes(search.toLowerCase())
  );

  function toggle(asset: MediaAsset) {
    if (multiple) {
      setSelected((prev) =>
        prev.some((a) => a.id === asset.id) ? prev.filter((a) => a.id !== asset.id) : [...prev, asset]
      );
    } else {
      onSelect([asset]);
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={title} width="760px">
      <div className="mb-4">
        <Input
          placeholder="Search media…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading && <p className="py-10 text-center text-sm text-ink/40">Loading media…</p>}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <Search size={22} className="text-ink/25" />
          <p className="text-sm text-ink/40">
            No media yet. Upload files from the Media Library first.
          </p>
        </div>
      )}
      <div className="grid max-h-[420px] grid-cols-4 gap-3 overflow-y-auto pr-1">
        {filtered.map((asset) => {
          const isSelected = selected.some((a) => a.id === asset.id);
          return (
            <button
              key={asset.id}
              onClick={() => toggle(asset)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-xl border-2 bg-surface-sunken transition-all",
                isSelected
                  ? "border-navy shadow-[0_6px_16px_-6px_rgba(27,31,107,0.4)]"
                  : "border-transparent hover:border-line hover:shadow-[var(--shadow-soft)]"
              )}
            >
              {asset.kind === "image" ? (
                <img
                  src={asset.public_url}
                  alt={asset.alt_text ?? ""}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ink/30">
                  <Film size={22} />
                </div>
              )}
              {isSelected && (
                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white shadow-sm">
                  <Check size={12} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {multiple && (
        <div className="mt-5 flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSelect(selected);
              onClose();
            }}
            disabled={selected.length === 0}
          >
            Use {selected.length || ""} selected
          </Button>
        </div>
      )}
    </Modal>
  );
}
