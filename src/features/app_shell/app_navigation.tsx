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
  CreditCardIcon,
  DocumentTextIcon,
  LightBulbIcon,
  LinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import type { PropsWithChildren } from "react";
import { UserMenu } from "./user_menu";
import { BRANDING } from "@/lib/constants";
import { useListForms } from "../form_management/hooks/use_list_forms";
import { FEATURE_FLAGS } from "@/lib/feature_flags/feature_flags";
import { useFeatureFlagEnabled } from "@/lib/feature_flags/use_feature_flag_enabled";
import { SubmissionEmailQuotaProgress } from "../email_management/submission_email_quota_usage";

type Props = {
  email?: string;
  pathname?: string;
} & PropsWithChildren;

export function AppNavigation(props: Props) {
  const { data: emailManagementFlag } = useFeatureFlagEnabled(
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
              current={props.pathname?.startsWith("/dashboard/forms")}
            >
              <FormsIcon
                open={!!props.pathname?.startsWith("/dashboard/forms")}
              />
            </NavbarItem>

            {emailManagementFlag && (
              <NavbarItem
                to="/dashboard/emails"
                aria-label="Emails"
                current={props.pathname?.startsWith("/dashboard/emails")}
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
            <SidebarSection>
              <SidebarHeading className="max-lg:hidden">
                {BRANDING.name}
              </SidebarHeading>

              <SidebarItem
                className="max-lg:hidden"
                to="/dashboard/forms"
                current={props.pathname?.startsWith("/dashboard/forms")}
              >
                <FormsIcon
                  open={!!props.pathname?.startsWith("/dashboard/forms")}
                />
                <SidebarLabel>Forms</SidebarLabel>
              </SidebarItem>

              {emailManagementFlag && (
                <SidebarItem
                  className="max-lg:hidden"
                  to="/dashboard/emails"
                  current={props.pathname?.startsWith("/dashboard/emails")}
                >
                  <AtSymbolIcon />
                  <SidebarLabel>Emails</SidebarLabel>
                </SidebarItem>
              )}

              <SidebarItem
                to="/dashboard/billing"
                current={props.pathname?.startsWith("/dashboard/billing")}
              >
                <CreditCardIcon />
                <SidebarLabel>Billing</SidebarLabel>
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
              <div className="flex flex-col gap-1 py-2">
                {forms.data?.map((f) => (
                  <SidebarItem
                    to="/dashboard/forms/$formSlug"
                    current={props.pathname?.startsWith(
                      `/dashboard/forms/${f.slug}`,
                    )}
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

            <SidebarSection className="space-y-4">
              <SidebarItem to="/">
                <LinkIcon />
                <SidebarLabel>Homepage</SidebarLabel>
              </SidebarItem>

              <div className="rounded-lg bg-zinc-200 dark:bg-zinc-900 p-2 pb-3">
                <SubmissionEmailQuotaProgress />
              </div>

              {
                /* <SidebarItem to="/">
                <LightBulbIcon />
                <SidebarLabel>Share feedback</SidebarLabel>
              </SidebarItem> */
              }
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
