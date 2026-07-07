import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { ContactInfo } from "@/types/database";

export function useContactInfo() {
  return useQuery({
    queryKey: ["contact_info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_info").select("*").eq("id", true).single();
      if (error) throw error;
      return data as ContactInfo;
    },
  });
}

export function useUpdateContactInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<ContactInfo>) => {
      const { data, error } = await supabase
        .from("contact_info")
        .update(input)
        .eq("id", true)
        .select()
        .single();
      if (error) throw error;
      return data as ContactInfo;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_info"] }),
  });
}
