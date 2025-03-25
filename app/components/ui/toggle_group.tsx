/** Custom: built as an alternative to switch when the labels make more sense */
import { cn } from "@/lib/utils/cn";
import {
  Field,
  Label,
  Radio,
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
} from "@headlessui/react";
import { Fragment, type PropsWithChildren } from "react";

const radioStyles = {
  label: cn([
    // Base
    "w-full inline-flex items-baseline justify-center gap-x-2 text-base/6 font-semibold select-none",
    // Sizing
    "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
    // Focus
    "focus:outline-hidden data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500",
    // Disabled
    "data-disabled:opacity-50",
    // Icon
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]",
    // Active
    "data-active:text-zinc-950/80 data-active:bg-zinc-950/10 hover:bg-zinc-950/[2.5%]",
    // Dark mode
    "dark:data-active:text-white/90 dark:data-active:bg-white/10 dark:hover:bg-white/[2.5%]",
  ]),
  group: cn([
    // Base
    "border border-zinc-950/10 text-zinc-950/60 ",
    // Dark mode
    "dark:border-white/15 dark:text-white/70",
    // Icon
    "[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]",
  ]),
};

export function ToggleGroup({ className, ...props }:
  & RadioGroupProps
  & PropsWithChildren) {
  return (
    <RadioGroup
      {...props}
      className={cn(
        radioStyles.group,
        "grid grid-cols-2 w-xs rounded-lg overflow-clip",
        className,
      )}
    />
  );
}

export function ToggleOption(
  { children, ...props }: RadioProps & PropsWithChildren,
) {
  return (
    /// <Field> is used to listen to changes from parent RadioGroup
    <Field as={Fragment}>
      <Radio {...props}>
        {({ checked }) => (
          <Label
            className={radioStyles.label}
            data-active={checked ? "" : undefined}
          >
            {children}
          </Label>
        )}
      </Radio>
    </Field>
  );
}
