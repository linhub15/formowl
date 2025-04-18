import { cn } from "@/lib/utils/cn";
import { LoaderCircle } from "lucide-react";
import { ComponentProps } from "react";

type Props = { className?: string } & ComponentProps<"svg">;

export function LoadingSpinner(props: Props) {
  return (
    <LoaderCircle
      {...props}
      className={cn(
        "animate-spin text-zinc-700",
        props.className,
      )}
      strokeWidth={2}
      shapeRendering={"geometricPrecision"}
    />
  );
}
