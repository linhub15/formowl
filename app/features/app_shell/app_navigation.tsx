import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/ui/sidebar_layout";
import {
  BookOpenIcon,
  DocumentTextIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import type { PropsWithChildren } from "react";
import { UserMenu } from "./user_menu";
import { BRANDING } from "@/lib/constants";

type Props = {
  email?: string;
  pathname?: string;
} & PropsWithChildren;

export function AppNavigation(props: Props) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem
              to="/dashboard/get-started"
              aria-label="Get started"
              current={props.pathname === "/dashboard/get-started"}
            >
              <BookOpenIcon />
            </NavbarItem>
            <UserMenu email={props.email} type="navbar" />
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>{BRANDING.name}</SidebarHeading>
              <SidebarItem
                to="/dashboard/get-started"
                current={props.pathname === "/dashboard/get-started"}
              >
                <BookOpenIcon />
                <SidebarLabel>Get Started</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <div className="flex items-center justify-between">
                <SidebarHeading>Forms</SidebarHeading>
                <SidebarItem to="/dashboard/forms/create">
                  <PlusIcon />
                  New form
                </SidebarItem>
              </div>

              <SidebarItem
                to="/dashboard/forms/$formId"
                params={{ formId: "a" }}
              >
                {/* todo: create & list forms here */}
                <DocumentTextIcon />
                <SidebarLabel>Forms</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="/">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter className="max-lg:hidden">
            <UserMenu type="sidebar" email={props.email} />
          </SidebarFooter>
        </Sidebar>
      }
    >
      {props.children}
    </SidebarLayout>
  );
}
