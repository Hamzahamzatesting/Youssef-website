import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export type ActivityAction = "create" | "update" | "delete" | "reorder" | "publish" | "unpublish" | "upload";

export function useActivityLog(limit = 10) {
  return useQuery({
    queryKey: ["activity_log", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    },
  });
}

export function useLogActivity() {
  const queryClient = useQueryClient();
  return async (params: {
    action: ActivityAction;
    entityType: string;
    entityId?: string;
    entityLabel?: string;
  }) => {
    const { data: userData } = await supabase.auth.getUser();
    await supabase.from("activity_log").insert({
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId ?? null,
      entity_label: params.entityLabel ?? null,
      actor_id: userData.user?.id ?? null,
    });
    queryClient.invalidateQueries({ queryKey: ["activity_log"] });
  };
}
