import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MediaPicker } from "@/components/MediaPicker";
import { useHomeHero, useUpdateHomeHero } from "@/features/homepage/useHomeHero";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";

interface FormValues {
  headline: string;
  subtext: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  profile_badge_text: string;
  agency_tag_text: string;
}

export function HeroForm() {
  const { data: hero, isLoading } = useHomeHero();
  const updateHero = useUpdateHomeHero();
  const logActivity = useLogActivity();
  const { data: assets } = useMediaAssets();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [backgroundMediaId, setBackgroundMediaId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<FormValues>();

  useEffect(() => {
    if (hero) {
      reset({
        headline: hero.headline,
        subtext: hero.subtext,
        cta_primary_label: hero.cta_primary_label ?? "",
        cta_primary_href: hero.cta_primary_href ?? "",
        cta_secondary_label: hero.cta_secondary_label ?? "",
        cta_secondary_href: hero.cta_secondary_href ?? "",
        profile_badge_text: hero.profile_badge_text ?? "",
        agency_tag_text: hero.agency_tag_text ?? "",
      });
      setBackgroundMediaId(hero.background_media_id);
    }
  }, [hero, reset]);

  const background = assets?.find((a) => a.id === backgroundMediaId);

  async function onSubmit(values: FormValues) {
    await updateHero.mutateAsync({ ...values, background_media_id: backgroundMediaId });
    await logActivity({ action: "update", entityType: "home_hero", entityLabel: "Hero section" });
    toast.success("Hero updated");
  }

  if (isLoading) return <p className="text-sm text-ink/40">Loading…</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        <Textarea
          label="Headline"
          hint="Use a new line for each line break, matching the hero's stacked layout."
          rows={3}
          {...register("headline")}
        />
        <Textarea label="Subtext" rows={3} {...register("subtext")} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Primary CTA label" {...register("cta_primary_label")} />
          <Input label="Primary CTA link" {...register("cta_primary_href")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Secondary CTA label" {...register("cta_secondary_label")} />
          <Input label="Secondary CTA link" {...register("cta_secondary_href")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Profile badge text" {...register("profile_badge_text")} />
          <Input label="Agency tag text" {...register("agency_tag_text")} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
            Save hero
          </Button>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
          Background media
        </span>
        <div className="aspect-video overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-br from-navy to-navy-dark shadow-[var(--shadow-soft)]">
          {background ? (
            <img src={background.public_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/30">
              <ImageIcon size={26} />
            </div>
          )}
        </div>
        <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => setPickerOpen(true)}>
          {background ? "Change" : "Choose"} background
        </Button>
      </div>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={([asset]) => asset && setBackgroundMediaId(asset.id)}
        title="Choose hero background"
      />
    </form>
  );
}
