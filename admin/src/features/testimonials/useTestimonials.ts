import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Testimonial } from "@/types/database";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export type TestimonialInput = Omit<
  Testimonial,
  "id" | "created_at" | "updated_at" | "sort_order"
>;

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: TestimonialInput) => {
      const { data: existing } = await supabase
        .from("testimonials")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const nextOrder = (existing?.[0]?.sort_order ?? 0) + 1;
      const { data, error } = await supabase
        .from("testimonials")
        .insert({ ...input, sort_order: nextOrder })
        .select()
        .single();
      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; input: Partial<TestimonialInput> }) => {
      const { data, error } = await supabase
        .from("testimonials")
        .update(params.input)
        .eq("id", params.id)
        .select()
        .single();
      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useReorderTestimonials() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("testimonials").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}
