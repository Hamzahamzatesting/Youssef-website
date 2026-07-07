import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MessageCircle, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  useReorderTestimonials,
  type TestimonialInput,
} from "@/features/testimonials/useTestimonials";
import { useLogActivity } from "@/features/activity/useActivityLog";
import { cn } from "@/lib/utils";
import type { Testimonial, TestimonialPlatform } from "@/types/database";

interface FormValues {
  platform: TestimonialPlatform;
  author_name: string;
  flag_emoji: string;
  country: string;
  quote: string;
  context: string;
  likes_count: string;
  display_timestamp: string;
  is_published: boolean;
}

function TestimonialEditorModal({
  open,
  onClose,
  testimonial,
}: {
  open: boolean;
  onClose: () => void;
  testimonial?: Testimonial;
}) {
  const create = useCreateTestimonial();
  const update = useUpdateTestimonial();
  const logActivity = useLogActivity();
  const { register, handleSubmit, reset, watch, setValue, control, formState } = useForm<FormValues>();
  const platform = watch("platform");

  useEffect(() => {
    reset({
      platform: testimonial?.platform ?? "whatsapp",
      author_name: testimonial?.author_name ?? "",
      flag_emoji: testimonial?.flag_emoji ?? "",
      country: testimonial?.country ?? "",
      quote: testimonial?.quote ?? "",
      context: testimonial?.context ?? "",
      likes_count: testimonial?.likes_count?.toString() ?? "",
      display_timestamp: testimonial?.display_timestamp ?? "",
      is_published: testimonial?.is_published ?? true,
    });
  }, [testimonial, reset, open]);

  async function onSubmit(values: FormValues) {
    const input: TestimonialInput = {
      platform: values.platform,
      author_name: values.author_name || null,
      flag_emoji: values.flag_emoji || null,
      country: values.country || null,
      quote: values.quote,
      context: values.context || null,
      likes_count: values.likes_count ? Number(values.likes_count) : null,
      display_timestamp: values.display_timestamp || null,
      rating: null,
      avatar_media_id: null,
      is_published: values.is_published,
    };
    if (testimonial) {
      await update.mutateAsync({ id: testimonial.id, input });
      await logActivity({ action: "update", entityType: "testimonial", entityId: testimonial.id, entityLabel: values.quote.slice(0, 40) });
    } else {
      const created = await create.mutateAsync(input);
      await logActivity({ action: "create", entityType: "testimonial", entityId: created.id, entityLabel: values.quote.slice(0, 40) });
    }
    toast.success(testimonial ? "Testimonial updated" : "Testimonial added");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={testimonial ? "Edit testimonial" : "New testimonial"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="platform"
          render={({ field }) => (
            <Select label="Platform" {...field}>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
            </Select>
          )}
        />
        <Textarea label="Quote" rows={3} {...register("quote", { required: true })} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Flag emoji" placeholder="🇲🇦" {...register("flag_emoji")} />
          <Input label="Country" {...register("country")} />
        </div>
        {platform === "instagram" && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Username" placeholder="username (no @)" {...register("author_name")} />
            <Input label="Likes" type="number" {...register("likes_count")} />
          </div>
        )}
        {platform === "whatsapp" && (
          <Input label="Display timestamp" placeholder="19:08" {...register("display_timestamp")} />
        )}
        <Input label="Context / venue" {...register("context")} />
        <div className="rounded-xl border border-line/70 bg-surface-muted/40 px-4 py-3">
          <Toggle
            checked={watch("is_published")}
            onChange={(v) => setValue("is_published", v)}
            label="Published"
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={formState.isSubmitting}>
            {testimonial ? "Save changes" : "Add testimonial"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function TestimonialsPage() {
  const { data: testimonials, isLoading } = useTestimonials();
  const reorder = useReorderTestimonials();
  const deleteTestimonial = useDeleteTestimonial();
  const logActivity = useLogActivity();
  const [editing, setEditing] = useState<Testimonial | null | undefined>(undefined);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/45">Real client messages and comments — drag to reorder.</p>
        <Button onClick={() => setEditing(null)}>
          <Plus size={15} /> New testimonial
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      )}
      {!isLoading && (testimonials?.length ?? 0) === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-white py-12 text-center text-sm text-ink/40">
          No testimonials yet.
        </p>
      )}
      {testimonials && testimonials.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-line/70 shadow-[var(--shadow-soft)]">
          <SortableList
            items={testimonials}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((t, i) => ({ id: t.id, sort_order: i })))
            }
            renderItem={(testimonial) => (
              <div className="group flex items-start gap-4 border-b border-line/70 bg-white px-4 py-4 transition-colors last:border-b-0 hover:bg-surface-muted/50">
                <DragHandle className="mt-1" />
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white",
                    testimonial.platform === "whatsapp"
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                      : "bg-gradient-to-br from-fuchsia-500 to-orange-400"
                  )}
                >
                  {testimonial.platform === "whatsapp" ? (
                    <MessageCircle size={14} />
                  ) : (
                    <Star size={14} />
                  )}
                </div>
                <button onClick={() => setEditing(testimonial)} className="min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {testimonial.flag_emoji} {testimonial.country || testimonial.author_name}
                    </p>
                    {!testimonial.is_published && (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink/45">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-ink/45">{testimonial.quote}</p>
                </button>
                <button
                  onClick={async () => {
                    if (!window.confirm("Delete this testimonial?")) return;
                    await deleteTestimonial.mutateAsync(testimonial.id);
                    await logActivity({ action: "delete", entityType: "testimonial", entityLabel: testimonial.quote.slice(0, 40) });
                    toast.success("Testimonial deleted");
                  }}
                  className="shrink-0 rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            )}
          />
        </div>
      )}

      <TestimonialEditorModal
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        testimonial={editing ?? undefined}
      />
    </div>
  );
}
