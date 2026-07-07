import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapProps {
  label?: string;
  hint?: string;
  error?: string;
}

const fieldBase =
  "w-full rounded-xl border border-line bg-surface-muted/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-150 focus:border-navy/40 focus:bg-white focus:ring-4 focus:ring-navy/10";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FieldWrapProps
>(({ label, hint, error, className, id, ...props }, ref) => (
  <label className="block">
    {label && (
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
        {label}
      </span>
    )}
    <input ref={ref} id={id} className={cn(fieldBase, error && "border-red-400", className)} {...props} />
    {hint && !error && <span className="mt-1.5 block text-xs text-ink/40">{hint}</span>}
    {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
  </label>
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapProps
>(({ label, hint, error, className, id, ...props }, ref) => (
  <label className="block">
    {label && (
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/45">
        {label}
      </span>
    )}
    <textarea
      ref={ref}
      id={id}
      className={cn(fieldBase, "resize-y leading-relaxed", error && "border-red-400", className)}
      {...props}
    />
    {hint && !error && <span className="mt-1.5 block text-xs text-ink/40">{hint}</span>}
    {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
  </label>
));
Textarea.displayName = "Textarea";
