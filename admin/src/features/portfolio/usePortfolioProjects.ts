import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/utils";
import type { PortfolioProject } from "@/types/database";

export function usePortfolioProjects() {
  return useQuery({
    queryKey: ["portfolio_projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as PortfolioProject[];
    },
  });
}

export function usePortfolioProject(id?: string) {
  return useQuery({
    queryKey: ["portfolio_projects", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as PortfolioProject;
    },
    enabled: Boolean(id),
  });
}

export type PortfolioProjectInput = Omit<
  PortfolioProject,
  "id" | "slug" | "created_at" | "updated_at" | "sort_order"
> & { slug?: string };

export function useCreatePortfolioProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PortfolioProjectInput) => {
      const { data: existing } = await supabase
        .from("portfolio_projects")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const nextOrder = (existing?.[0]?.sort_order ?? 0) + 1;

      const { data, error } = await supabase
        .from("portfolio_projects")
        .insert({ ...input, slug: input.slug || slugify(input.title), sort_order: nextOrder })
        .select()
        .single();
      if (error) throw error;
      return data as PortfolioProject;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolio_projects"] }),
  });
}

export function useUpdatePortfolioProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<PortfolioProjectInput> }) => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .update(params.input)
        .eq("id", params.id)
        .select()
        .single();
      if (error) throw error;
      return data as PortfolioProject;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolio_projects"] }),
  });
}

export function useDeletePortfolioProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolio_projects"] }),
  });
}

export function useDuplicatePortfolioProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: PortfolioProject) => {
      const { data: existing } = await supabase
        .from("portfolio_projects")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const nextOrder = (existing?.[0]?.sort_order ?? 0) + 1;

      const baseSlug = `${project.slug}-copy`;
      let slug = baseSlug;
      let suffix = 2;
      // ensure uniqueness in the (unlikely) event of repeated duplication
      for (;;) {
        const { data: clash } = await supabase
          .from("portfolio_projects")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();
        if (!clash) break;
        slug = `${baseSlug}-${suffix++}`;
      }

      const { data, error } = await supabase
        .from("portfolio_projects")
        .insert({
          title: `${project.title} (Copy)`,
          slug,
          caption: project.caption,
          category: project.category,
          service_id: project.service_id,
          account: project.account,
          media_type: project.media_type,
          instagram_url: project.instagram_url,
          featured_media_id: project.featured_media_id,
          is_featured: false,
          is_published: false,
          sort_order: nextOrder,
        })
        .select()
        .single();
      if (error) throw error;
      return data as PortfolioProject;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolio_projects"] }),
  });
}

export function useReorderPortfolioProjects() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("portfolio_projects").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolio_projects"] }),
  });
}
