import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { AboutPage } from "@/types/database";

export function useAboutPage() {
  return useQuery({
    queryKey: ["about_page"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_page").select("*").eq("id", true).single();
      if (error) throw error;
      return data as AboutPage;
    },
  });
}

export function useUpdateAboutPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<AboutPage>) => {
      const { data, error } = await supabase
        .from("about_page")
        .update(input)
        .eq("id", true)
        .select()
        .single();
      if (error) throw error;
      return data as AboutPage;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about_page"] }),
  });
}
