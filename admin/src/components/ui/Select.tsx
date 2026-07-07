import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, children, ...props }, ref) => (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
          {label}
        </span>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none rounded-xl border border-line bg-surface-muted/60 px-3.5 py-2.5 pr-9 text-sm text-ink outline-none transition-all duration-150 focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/35"
        />
      </div>
    </label>
  )
);
Select.displayName = "Select";
