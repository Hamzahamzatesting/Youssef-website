import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { MediaPicker } from "@/components/MediaPicker";
import {
  useCreatePortfolioProject,
  useUpdatePortfolioProject,
} from "@/features/portfolio/usePortfolioProjects";
import { useProjectTags, useSetProjectTags } from "@/features/portfolio/useTags";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { useLogActivity } from "@/features/activity/useActivityLog";
import type { PortfolioProject } from "@/types/database";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  caption: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  account: z.enum(["youssef", "prodyous"]),
  media_type: z.enum(["reel", "photo"]),
  instagram_url: z.string().optional(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function PortfolioEditorForm({ project }: { project?: PortfolioProject }) {
  const navigate = useNavigate();
  const createProject = useCreatePortfolioProject();
  const updateProject = useUpdatePortfolioProject();
  const logActivity = useLogActivity();
  const { data: existingTags } = useProjectTags(project?.id);
  const setTags = useSetProjectTags();
  const { data: assets } = useMediaAssets();

  const [featuredMediaId, setFeaturedMediaId] = useState<string | null>(
    project?.featured_media_id ?? null
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project?.title ?? "",
      caption: project?.caption ?? "",
      category: project?.category ?? "",
      account: project?.account ?? "youssef",
      media_type: project?.media_type ?? "photo",
      instagram_url: project?.instagram_url ?? "",
      is_featured: project?.is_featured ?? false,
      is_published: project?.is_published ?? true,
    },
  });

  useEffect(() => {
    if (existingTags) setTagsInput(existingTags.map((t) => t.name).join(", "));
  }, [existingTags]);

  const cover = assets?.find((a) => a.id === featuredMediaId);

  async function onSubmit(values: FormValues) {
    const input = { ...values, featured_media_id: featuredMediaId };
    let id = project?.id;
    if (project) {
      await updateProject.mutateAsync({ id: project.id, input });
      await logActivity({ action: "update", entityType: "portfolio_project", entityId: project.id, entityLabel: values.title });
    } else {
      const created = await createProject.mutateAsync(input as never);
      id = created.id;
      await logActivity({ action: "create", entityType: "portfolio_project", entityId: id, entityLabel: values.title });
    }
    if (id) {
      const tagNames = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await setTags.mutateAsync({ projectId: id, tagNames });
    }
    toast.success(project ? "Project updated" : "Project created");
    navigate("/portfolio");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        <Input label="Title" {...register("title")} error={errors.title?.message} />
        <Textarea label="Caption" rows={3} {...register("caption")} />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Category"
            placeholder="e.g. Wedding Film"
            {...register("category")}
            error={errors.category?.message}
          />
          <Controller
            control={control}
            name="account"
            render={({ field }) => (
              <Select label="Account" {...field}>
                <option value="youssef">@youssef_tayibi</option>
                <option value="prodyous">@prodyous.ma</option>
              </Select>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="media_type"
            render={({ field }) => (
              <Select label="Media type" {...field}>
                <option value="photo">Photo</option>
                <option value="reel">Reel / Video</option>
              </Select>
            )}
          />
          <Input label="Instagram URL (reels only)" {...register("instagram_url")} />
        </div>
        <Input
          label="Tags"
          placeholder="wedding, morocco, cinematic (comma separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />

        <div className="flex items-center gap-8 rounded-2xl border border-line/70 bg-white px-5 py-4 shadow-[var(--shadow-soft)]">
          <Controller
            control={control}
            name="is_published"
            render={({ field }) => (
              <Toggle checked={field.value} onChange={field.onChange} label="Published" />
            )}
          />
          <Controller
            control={control}
            name="is_featured"
            render={({ field }) => (
              <Toggle checked={field.value} onChange={field.onChange} label="Featured on homepage" />
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate("/portfolio")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {project ? "Save changes" : "Create project"}
          </Button>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
          Cover image
        </span>
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line/70 bg-surface-sunken shadow-[var(--shadow-soft)]">
          {cover ? (
            <img src={cover.public_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink/25">
              <ImageIcon size={28} />
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => setPickerOpen(true)}>
            {cover ? "Change" : "Choose"} cover
          </Button>
          {cover && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setFeaturedMediaId(null)}>
              <Trash2 size={13} /> Remove
            </Button>
          )}
        </div>
      </div>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={([asset]) => asset && setFeaturedMediaId(asset.id)}
        title="Choose cover image"
      />
    </form>
  );
}
