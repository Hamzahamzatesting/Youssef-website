import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { HomeHeroStat } from "@/types/database";

export function useHeroStats() {
  return useQuery({
    queryKey: ["home_hero_stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_hero_stats")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as HomeHeroStat[];
    },
  });
}

export function useCreateHeroStat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { value: string; label: string; sort_order: number }) => {
      const { error } = await supabase.from("home_hero_stats").insert(input);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_hero_stats"] }),
  });
}

export function useUpdateHeroStat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<HomeHeroStat> }) => {
      const { error } = await supabase
        .from("home_hero_stats")
        .update(params.input)
        .eq("id", params.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_hero_stats"] }),
  });
}

export function useDeleteHeroStat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("home_hero_stats").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_hero_stats"] }),
  });
}

export function useReorderHeroStats() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("home_hero_stats").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_hero_stats"] }),
  });
}
