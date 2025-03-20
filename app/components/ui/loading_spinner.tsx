import { cn } from "@/lib/utils/cn";
import { LoaderCircle } from "lucide-react";

export function LoadingSpinner(props: { className?: string }) {
  return (
    <LoaderCircle
      className={cn(
        "animate-spin text-zinc-700",
        props.className,
      )}
      strokeWidth={2}
      shapeRendering={"geometricPrecision"}
    />
  );
}
