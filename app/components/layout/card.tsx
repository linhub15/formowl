import type { PropsWithChildren } from "react";
import { Subheading } from "../ui/heading";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="divide-y divide-zinc-950/15 dark:divide-white/15 overflow-hidden rounded-lg border border-zinc-950/15 dark:border-white/15">
      {children}
    </div>
  );
}

export function CardHeader({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <Subheading level={2}>
        {children}
      </Subheading>
    </div>
  );
}

export function CardBody({ children }: PropsWithChildren) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}

export function CardFooter({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-4 sm:px-6">
      {children}
    </div>
  );
}
