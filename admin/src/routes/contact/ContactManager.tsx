import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import { useContactInfo, useUpdateContactInfo } from "@/features/contact/useContactInfo";
import {
  useContactHandles,
  useCreateContactHandle,
  useUpdateContactHandle,
  useDeleteContactHandle,
  useReorderContactHandles,
} from "@/features/contact/useContactHandles";
import {
  useSocialLinks,
  useCreateSocialLink,
  useUpdateSocialLink,
  useDeleteSocialLink,
  useReorderSocialLinks,
} from "@/features/contact/useSocialLinks";
import { useLogActivity } from "@/features/activity/useActivityLog";
import type { ContactInstagramHandle, SocialLink } from "@/types/database";

interface FormValues {
  eyebrow: string;
  heading: string;
  location: string;
  email: string;
  phone: string;
  hours: string;
}

function ContactInfoForm() {
  const { data: contact, isLoading } = useContactInfo();
  const update = useUpdateContactInfo();
  const logActivity = useLogActivity();
  const { register, handleSubmit, reset, formState } = useForm<FormValues>();

  useEffect(() => {
    if (contact) {
      reset({
        eyebrow: contact.eyebrow ?? "",
        heading: contact.heading ?? "",
        location: contact.location ?? "",
        email: contact.email,
        phone: contact.phone ?? "",
        hours: contact.hours ?? "",
      });
    }
  }, [contact, reset]);

  async function onSubmit(values: FormValues) {
    await update.mutateAsync(values);
    await logActivity({ action: "update", entityType: "contact_info", entityLabel: "Contact info" });
    toast.success("Contact info updated");
  }

  if (isLoading) return <p className="text-sm text-ink/40">Loading…</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Eyebrow" {...register("eyebrow")} />
      <Textarea label="Heading" rows={2} {...register("heading")} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Location" {...register("location")} />
        <Input label="Email" type="email" {...register("email", { required: true })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Phone (optional)" {...register("phone")} />
        <Input label="Business hours (optional)" {...register("hours")} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={formState.isSubmitting}>
          Save contact info
        </Button>
      </div>
    </form>
  );
}

function HandleRow({ handle }: { handle: ContactInstagramHandle }) {
  const update = useUpdateContactHandle();
  const remove = useDeleteContactHandle();
  const [value, setValue] = useState(handle.handle);
  const [description, setDescription] = useState(handle.description ?? "");

  return (
    <div className="flex items-center gap-3 border-b border-line/70 bg-white px-3 py-2.5 transition-colors last:border-b-0 hover:bg-surface-muted/50">
      <DragHandle />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => value !== handle.handle && update.mutate({ id: handle.id, input: { handle: value } })}
        className="w-40 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="@youssef_tayibi"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={() =>
          description !== handle.description && update.mutate({ id: handle.id, input: { description } })
        }
        className="flex-1 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="Personal"
      />
      <button
        onClick={() => remove.mutate(handle.id)}
        className="rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function ContactHandlesEditor() {
  const { data: handles } = useContactHandles();
  const create = useCreateContactHandle();
  const reorder = useReorderContactHandles();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-ink">Instagram handles</h3>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => create.mutate({ handle: "", description: "", sort_order: handles?.length ?? 0 })}
        >
          <Plus size={13} /> Add
        </Button>
      </div>
      {handles && handles.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line/70">
          <SortableList
            items={handles}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((h, i) => ({ id: h.id, sort_order: i })))
            }
            renderItem={(handle) => <HandleRow handle={handle} />}
          />
        </div>
      )}
    </div>
  );
}

function SocialLinkRow({ link }: { link: SocialLink }) {
  const update = useUpdateSocialLink();
  const remove = useDeleteSocialLink();
  const [label, setLabel] = useState(link.label);
  const [href, setHref] = useState(link.href);

  return (
    <div className="flex items-center gap-3 border-b border-line/70 bg-white px-3 py-2.5 transition-colors last:border-b-0 hover:bg-surface-muted/50">
      <DragHandle />
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => label !== link.label && update.mutate({ id: link.id, input: { label } })}
        className="w-48 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="Instagram — Youssef"
      />
      <input
        value={href}
        onChange={(e) => setHref(e.target.value)}
        onBlur={() => href !== link.href && update.mutate({ id: link.id, input: { href } })}
        className="flex-1 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="https://instagram.com/…"
      />
      <button
        onClick={() => remove.mutate(link.id)}
        className="rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function SocialLinksEditor() {
  const { data: links } = useSocialLinks();
  const create = useCreateSocialLink();
  const reorder = useReorderSocialLinks();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-ink">Social links (Footer)</h3>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => create.mutate({ label: "", href: "", sort_order: links?.length ?? 0 })}
        >
          <Plus size={13} /> Add
        </Button>
      </div>
      {links && links.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line/70">
          <SortableList
            items={links}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((l, i) => ({ id: l.id, sort_order: i })))
            }
            renderItem={(link) => <SocialLinkRow link={link} />}
          />
        </div>
      )}
    </div>
  );
}

const sections = [
  { title: "Contact info", content: <ContactInfoForm /> },
  { title: null, content: <ContactHandlesEditor /> },
  { title: null, content: <SocialLinksEditor /> },
];

export function ContactManager() {
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
