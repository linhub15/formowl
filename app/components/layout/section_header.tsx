import { ChevronDownIcon } from "@heroicons/react/16/solid";
import type { LinkProps } from "../ui/link";
import { Heading } from "../ui/heading";
import { Tabbar, TabbarItem } from "../ui/tabbar";

type Tab = {
  name: string;
  linkProps: LinkProps;
  current: boolean;
};

type Props = {
  heading: string;
  actions?: React.ReactNode;
  tabs?: Tab[];
};

export function SectionHeader({ heading, actions, tabs = [] }: Props) {
  return (
    <div className="relative border-b border-zinc-950/5 dark:border-white/5 pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <Heading>{heading}</Heading>
        {actions}
      </div>

      <div>
        <div className="grid grid-cols-1 sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            defaultValue={tabs.find((tab) => tab.current)?.name}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            {tabs.map((tab) => <option key={tab.name}>{tab.name}</option>)}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>
        <div className="hidden sm:block">
          <Tabbar>
            {tabs.map((tab) => (
              <TabbarItem
                key={tab.name}
                current={tab.current}
                {...tab.linkProps}
              >
                {tab.name}
              </TabbarItem>
            ))}
          </Tabbar>
        </div>
      </div>
    </div>
  );
}
