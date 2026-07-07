import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { HomeMosaicImage, MediaAsset } from "@/types/database";

export interface MosaicImageWithAsset extends HomeMosaicImage {
  media_assets: MediaAsset;
}

export function useMosaicImages() {
  return useQuery({
    queryKey: ["home_mosaic_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_mosaic_images")
        .select("*, media_assets(*)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as unknown as MosaicImageWithAsset[];
    },
  });
}

export function useSetMosaicImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (mediaIds: string[]) => {
      const { data: existing } = await supabase.from("home_mosaic_images").select("id");
      if (existing?.length) {
        await supabase
          .from("home_mosaic_images")
          .delete()
          .in(
            "id",
            existing.map((row) => row.id)
          );
      }
      if (mediaIds.length) {
        await supabase.from("home_mosaic_images").insert(
          mediaIds.map((media_id, index) => ({ media_id, sort_order: index }))
        );
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home_mosaic_images"] }),
  });
}
