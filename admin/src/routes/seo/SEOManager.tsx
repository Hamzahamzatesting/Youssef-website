import { useState } from "react";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { MediaPicker } from "@/components/MediaPicker";
import {
  useSeoPages,
  useCreateSeoPage,
  useUpdateSeoPage,
  useDeleteSeoPage,
} from "@/features/seo/useSeoPages";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";
import type { SeoPage } from "@/types/database";

function SeoPageCard({ page, onPickImage }: { page: SeoPage; onPickImage: () => void }) {
  const update = useUpdateSeoPage();
  const remove = useDeleteSeoPage();
  const logActivity = useLogActivity();
  const { data: assets } = useMediaAssets();
  const [metaTitle, setMetaTitle] = useState(page.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(page.meta_description ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(page.canonical_url ?? "");

  const ogImage = assets?.find((a) => a.id === page.og_image_media_id);

  async function save(field: keyof SeoPage, value: string) {
    await update.mutateAsync({ id: page.id, input: { [field]: value } });
    await logActivity({ action: "update", entityType: "seo_page", entityId: page.id, entityLabel: page.page_key });
  }

  return (
    <div className="rounded-2xl border border-line/70 bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          {page.page_key}
        </span>
        <button
          onClick={async () => {
            if (!window.confirm(`Remove SEO entry for "${page.page_key}"?`)) return;
            await remove.mutateAsync(page.id);
            toast.success("Removed");
          }}
          className="rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-3">
          <Input
            label="Meta title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            onBlur={() => metaTitle !== page.meta_title && save("meta_title", metaTitle)}
          />
          <Textarea
            label="Meta description"
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            onBlur={() => metaDescription !== page.meta_description && save("meta_description", metaDescription)}
          />
          <Input
            label="Canonical URL"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            onBlur={() => canonicalUrl !== page.canonical_url && save("canonical_url", canonicalUrl)}
          />
        </div>
        <div>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
            OG image
          </span>
          <div className="aspect-video overflow-hidden rounded-xl border border-line/70 bg-surface-sunken">
            {ogImage ? (
              <img src={ogImage.public_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink/25">
                <ImageIcon size={20} />
              </div>
            )}
          </div>
          <Button type="button" variant="secondary" size="sm" className="mt-2" onClick={onPickImage}>
            {ogImage ? "Change" : "Choose"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SEOManager() {
  const { data: pages, isLoading } = useSeoPages();
  const create = useCreateSeoPage();
  const update = useUpdateSeoPage();
  const [newKey, setNewKey] = useState("");
  const [pickerForPageId, setPickerForPageId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-2">
        <Input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="page key, e.g. blog"
          className="max-w-[220px]"
        />
        <Button
          variant="secondary"
          onClick={async () => {
            if (!newKey.trim()) return;
            await create.mutateAsync(newKey.trim());
            setNewKey("");
            toast.success("Page added");
          }}
        >
          <Plus size={15} /> Add page
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-40 rounded-2xl" />
          ))}
        </div>
      )}
      {!isLoading && (pages?.length ?? 0) === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-white py-12 text-center text-sm text-ink/40">
          No SEO entries yet — add one for each page (home, work, services, about, contact).
        </p>
      )}
      <div className="space-y-4">
        {pages?.map((page) => (
          <SeoPageCard key={page.id} page={page} onPickImage={() => setPickerForPageId(page.id)} />
        ))}
      </div>

      <MediaPicker
        open={pickerForPageId !== null}
        onClose={() => setPickerForPageId(null)}
        onSelect={([asset]) => {
          if (asset && pickerForPageId) {
            update.mutate({ id: pickerForPageId, input: { og_image_media_id: asset.id } });
          }
        }}
        title="Choose OG image"
      />
    </div>
  );
}
