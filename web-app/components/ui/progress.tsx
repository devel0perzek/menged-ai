// components/ui/progress.tsx
import { cn } from "@/lib/cn";

interface ProgressProps {
  value: number; // 0–100
}

export function Progress({ value }: ProgressProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
      <div
        style={{ width: `${value}%` }}
        className={cn("h-full bg-neutral-800 transition-all duration-300")}
      />
    </div>
  );
}
