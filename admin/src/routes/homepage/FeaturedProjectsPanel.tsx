import { Star } from "lucide-react";
import { usePortfolioProjects, useUpdatePortfolioProject } from "@/features/portfolio/usePortfolioProjects";
import { cn } from "@/lib/utils";

export function FeaturedProjectsPanel() {
  const { data: projects } = usePortfolioProjects();
  const update = useUpdatePortfolioProject();

  const featured = (projects ?? []).filter((p) => p.is_featured);
  const rest = (projects ?? []).filter((p) => !p.is_featured);

  return (
    <div>
      <h3 className="mb-1 font-display text-base text-ink">Featured on homepage</h3>
      <p className="mb-3 text-xs text-ink/45">
        Toggle projects here or from the Portfolio list — both control the same flag.
      </p>
      <div className="max-h-80 overflow-y-auto rounded-2xl border border-line/70">
        {[...featured, ...rest].map((project) => (
          <button
            key={project.id}
            onClick={() =>
              update.mutate({ id: project.id, input: { is_featured: !project.is_featured } })
            }
            className="flex w-full items-center gap-3 border-b border-line/70 bg-white px-4 py-2.5 text-left transition-colors last:border-b-0 hover:bg-surface-muted/60"
          >
            <Star
              size={15}
              className={cn(project.is_featured ? "text-amber-500" : "text-ink/20")}
              fill={project.is_featured ? "currentColor" : "none"}
            />
            <span className="truncate text-sm text-ink/80">{project.title}</span>
          </button>
        ))}
        {(projects?.length ?? 0) === 0 && (
          <p className="px-4 py-6 text-center text-sm text-ink/40">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
