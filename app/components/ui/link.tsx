// createLink with third party libraries
// https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#createlink-with-third-party-libraries

import * as Headless from "@headlessui/react";
import {
  createLink,
  Link as RouterLink,
  type LinkComponent,
  type LinkOptions,
} from "@tanstack/react-router";
import type { ComponentProps } from "react";

const CustomHeadlessLink = (
  props: ComponentProps<LinkComponent<"a">>,
) => {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} />
    </Headless.DataInteractive>
  );
};

const CreatedLinkComponent = createLink(CustomHeadlessLink);

export const Link: LinkComponent<typeof CustomHeadlessLink> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};

export type LinkProps = LinkOptions;
