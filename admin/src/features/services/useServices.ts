import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/utils";
import type { Service } from "@/types/database";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Service[];
    },
  });
}

export type ServiceInput = Omit<Service, "id" | "slug" | "created_at" | "updated_at" | "sort_order"> & {
  slug?: string;
};

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ServiceInput) => {
      const { data: existing } = await supabase
        .from("services")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const nextOrder = (existing?.[0]?.sort_order ?? 0) + 1;
      const { data, error } = await supabase
        .from("services")
        .insert({ ...input, slug: input.slug || slugify(input.title), sort_order: nextOrder })
        .select()
        .single();
      if (error) throw error;
      return data as Service;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<ServiceInput> }) => {
      const { data, error } = await supabase
        .from("services")
        .update(params.input)
        .eq("id", params.id)
        .select()
        .single();
      if (error) throw error;
      return data as Service;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useReorderServices() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("services").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}
