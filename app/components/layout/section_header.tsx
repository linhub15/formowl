import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, type LinkProps } from "../ui/link";
import { Heading } from "../ui/heading";
import { Tabbar, TabbarItem } from "../ui/tabbar";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../ui/dropdown";
import { Fragment, type ReactNode } from "react";

type Tab = {
  name: ReactNode;
  linkProps: LinkProps;
  current: boolean;
};

type Props = {
  heading: ReactNode;
  breadcrumbs?: { title: string; to: LinkProps["to"] }[];
  actions?: ReactNode;
  tabs?: Tab[];
};

export function SectionHeader(
  { heading, breadcrumbs = [], actions, tabs = [] }: Props,
) {
  return (
    <div className="relative border-b border-zinc-950/5 dark:border-white/5 space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <Heading>
          {breadcrumbs.map((crumb) => (
            <Fragment key={crumb.to}>
              <Link
                className="text-zinc-500 dark:text-zinc-400"
                to={crumb.to}
              >
                {crumb.title}
              </Link>
              <span className="text-zinc-500 dark:text-zinc-400 mx-3 select-none">
                /
              </span>
            </Fragment>
          ))}
          {heading}
        </Heading>
        {actions}
      </div>

      {tabs.length > 0 &&
        (
          <div>
            <div className="grid grid-cols-1 sm:hidden">
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <Dropdown>
                <DropdownButton outline>
                  {tabs.find((tab) => tab.current)?.name}
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu>
                  {tabs.map((tab) => (
                    <DropdownItem key={tab.linkProps.to} {...tab.linkProps}>
                      {tab.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="hidden sm:block">
              <Tabbar>
                {tabs.map((tab) => (
                  <TabbarItem
                    key={tab.linkProps.to}
                    current={tab.current}
                    {...tab.linkProps}
                  >
                    {tab.name}
                  </TabbarItem>
                ))}
              </Tabbar>
            </div>
          </div>
        )}
    </div>
  );
}
