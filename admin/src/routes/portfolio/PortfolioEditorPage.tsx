import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { usePortfolioProject } from "@/features/portfolio/usePortfolioProjects";
import { PortfolioEditorForm } from "@/routes/portfolio/PortfolioEditorForm";

export function PortfolioEditorPage() {
  const { id } = useParams();
  const { data: project, isLoading } = usePortfolioProject(id);

  if (id && isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-navy" size={22} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 font-display text-lg text-ink">
        {project ? `Edit “${project.title}”` : "New project"}
      </h2>
      <PortfolioEditorForm project={project} />
    </div>
  );
}
