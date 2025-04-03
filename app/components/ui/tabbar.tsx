import { motion } from "framer-motion";
import type React from "react";
import { TouchTarget } from "./button";
import { Link, type LinkProps } from "./link";
import { cn } from "@/lib/utils/cn";

export function Tabbar(
  { className, ...props }: React.ComponentPropsWithoutRef<"nav">,
) {
  return (
    <nav
      {...props}
      className={cn(className, "flex flex-1 items-center gap-4")}
    />
  );
}

export function TabbarItem(
  {
    current,
    className,
    children,
    ...props
  }:
    & {
      current?: boolean;
      className?: string;
      children: React.ReactNode;
    }
    & LinkProps,
) {
  const classes = cn(
    // Base
    "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950/80 sm:text-sm/5 select-none",
    // Leading icon/icon-only
    "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
    // Trailing icon (down chevron or similar)
    "*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
    // Avatar
    "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] *:data-[slot=avatar]:[--ring-opacity:10%] sm:*:data-[slot=avatar]:size-6",
    // Hover
    !props.disabled &&
      "data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950",
    // Active
    "data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950",
    // Dark mode
    "dark:text-white/75 dark:*:data-[slot=icon]:fill-zinc-400",
    !props.disabled &&
      "dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white",
    "dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white",
    // Disabled
    props.disabled && "text-zinc-950/50 dark:text-white/50",
  );

  return (
    <span className={cn(className, "relative")}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-0 rounded-lg bg-zinc-950/10 dark:bg-white/10"
        />
      )}

      <Link
        {...props}
        className={classes}
        data-current={current ? "true" : undefined}
      >
        <TouchTarget>{children}</TouchTarget>
      </Link>
    </span>
  );
}
