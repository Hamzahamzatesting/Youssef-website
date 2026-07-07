import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, KeyRound, ChevronDown } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export function Topbar({ title }: { title: string }) {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-line/70 bg-white/80 px-8 backdrop-blur-md">
      <h1 className="font-display text-2xl text-ink">{title}</h1>
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 text-sm text-ink/70 transition-colors hover:bg-surface-muted"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-soft text-xs font-semibold text-white shadow-[0_4px_10px_-2px_rgba(27,31,107,0.5)]">
            {user?.email?.[0]?.toUpperCase() ?? "A"}
          </span>
          <span className="max-w-[160px] truncate font-medium">{user?.email}</span>
          <ChevronDown size={14} className={menuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-10 w-56 rounded-2xl border border-line bg-white py-1.5 shadow-[0_20px_50px_-12px_rgba(18,20,43,0.25)]"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={async () => {
                  const newPassword = window.prompt("Enter a new password (min 6 characters):");
                  if (!newPassword) return;
                  const { error } = await supabase.auth.updateUser({ password: newPassword });
                  if (error) toast.error(error.message);
                  else toast.success("Password updated");
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink/70 transition-colors hover:bg-surface-muted"
              >
                <KeyRound size={15} /> Change password
              </button>
              <button
                onClick={() => signOut()}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={15} /> Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
