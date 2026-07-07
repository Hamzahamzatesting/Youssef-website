import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { HomeHero } from "@/types/database";

export function useHomeHero() {
  return useQuery({
    queryKey: ["home_hero"],
    queryFn: async () => {
      const { data, error } = await supabase.from("home_hero").select("*").eq("id", true).single();
      if (error) throw error;
      return data as HomeHero;
    },
  });
}

export function useUpdateHomeHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<HomeHero>) => {
      const { data, error } = await supabase
        .from("home_hero")
        .update(input)
        .eq("id", true)
        .select()
        .single();
      if (error) throw error;
      return data as HomeHero;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_hero"] }),
  });
}
