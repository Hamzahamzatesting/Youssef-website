import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { compressIfNeeded, readImageDimensions, readVideoMetadata } from "@/lib/imageCompression";
import type { MediaAsset } from "@/types/database";

const BUCKET = "media";

export function useMediaAssets(collectionId?: string | null) {
  return useQuery({
    queryKey: ["media_assets", collectionId ?? "all"],
    queryFn: async () => {
      let query = supabase.from("media_assets").select("*").order("sort_order", { ascending: true });
      if (collectionId) query = query.eq("collection_id", collectionId);
      const { data, error } = await query;
      if (error) throw error;
      return data as MediaAsset[];
    },
  });
}

export interface UploadProgress {
  fileName: string;
  status: "compressing" | "uploading" | "done" | "error";
  error?: string;
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      files: File[];
      collectionId?: string | null;
      onProgress?: (p: UploadProgress) => void;
    }) => {
      const { files, collectionId, onProgress } = params;
      const uploaded: MediaAsset[] = [];

      for (const originalFile of files) {
        const isVideo = originalFile.type.startsWith("video/");
        try {
          onProgress?.({ fileName: originalFile.name, status: "compressing" });

          let width: number | null = null;
          let height: number | null = null;
          let duration: number | null = null;
          let fileToUpload = originalFile;

          if (isVideo) {
            const meta = await readVideoMetadata(originalFile);
            width = meta.width;
            height = meta.height;
            duration = meta.duration;
          } else {
            fileToUpload = await compressIfNeeded(originalFile);
            const dims = await readImageDimensions(fileToUpload);
            width = dims.width;
            height = dims.height;
          }

          onProgress?.({ fileName: originalFile.name, status: "uploading" });

          const folder = isVideo ? "videos" : "images";
          const path = `${folder}/${crypto.randomUUID()}-${fileToUpload.name}`;
          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(path, fileToUpload, { contentType: fileToUpload.type });
          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

          const { data: row, error: insertError } = await supabase
            .from("media_assets")
            .insert({
              collection_id: collectionId ?? null,
              storage_path: path,
              storage_bucket: BUCKET,
              public_url: publicUrlData.publicUrl,
              kind: isVideo ? "video" : "image",
              mime_type: fileToUpload.type,
              width,
              height,
              duration_seconds: duration,
              file_size_bytes: fileToUpload.size,
              original_file_size_bytes: originalFile.size,
            })
            .select()
            .single();
          if (insertError) throw insertError;

          uploaded.push(row as MediaAsset);
          onProgress?.({ fileName: originalFile.name, status: "done" });
        } catch (err) {
          onProgress?.({
            fileName: originalFile.name,
            status: "error",
            error: err instanceof Error ? err.message : "Upload failed",
          });
        }
      }

      return uploaded;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media_assets"] });
    },
  });
}

export function useDeleteMediaAsset() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (asset: MediaAsset) => {
      await supabase.storage.from(BUCKET).remove([asset.storage_path]);
      const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media_assets"] }),
  });
}

export function useReplaceMediaAsset() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { asset: MediaAsset; file: File }) => {
      const { asset, file } = params;
      const isVideo = file.type.startsWith("video/");
      const fileToUpload = isVideo ? file : await compressIfNeeded(file);
      const dims = isVideo
        ? await readVideoMetadata(fileToUpload)
        : await readImageDimensions(fileToUpload);

      await supabase.storage.from(BUCKET).remove([asset.storage_path]);
      const folder = isVideo ? "videos" : "images";
      const path = `${folder}/${crypto.randomUUID()}-${fileToUpload.name}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, fileToUpload, { contentType: fileToUpload.type });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

      const { error } = await supabase
        .from("media_assets")
        .update({
          storage_path: path,
          public_url: publicUrlData.publicUrl,
          kind: isVideo ? "video" : "image",
          mime_type: fileToUpload.type,
          width: dims.width,
          height: dims.height,
          duration_seconds: "duration" in dims ? dims.duration : null,
          file_size_bytes: fileToUpload.size,
          original_file_size_bytes: file.size,
        })
        .eq("id", asset.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media_assets"] }),
  });
}

export function useReorderMediaAssets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sort_order: number }[]) => {
      await Promise.all(
        items.map((item) =>
          supabase.from("media_assets").update({ sort_order: item.sort_order }).eq("id", item.id)
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media_assets"] }),
  });
}
