import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useReorderServices,
  type ServiceInput,
} from "@/features/services/useServices";
import { useLogActivity } from "@/features/activity/useActivityLog";
import type { Service } from "@/types/database";

interface FormValues {
  title: string;
  description: string;
  highlight: string;
  is_published: boolean;
  is_offered_in_contact_form: boolean;
}

function ServiceEditorModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service?: Service;
}) {
  const create = useCreateService();
  const update = useUpdateService();
  const logActivity = useLogActivity();
  const { register, handleSubmit, reset, watch, setValue, formState } = useForm<FormValues>();

  useEffect(() => {
    reset({
      title: service?.title ?? "",
      description: service?.description ?? "",
      highlight: service?.highlight ?? "",
      is_published: service?.is_published ?? true,
      is_offered_in_contact_form: service?.is_offered_in_contact_form ?? true,
    });
  }, [service, reset, open]);

  async function onSubmit(values: FormValues) {
    if (service) {
      await update.mutateAsync({ id: service.id, input: values });
      await logActivity({ action: "update", entityType: "service", entityId: service.id, entityLabel: values.title });
    } else {
      const created = await create.mutateAsync(values as ServiceInput);
      await logActivity({ action: "create", entityType: "service", entityId: created.id, entityLabel: values.title });
    }
    toast.success(service ? "Service updated" : "Service created");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={service ? "Edit service" : "New service"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register("title", { required: true })} />
        <Textarea label="Description" rows={3} {...register("description", { required: true })} />
        <Input label="Highlight / stat line" {...register("highlight")} />
        <div className="flex items-center gap-8 rounded-xl border border-line/70 bg-surface-muted/40 px-4 py-3">
          <Toggle
            checked={watch("is_published")}
            onChange={(v) => setValue("is_published", v)}
            label="Published"
          />
          <Toggle
            checked={watch("is_offered_in_contact_form")}
            onChange={(v) => setValue("is_offered_in_contact_form", v)}
            label="Show in contact form"
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={formState.isSubmitting}>
            {service ? "Save changes" : "Create service"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const reorder = useReorderServices();
  const deleteService = useDeleteService();
  const logActivity = useLogActivity();
  const [editing, setEditing] = useState<Service | null | undefined>(undefined);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/45">Drag to reorder. These power the Services section and the contact form's service list.</p>
        <Button onClick={() => setEditing(null)}>
          <Plus size={15} /> New service
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      )}
      {!isLoading && (services?.length ?? 0) === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-white py-12 text-center text-sm text-ink/40">
          No services yet.
        </p>
      )}
      {services && services.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-line/70 shadow-[var(--shadow-soft)]">
          <SortableList
            items={services}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((s, i) => ({ id: s.id, sort_order: i })))
            }
            renderItem={(service) => (
              <div className="group flex items-start gap-4 border-b border-line/70 bg-white px-4 py-4 transition-colors last:border-b-0 hover:bg-surface-muted/50">
                <DragHandle className="mt-1" />
                <button onClick={() => setEditing(service)} className="min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{service.title}</p>
                    {!service.is_published && (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink/45">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink/45">{service.description}</p>
                </button>
                <button
                  onClick={async () => {
                    if (!window.confirm(`Delete "${service.title}"?`)) return;
                    await deleteService.mutateAsync(service.id);
                    await logActivity({ action: "delete", entityType: "service", entityLabel: service.title });
                    toast.success("Service deleted");
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

      <ServiceEditorModal
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        service={editing ?? undefined}
      />
    </div>
  );
}
