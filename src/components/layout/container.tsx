import type { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
      {props.children}
    </div>
  );
}
