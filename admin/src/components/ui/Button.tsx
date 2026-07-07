import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_10px_24px_-10px_rgba(27,31,107,0.55)] hover:bg-navy-soft hover:shadow-[0_14px_30px_-10px_rgba(27,31,107,0.6)]",
  secondary:
    "bg-white text-navy border border-line shadow-[var(--shadow-soft)] hover:border-navy/25 hover:shadow-[var(--shadow-lift)]",
  ghost: "bg-transparent text-navy/70 hover:bg-navy/[0.06] hover:text-navy",
  danger: "bg-red-600 text-white shadow-[0_10px_24px_-10px_rgba(220,38,38,0.5)] hover:bg-red-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-3.5 py-2 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition-[background-color,box-shadow,border-color,color] duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
