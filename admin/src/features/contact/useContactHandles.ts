import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { ContactInstagramHandle } from "@/types/database";

export function useContactHandles() {
  return useQuery({
    queryKey: ["contact_instagram_handles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_instagram_handles")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ContactInstagramHandle[];
    },
  });
}

export function useCreateContactHandle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { handle: string; description: string; sort_order: number }) => {
      const { error } = await supabase.from("contact_instagram_handles").insert(input);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_instagram_handles"] }),
  });
}

export function useUpdateContactHandle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<ContactInstagramHandle> }) => {
      const { error } = await supabase
        .from("contact_instagram_handles")
        .update(params.input)
        .eq("id", params.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_instagram_handles"] }),
  });
}

export function useDeleteContactHandle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_instagram_handles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_instagram_handles"] }),
  });
}

export function useReorderContactHandles() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase
            .from("contact_instagram_handles")
            .update({ sort_order: item.sort_order })
            .eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_instagram_handles"] }),
  });
}
