import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/utils";
import type { MediaCollection } from "@/types/database";

export function useMediaCollections() {
  return useQuery({
    queryKey: ["media_collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_collections")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as MediaCollection[];
    },
  });
}

export function useCreateMediaCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("media_collections")
        .insert({ name, slug: slugify(name) })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media_collections"] }),
  });
}

export function useDeleteMediaCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("media_collections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media_collections"] });
      queryClient.invalidateQueries({ queryKey: ["media_assets"] });
    },
  });
}
