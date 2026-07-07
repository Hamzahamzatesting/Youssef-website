import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { AboutHighlight } from "@/types/database";

export function useAboutHighlights() {
  return useQuery({
    queryKey: ["about_highlights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_highlights")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as AboutHighlight[];
    },
  });
}

export function useCreateAboutHighlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { label: string; count: string; sort_order: number }) => {
      const { error } = await supabase.from("about_highlights").insert(input);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about_highlights"] }),
  });
}

export function useUpdateAboutHighlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<AboutHighlight> }) => {
      const { error } = await supabase
        .from("about_highlights")
        .update(params.input)
        .eq("id", params.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about_highlights"] }),
  });
}

export function useDeleteAboutHighlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("about_highlights").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about_highlights"] }),
  });
}

export function useReorderAboutHighlights() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("about_highlights").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about_highlights"] }),
  });
}
