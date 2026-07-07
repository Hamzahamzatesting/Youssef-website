import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/utils";
import type { SeoPage } from "@/types/database";

export function useSeoPages() {
  return useQuery({
    queryKey: ["seo_pages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("seo_pages").select("*").order("page_key");
      if (error) throw error;
      return data as SeoPage[];
    },
  });
}

export function useCreateSeoPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pageKey: string) => {
      const { data, error } = await supabase
        .from("seo_pages")
        .insert({ page_key: slugify(pageKey) })
        .select()
        .single();
      if (error) throw error;
      return data as SeoPage;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seo_pages"] }),
  });
}

export function useUpdateSeoPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<SeoPage> }) => {
      const { data, error } = await supabase
        .from("seo_pages")
        .update(params.input)
        .eq("id", params.id)
        .select()
        .single();
      if (error) throw error;
      return data as SeoPage;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seo_pages"] }),
  });
}

export function useDeleteSeoPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("seo_pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seo_pages"] }),
  });
}
