import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MediaPicker } from "@/components/MediaPicker";
import { useSiteSettings, useUpdateSiteSettings } from "@/features/settings/useSiteSettings";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";

interface FormValues {
  wordmark_text: string;
  tagline: string;
  copyright_template: string;
  color_navy: string;
  color_white: string;
}

type ImageSlot = "logo_media_id" | "favicon_media_id";

export function SettingsManager() {
  const { data: settings, isLoading } = useSiteSettings();
  const update = useUpdateSiteSettings();
  const logActivity = useLogActivity();
  const { data: assets } = useMediaAssets();
  const [pickerSlot, setPickerSlot] = useState<ImageSlot | null>(null);
  const [logoId, setLogoId] = useState<string | null>(null);
  const [faviconId, setFaviconId] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState } = useForm<FormValues>();

  useEffect(() => {
    if (settings) {
      reset({
        wordmark_text: settings.wordmark_text ?? "",
        tagline: settings.tagline ?? "",
        copyright_template: settings.copyright_template,
        color_navy: settings.color_navy,
        color_white: settings.color_white,
      });
      setLogoId(settings.logo_media_id);
      setFaviconId(settings.favicon_media_id);
    }
  }, [settings, reset]);

  const logo = assets?.find((a) => a.id === logoId);
  const favicon = assets?.find((a) => a.id === faviconId);
  const colorNavy = watch("color_navy");
  const colorWhite = watch("color_white");

  async function onSubmit(values: FormValues) {
    await update.mutateAsync({ ...values, logo_media_id: logoId, favicon_media_id: faviconId });
    await logActivity({ action: "update", entityType: "site_settings", entityLabel: "Branding settings" });
    toast.success("Settings saved");
  }

  if (isLoading) return <p className="text-sm text-ink/40">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-line/70 bg-white p-6 shadow-[var(--shadow-soft)]"
      >
        <h2 className="mb-5 font-display text-xl text-ink">Branding &amp; settings</h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <Input label="Wordmark text" {...register("wordmark_text")} />
            <Input label="Tagline" {...register("tagline")} />
            <Textarea
              label="Copyright template"
              hint='Use "{year}" and it will be substituted with the current year.'
              rows={2}
              {...register("copyright_template")}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                  Navy color
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorNavy || "#1B1F6B"}
                    onChange={(e) => setValue("color_navy", e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-lg border border-line"
                  />
                  <Input {...register("color_navy")} className="flex-1" />
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                  White color
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorWhite || "#FFFFFF"}
                    onChange={(e) => setValue("color_white", e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-lg border border-line"
                  />
                  <Input {...register("color_white")} className="flex-1" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={formState.isSubmitting}>
                Save settings
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                Logo
              </span>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line/70 bg-surface-sunken p-4">
                {logo ? (
                  <img src={logo.public_url} alt="" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon size={24} className="text-ink/25" />
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => setPickerSlot("logo_media_id")}
              >
                {logo ? "Change" : "Choose"}
              </Button>
            </div>
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                Favicon
              </span>
              <div className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-xl border border-line/70 bg-surface-sunken p-2">
                {favicon ? (
                  <img src={favicon.public_url} alt="" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon size={16} className="text-ink/25" />
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => setPickerSlot("favicon_media_id")}
              >
                {favicon ? "Change" : "Choose"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <MediaPicker
        open={pickerSlot !== null}
        onClose={() => setPickerSlot(null)}
        onSelect={([asset]) => {
          if (!asset) return;
          if (pickerSlot === "logo_media_id") setLogoId(asset.id);
          if (pickerSlot === "favicon_media_id") setFaviconId(asset.id);
        }}
        title="Choose image"
      />
    </div>
  );
}
