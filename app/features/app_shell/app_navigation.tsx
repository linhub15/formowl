import { FolderClosed, FolderOpen } from "lucide-react";
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
  LinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import type { PropsWithChildren } from "react";
import { UserMenu } from "./user_menu";
import { BRANDING } from "@/lib/constants";
import { useListForms } from "../form_management/hooks/use_list_forms";

type Props = {
  email?: string;
  pathname?: string;
} & PropsWithChildren;

export function AppNavigation(props: Props) {
  const forms = useListForms();
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

              <SidebarItem
                to="/dashboard/forms"
                current={props.pathname === "/dashboard/forms"}
              >
                {props.pathname === "/dashboard/forms"
                  // I'm trying to be fancy here. Feel free to remove.
                  ? (
                    <FolderOpen
                      size={20}
                      data-slot="icon"
                      strokeWidth="1px"
                      className="dark:stroke-black stroke-white"
                    />
                  )
                  : (
                    <FolderClosed
                      size={20}
                      data-slot="icon"
                      strokeWidth="1px"
                      className="dark:stroke-black stroke-white"
                    />
                  )}
                <SidebarLabel>Forms</SidebarLabel>
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

              {forms.data?.map((f) => (
                <SidebarItem
                  to="/dashboard/forms/$formSlug"
                  params={{ formSlug: f.slug }}
                  key={f.slug}
                >
                  <DocumentTextIcon />
                  <SidebarLabel>{f.title}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem to="/">
                <LinkIcon />
                <SidebarLabel>Homepage</SidebarLabel>
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
