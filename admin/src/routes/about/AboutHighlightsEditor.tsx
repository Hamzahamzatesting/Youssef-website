import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  useAboutHighlights,
  useCreateAboutHighlight,
  useUpdateAboutHighlight,
  useDeleteAboutHighlight,
  useReorderAboutHighlights,
} from "@/features/about/useAboutHighlights";
import type { AboutHighlight } from "@/types/database";

function HighlightRow({ highlight }: { highlight: AboutHighlight }) {
  const update = useUpdateAboutHighlight();
  const remove = useDeleteAboutHighlight();
  const [label, setLabel] = useState(highlight.label);
  const [count, setCount] = useState(highlight.count);

  return (
    <div className="flex items-center gap-3 border-b border-line/70 bg-white px-3 py-2.5 transition-colors last:border-b-0 hover:bg-surface-muted/50">
      <DragHandle />
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => label !== highlight.label && update.mutate({ id: highlight.id, input: { label } })}
        className="flex-1 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="Graduation 🧑‍🎓"
      />
      <input
        value={count}
        onChange={(e) => setCount(e.target.value)}
        onBlur={() => count !== highlight.count && update.mutate({ id: highlight.id, input: { count } })}
        className="w-28 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm font-semibold text-navy outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="100+"
      />
      <button
        onClick={async () => {
          await remove.mutateAsync(highlight.id);
          toast.success("Removed");
        }}
        className="rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export function AboutHighlightsEditor() {
  const { data: highlights } = useAboutHighlights();
  const create = useCreateAboutHighlight();
  const reorder = useReorderAboutHighlights();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-ink">Specialties / highlights</h3>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => create.mutate({ label: "", count: "", sort_order: highlights?.length ?? 0 })}
        >
          <Plus size={13} /> Add
        </Button>
      </div>
      {highlights && highlights.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line/70">
          <SortableList
            items={highlights}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((h, i) => ({ id: h.id, sort_order: i })))
            }
            renderItem={(highlight) => <HighlightRow highlight={highlight} />}
          />
        </div>
      )}
    </div>
  );
}
