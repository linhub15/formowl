import type { PropsWithChildren } from "react";
import { Subheading } from "../ui/heading";
import { cn } from "@/lib/utils/cn";

type Styleable = {
  className?: string;
};

export function Card({ children, className }: PropsWithChildren & Styleable) {
  return (
    <div
      className={cn(
        "divide-y divide-zinc-950/15 dark:divide-white/15 overflow-hidden rounded-lg border border-zinc-950/15 dark:border-white/15",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <Subheading
        level={2}
        className="text-zinc-950/75 dark:text-white/75 font-semibold"
      >
        {children}
      </Subheading>
    </div>
  );
}

export function CardBody({ children }: PropsWithChildren) {
  return <div className="px-4 py-5 sm:p-6 overflow-auto">{children}</div>;
}

export function CardFooter({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-4 sm:px-6">
      {children}
    </div>
  );
}
