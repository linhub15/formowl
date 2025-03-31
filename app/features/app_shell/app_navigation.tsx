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
  AtSymbolIcon,
  DocumentTextIcon,
  LightBulbIcon,
  LinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import type { PropsWithChildren } from "react";
import { UserMenu } from "./user_menu";
import { BRANDING } from "@/lib/constants";
import { useListForms } from "../form_management/hooks/use_list_forms";
import { useFeatureFlagEnabled } from "posthog-js/react";
import { FEATURE_FLAGS } from "@/lib/posthog/feature_flags";

type Props = {
  email?: string;
  pathname?: string;
} & PropsWithChildren;

export function AppNavigation(props: Props) {
  const emailManagementFlag = useFeatureFlagEnabled(
    FEATURE_FLAGS.emailManagement,
  );

  const forms = useListForms();
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem
              to="/dashboard/forms"
              aria-label="Forms"
              current={props.pathname === "/dashboard/forms"}
            >
              <FormsIcon open={props.pathname === "/dashboard/forms"} />
            </NavbarItem>

            {emailManagementFlag && (
              <NavbarItem
                to="/dashboard/emails"
                aria-label="Emails"
                current={props.pathname === "/dashboard/emails"}
              >
                <AtSymbolIcon />
              </NavbarItem>
            )}
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
                to="/dashboard/forms"
                current={props.pathname === "/dashboard/forms"}
              >
                <FormsIcon open={props.pathname === "/dashboard/forms"} />
                <SidebarLabel>Forms</SidebarLabel>
              </SidebarItem>

              {emailManagementFlag && (
                <SidebarItem
                  to="/dashboard/emails"
                  current={props.pathname === "/dashboard/emails"}
                >
                  <AtSymbolIcon />
                  <SidebarLabel>Emails</SidebarLabel>
                </SidebarItem>
              )}
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
              <div className="flex flex-col gap-1 py-2">
                {forms.data?.map((f) => (
                  <SidebarItem
                    to="/dashboard/forms/$formSlug"
                    params={{ formSlug: f.slug }}
                    key={f.slug}
                  >
                    <DocumentTextIcon />
                    <SidebarLabel>{f.name}</SidebarLabel>
                  </SidebarItem>
                ))}
              </div>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem to="/">
                <LinkIcon />
                <SidebarLabel>Homepage</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/">
                <LightBulbIcon />
                <SidebarLabel>Share feedback</SidebarLabel>
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

function FormsIcon(props: { open: boolean }) {
  return props.open
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
    );
}
