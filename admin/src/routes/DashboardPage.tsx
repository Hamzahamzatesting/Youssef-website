import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Image, GalleryHorizontalEnd, CheckCircle2, HardDrive, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/features/auth/useAuth";
import { useActivityLog } from "@/features/activity/useActivityLog";
import { formatBytes, formatRelativeTime } from "@/lib/utils";

function useDashboardCounts() {
  return useQuery({
    queryKey: ["dashboard_counts"],
    queryFn: async () => {
      const [projects, published, media, assetsForSize] = await Promise.all([
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase
          .from("portfolio_projects")
          .select("id", { count: "exact", head: true })
          .eq("is_published", true),
        supabase.from("media_assets").select("id", { count: "exact", head: true }),
        supabase.from("media_assets").select("file_size_bytes"),
      ]);
      const storageBytes = (assetsForSize.data ?? []).reduce(
        (sum, row) => sum + (row.file_size_bytes ?? 0),
        0
      );
      return {
        totalProjects: projects.count ?? 0,
        publishedProjects: published.count ?? 0,
        totalMedia: media.count ?? 0,
        storageBytes,
      };
    },
  });
}

const cards = [
  {
    key: "totalProjects" as const,
    label: "Portfolio Projects",
    icon: GalleryHorizontalEnd,
    tint: "from-navy to-navy-soft",
  },
  {
    key: "publishedProjects" as const,
    label: "Published",
    icon: CheckCircle2,
    tint: "from-emerald-500 to-emerald-400",
  },
  { key: "totalMedia" as const, label: "Media Assets", icon: Image, tint: "from-navy-soft to-navy" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function DashboardPage() {
  const { user } = useAuth();
  const { data: counts, isLoading } = useDashboardCounts();
  const { data: activity, isLoading: activityLoading } = useActivityLog(12);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="flex items-center gap-1.5 text-sm text-ink/45">
          <Sparkles size={14} className="text-accent" />
          {greeting()}
          {user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </p>
        <h2 className="font-display text-3xl text-ink">Here's how your site is doing.</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-line/70 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.tint} text-white shadow-[0_8px_16px_-6px_rgba(27,31,107,0.4)]`}
            >
              <card.icon size={17} />
            </div>
            {isLoading ? (
              <div className="skeleton h-8 w-16 rounded-lg" />
            ) : (
              <p className="font-display text-3xl text-ink">{counts?.[card.key] ?? 0}</p>
            )}
            <p className="mt-1.5 text-xs font-medium text-ink/45">{card.label}</p>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.35, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-line/70 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-accent text-white shadow-[0_8px_16px_-6px_rgba(255,180,67,0.5)]">
            <HardDrive size={17} />
          </div>
          {isLoading ? (
            <div className="skeleton h-8 w-20 rounded-lg" />
          ) : (
            <p className="font-display text-3xl text-ink">{formatBytes(counts?.storageBytes ?? 0)}</p>
          )}
          <p className="mt-1.5 text-xs font-medium text-ink/45">Storage Used</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="rounded-2xl border border-line/70 bg-white shadow-[var(--shadow-soft)]"
      >
        <div className="border-b border-line/70 px-6 py-4.5">
          <h2 className="font-display text-lg text-ink">Recent activity</h2>
        </div>
        <div className="divide-y divide-line/70">
          {activityLoading && (
            <div className="space-y-3 px-6 py-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="skeleton h-4 w-2/3 rounded" />
              ))}
            </div>
          )}
          {!activityLoading && activity?.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-ink/40">
              No activity yet — changes you make across Media, Portfolio, and Homepage will show up
              here.
            </p>
          )}
          {activity?.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
              className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-surface-muted/60"
            >
              <div className="text-sm text-ink/80">
                <span className="font-semibold capitalize text-ink">{entry.action}</span>{" "}
                <span className="text-ink/50">{entry.entity_type.replace(/_/g, " ")}</span>
                {entry.entity_label && <span className="text-ink/50"> — {entry.entity_label}</span>}
              </div>
              <span className="shrink-0 text-xs text-ink/35">{formatRelativeTime(entry.created_at)}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
