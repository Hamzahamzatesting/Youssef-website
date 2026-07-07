import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MediaPicker } from "@/components/MediaPicker";
import { useAboutPage, useUpdateAboutPage } from "@/features/about/useAboutPage";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";
import { AboutHighlightsEditor } from "@/routes/about/AboutHighlightsEditor";

interface FormValues {
  eyebrow: string;
  heading: string;
  bio_paragraph_1: string;
  bio_paragraph_2: string;
  location_badge_line_1: string;
  location_badge_line_2: string;
  cta_1_label: string;
  cta_1_href: string;
  cta_2_label: string;
  cta_2_href: string;
}

type ImageSlot = "main_image_media_id" | "profile_photo_media_id";

function AboutForm() {
  const { data: about, isLoading } = useAboutPage();
  const update = useUpdateAboutPage();
  const logActivity = useLogActivity();
  const { data: assets } = useMediaAssets();
  const [pickerSlot, setPickerSlot] = useState<ImageSlot | null>(null);
  const [mainImageId, setMainImageId] = useState<string | null>(null);
  const [profilePhotoId, setProfilePhotoId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<FormValues>();

  useEffect(() => {
    if (about) {
      reset({
        eyebrow: about.eyebrow ?? "",
        heading: about.heading,
        bio_paragraph_1: about.bio_paragraph_1 ?? "",
        bio_paragraph_2: about.bio_paragraph_2 ?? "",
        location_badge_line_1: about.location_badge_line_1 ?? "",
        location_badge_line_2: about.location_badge_line_2 ?? "",
        cta_1_label: about.cta_1_label ?? "",
        cta_1_href: about.cta_1_href ?? "",
        cta_2_label: about.cta_2_label ?? "",
        cta_2_href: about.cta_2_href ?? "",
      });
      setMainImageId(about.main_image_media_id);
      setProfilePhotoId(about.profile_photo_media_id);
    }
  }, [about, reset]);

  const mainImage = assets?.find((a) => a.id === mainImageId);
  const profilePhoto = assets?.find((a) => a.id === profilePhotoId);

  async function onSubmit(values: FormValues) {
    await update.mutateAsync({
      ...values,
      main_image_media_id: mainImageId,
      profile_photo_media_id: profilePhotoId,
    });
    await logActivity({ action: "update", entityType: "about_page", entityLabel: "About page" });
    toast.success("About page updated");
  }

  if (isLoading) return <p className="text-sm text-ink/40">Loading…</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        <Input label="Eyebrow" {...register("eyebrow")} />
        <Textarea
          label="Heading"
          hint="Use a new line for each line break."
          rows={3}
          {...register("heading")}
        />
        <Textarea label="Bio — paragraph 1" rows={3} {...register("bio_paragraph_1")} />
        <Textarea label="Bio — paragraph 2" rows={3} {...register("bio_paragraph_2")} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Location badge — line 1" {...register("location_badge_line_1")} />
          <Input label="Location badge — line 2" {...register("location_badge_line_2")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="CTA 1 label" {...register("cta_1_label")} />
          <Input label="CTA 1 link" {...register("cta_1_href")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="CTA 2 label" {...register("cta_2_label")} />
          <Input label="CTA 2 link" {...register("cta_2_href")} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
            Save about page
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
            Main image
          </span>
          <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-line/70 bg-surface-sunken shadow-[var(--shadow-soft)]">
            {mainImage ? (
              <img src={mainImage.public_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink/25">
                <ImageIcon size={26} />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => setPickerSlot("main_image_media_id")}
          >
            {mainImage ? "Change" : "Choose"} image
          </Button>
        </div>

        <div>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
            Profile photo
          </span>
          <div className="aspect-square w-24 overflow-hidden rounded-full border-4 border-white bg-surface-sunken shadow-[var(--shadow-soft)]">
            {profilePhoto ? (
              <img src={profilePhoto.public_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink/25">
                <ImageIcon size={20} />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => setPickerSlot("profile_photo_media_id")}
          >
            {profilePhoto ? "Change" : "Choose"} photo
          </Button>
        </div>
      </div>

      <MediaPicker
        open={pickerSlot !== null}
        onClose={() => setPickerSlot(null)}
        onSelect={([asset]) => {
          if (!asset) return;
          if (pickerSlot === "main_image_media_id") setMainImageId(asset.id);
          if (pickerSlot === "profile_photo_media_id") setProfilePhotoId(asset.id);
        }}
        title="Choose image"
      />
    </form>
  );
}

const sections = [
  { title: "About page", content: <AboutForm /> },
  { title: null, content: <AboutHighlightsEditor /> },
];

export function AboutPageManager() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {sections.map((s, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-line/70 bg-white p-6 shadow-[var(--shadow-soft)]"
        >
          {s.title && <h2 className="mb-5 font-display text-xl text-ink">{s.title}</h2>}
          {s.content}
        </motion.section>
      ))}
    </div>
  );
}
