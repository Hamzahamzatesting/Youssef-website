import { useState } from "react";
import { ImageIcon, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { MediaPicker } from "@/components/MediaPicker";
import { useMosaicImages, useSetMosaicImages } from "@/features/homepage/useMosaicImages";

export function MosaicImagesEditor() {
  const { data: mosaic } = useMosaicImages();
  const setMosaic = useSetMosaicImages();
  const [pickerOpen, setPickerOpen] = useState(false);

  const currentIds = (mosaic ?? []).map((m) => m.media_id);

  async function remove(mediaId: string) {
    await setMosaic.mutateAsync(currentIds.filter((id) => id !== mediaId));
    toast.success("Removed from mosaic");
  }

  async function add(mediaIds: string[]) {
    const next = [...currentIds, ...mediaIds.filter((id) => !currentIds.includes(id))].slice(0, 3);
    await setMosaic.mutateAsync(next);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-ink">Hero image mosaic</h3>
        <Button size="sm" variant="secondary" onClick={() => setPickerOpen(true)} disabled={currentIds.length >= 3}>
          <Plus size={13} /> Add image
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((slot) => {
          const item = mosaic?.[slot];
          return (
            <div key={slot} className="group relative aspect-square overflow-hidden rounded-2xl border border-line/70 bg-surface-sunken shadow-[var(--shadow-soft)]">
              {item ? (
                <>
                  <img
                    src={item.media_assets.public_url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <button
                    onClick={() => remove(item.media_id)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-ink/60 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ink/25">
                  <ImageIcon size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(selected) => add(selected.map((s) => s.id))}
        multiple
        title="Add mosaic images (max 3)"
      />
    </div>
  );
}
