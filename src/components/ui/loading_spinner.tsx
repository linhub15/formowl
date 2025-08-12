import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

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

/** https://lucide.dev/icons/loader-circle */
function LoaderCircle(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Loader Circle</title>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
