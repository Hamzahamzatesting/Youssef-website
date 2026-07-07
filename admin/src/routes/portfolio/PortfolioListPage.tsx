import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Film, ImageIcon, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { SortableList } from "@/components/SortableList";
import { DragHandle } from "@/components/ui/DragHandle";
import {
  usePortfolioProjects,
  useReorderPortfolioProjects,
  useDeletePortfolioProject,
  useDuplicatePortfolioProject,
  useUpdatePortfolioProject,
} from "@/features/portfolio/usePortfolioProjects";
import { useLogActivity } from "@/features/activity/useActivityLog";
import { useMediaAssets } from "@/features/media/useMediaAssets";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types/database";

function ProjectRow({ project }: { project: PortfolioProject }) {
  const navigate = useNavigate();
  const updateProject = useUpdatePortfolioProject();
  const deleteProject = useDeletePortfolioProject();
  const duplicateProject = useDuplicatePortfolioProject();
  const logActivity = useLogActivity();
  const { data: assets } = useMediaAssets();
  const cover = assets?.find((a) => a.id === project.featured_media_id);

  return (
    <div className="group flex items-center gap-4 border-b border-line/70 bg-white px-4 py-3.5 transition-colors last:border-b-0 hover:bg-surface-muted/50">
      <DragHandle />
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface-sunken shadow-inner">
        {cover ? (
          <img src={cover.public_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink/25">
            {project.media_type === "reel" ? <Film size={16} /> : <ImageIcon size={16} />}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate(`/portfolio/${project.id}`)}
        className="min-w-0 flex-1 text-left"
      >
        <p className="truncate text-sm font-semibold text-ink">{project.title}</p>
        <p className="truncate text-xs text-ink/45">
          {project.category} · @{project.account === "youssef" ? "youssef_tayibi" : "prodyous.ma"}
        </p>
      </button>
      <button
        onClick={() =>
          updateProject.mutate({ id: project.id, input: { is_featured: !project.is_featured } })
        }
        className={cn(
          "shrink-0 transition-colors",
          project.is_featured ? "text-amber-500" : "text-ink/15 hover:text-ink/40"
        )}
        title="Feature on homepage"
      >
        <Star size={16} fill={project.is_featured ? "currentColor" : "none"} />
      </button>
      <Toggle
        checked={project.is_published}
        onChange={(v) => updateProject.mutate({ id: project.id, input: { is_published: v } })}
      />
      <button
        onClick={async () => {
          const copy = await duplicateProject.mutateAsync(project);
          await logActivity({ action: "create", entityType: "portfolio_project", entityId: copy.id, entityLabel: copy.title });
          toast.success("Project duplicated");
        }}
        className="shrink-0 rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-navy/10 hover:text-navy"
        title="Duplicate"
      >
        <Copy size={15} />
      </button>
      <button
        onClick={async () => {
          if (!window.confirm(`Delete "${project.title}"?`)) return;
          await deleteProject.mutateAsync(project.id);
          await logActivity({ action: "delete", entityType: "portfolio_project", entityLabel: project.title });
          toast.success("Project deleted");
        }}
        className="shrink-0 rounded-lg p-1.5 text-ink/35 transition-colors hover:bg-red-50 hover:text-red-600"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export function PortfolioListPage() {
  const { data: projects, isLoading } = usePortfolioProjects();
  const reorder = useReorderPortfolioProjects();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "youssef" | "prodyous">("all");

  const filtered = (projects ?? []).filter((p) => filter === "all" || p.account === filter);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-xl bg-surface-sunken p-1">
          {(["all", "youssef", "prodyous"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors",
                filter === f ? "bg-white text-navy shadow-[var(--shadow-soft)]" : "text-ink/50 hover:text-ink"
              )}
            >
              {f === "all" ? "All" : f === "youssef" ? "@youssef_tayibi" : "@prodyous.ma"}
            </button>
          ))}
        </div>
        <Button onClick={() => navigate("/portfolio/new")}>
          <Plus size={15} /> New project
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-[70px] rounded-2xl" />
          ))}
        </div>
      )}
      {!isLoading && filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-white py-12 text-center text-sm text-ink/40">
          No projects yet.
        </p>
      )}
      {filtered.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-line/70 shadow-[var(--shadow-soft)]">
          <SortableList
            items={filtered}
            onReorder={(reordered) =>
              reorder.mutate(reordered.map((p, i) => ({ id: p.id, sort_order: i })))
            }
            renderItem={(project) => <ProjectRow project={project} />}
          />
        </div>
      )}
    </div>
  );
}
