// createLink with third party libraries
// https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#createlink-with-third-party-libraries
import * as Headless from "@headlessui/react";
import {
  Link as TanstackLink,
  type LinkProps as TanstackLinkProps,
} from "@tanstack/react-router";

export type LinkProps = TanstackLinkProps & {
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
};

export const Link = (props: LinkProps) => {
  return (
    <Headless.DataInteractive>
      <TanstackLink {...props} />
    </Headless.DataInteractive>
  );
};
