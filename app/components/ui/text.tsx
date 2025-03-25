/** https://catalyst.tailwindui.com/docs/text */
import { cn } from "@/lib/utils/cn";
import { Link } from "./link";

export function P(
  { className, ...props }: React.ComponentPropsWithoutRef<"p">,
) {
  return (
    <p
      data-slot="text"
      {...props}
      className={cn(
        "text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400",
        className,
      )}
    />
  );
}

export function TextLink(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof Link>,
) {
  return (
    <Link
      {...props}
      className={cn(
        "text-base/6 sm:text-sm/6 text-zinc-950 underline decoration-zinc-950/50 dark:text-white/80 dark:decoration-white/50",
        "data-hover:text-zinc-950/70 dark:data-hover:text-white/80 data-hover:decoration-zinc-950 dark:data-hover:decoration-white",
        className,
      )}
    />
  );
}

export function A(
  { className, ...props }: React.ComponentPropsWithoutRef<"a">,
) {
  return (
    <a
      {...props}
      className={cn(
        "text-base/6 sm:text-sm/6 text-zinc-500 underline decoration-zinc-950/50 dark:text-zinc-400 dark:decoration-white/50",
        "hover:text-zinc-950/70 dark:hover:text-white/80 hover:decoration-zinc-950/70 dark:hover:decoration-white/80",
        className,
      )}
    />
  );
}

export function Strong(
  { className, ...props }: React.ComponentPropsWithoutRef<"strong">,
) {
  return (
    <strong
      {...props}
      className={cn(className, "font-medium text-zinc-950 dark:text-white")}
    />
  );
}

export function Code(
  { className, ...props }: React.ComponentPropsWithoutRef<"code">,
) {
  return (
    <code
      {...props}
      className={cn(
        "rounded-sm border border-zinc-950/10 bg-zinc-950/[2.5%] px-1 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white",
        className,
      )}
    />
  );
}
