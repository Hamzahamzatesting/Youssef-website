import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Tag } from "@/types/database";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tags").select("*").order("name");
      if (error) throw error;
      return data as Tag[];
    },
  });
}

export function useProjectTags(projectId?: string) {
  return useQuery({
    queryKey: ["portfolio_project_tags", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_project_tags")
        .select("tag_id, tags(id, name)")
        .eq("project_id", projectId);
      if (error) throw error;
      return (data ?? []).map((row) => (row as unknown as { tags: Tag }).tags);
    },
    enabled: Boolean(projectId),
  });
}

export function useSetProjectTags() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { projectId: string; tagNames: string[] }) => {
      const { projectId, tagNames } = params;
      const tagIds: string[] = [];

      for (const rawName of tagNames) {
        const name = rawName.trim();
        if (!name) continue;
        const { data: existing } = await supabase
          .from("tags")
          .select("id")
          .eq("name", name)
          .maybeSingle();
        if (existing) {
          tagIds.push(existing.id);
        } else {
          const { data: created, error } = await supabase
            .from("tags")
            .insert({ name })
            .select("id")
            .single();
          if (error) throw error;
          tagIds.push(created.id);
        }
      }

      await supabase.from("portfolio_project_tags").delete().eq("project_id", projectId);
      if (tagIds.length) {
        await supabase
          .from("portfolio_project_tags")
          .insert(tagIds.map((tagId) => ({ project_id: projectId, tag_id: tagId })));
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_project_tags", variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
