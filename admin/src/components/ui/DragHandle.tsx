import { GripVertical } from "lucide-react";

export function DragHandle(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="flex cursor-grab touch-none items-center justify-center text-ink/30 hover:text-ink/60 active:cursor-grabbing"
    >
      <GripVertical size={16} />
    </div>
  );
}
