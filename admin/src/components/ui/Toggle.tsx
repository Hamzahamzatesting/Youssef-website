import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-navy" : "bg-ink/12"
        )}
      >
        <motion.span
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(18,20,43,0.25)]"
        />
      </button>
      {label && <span className="text-sm text-ink/75">{label}</span>}
    </label>
  );
}
