import { cn } from "@/lib/utils/cn";
import { cva } from "cva";

type Props = {
  className?: string;
};

export function LoadingSkeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse bg-zinc-300 dark:bg-zinc-700 rounded-full",
        className,
      )}
    />
  );
}
