/** https://catalyst.tailwindui.com/docs/divider */
import { cva } from "cva";

type Props =
  & {
    soft?: boolean;
  }
  & React.PropsWithChildren
  & React.ComponentPropsWithoutRef<"hr">;

const divider = cva({
  variants: {
    soft: {
      true: "border-zinc-950/5 dark:border-white/5",
      false: "border-zinc-950/10 dark:border-white/10",
    },
  },
});

export function Divider({
  soft = false,
  className,
  children,
  ...props
}: Props) {
  return (
    children
      ? (
        <div className="flex items-center text-center text-sm">
          <div
            className={divider({ soft, className: "flex-1 border-b mr-3" })}
          />
          {children}
          <div
            className={divider({ soft, className: "flex-1 border-b ml-3" })}
          />
        </div>
      )
      : (
        <hr
          {...props}
          className={divider({
            soft,
            className: [className, "w-full border-t"],
          })}
        />
      )
  );
}
