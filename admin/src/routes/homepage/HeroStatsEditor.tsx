import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  useHeroStats,
  useCreateHeroStat,
  useUpdateHeroStat,
  useDeleteHeroStat,
  useReorderHeroStats,
} from "@/features/homepage/useHeroStats";
import type { HomeHeroStat } from "@/types/database";

function StatRow({ stat }: { stat: HomeHeroStat }) {
  const update = useUpdateHeroStat();
  const remove = useDeleteHeroStat();
  const [value, setValue] = useState(stat.value);
  const [label, setLabel] = useState(stat.label);

  return (
    <div className="flex items-center gap-3 border-b border-line/70 bg-white px-3 py-2.5 transition-colors last:border-b-0 hover:bg-surface-muted/50">
      <DragHandle />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => value !== stat.value && update.mutate({ id: stat.id, input: { value } })}
        className="w-24 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm font-semibold text-navy outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="+200"
      />
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => label !== stat.label && update.mutate({ id: stat.id, input: { label } })}
        className="flex-1 rounded-lg border border-line bg-surface-muted/60 px-2.5 py-1.5 text-sm outline-none transition-all focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10"
        placeholder="Clients"
      />
      <button
        onClick={async () => {
          await remove.mutateAsync(stat.id);
          toast.success("Removed");
        }}
        className="rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export function HeroStatsEditor() {
  const { data: stats } = useHeroStats();
  const create = useCreateHeroStat();
  const reorder = useReorderHeroStats();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-ink">Hero stats row</h3>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            create.mutate({ value: "", label: "", sort_order: stats?.length ?? 0 })
          }
        >
          <Plus size={13} /> Add stat
        </Button>
      </div>
      {stats && stats.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line/70">
          <SortableList
            items={stats}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((s, i) => ({ id: s.id, sort_order: i })))
            }
            renderItem={(stat) => <StatRow stat={stat} />}
          />
        </div>
      )}
    </div>
  );
}
