import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { SiteSettings } from "@/types/database";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", true).single();
      if (error) throw error;
      return data as SiteSettings;
    },
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<SiteSettings>) => {
      const { data, error } = await supabase
        .from("site_settings")
        .update(input)
        .eq("id", true)
        .select()
        .single();
      if (error) throw error;
      return data as SiteSettings;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site_settings"] }),
  });
}
