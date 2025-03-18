import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { SidebarItem } from "@/components/ui/sidebar";
import { useSignOut } from "@/lib/auth/hooks/use_sign_out";
import { Avatar } from "@/components/ui/avatar";
import { NavbarItem } from "@/components/ui/navbar";

type Props = {
  type: "navbar" | "sidebar";
  email?: string;
};

export function UserMenu({ type, email }: Props) {
  const signOut = useSignOut();
  const isSidebar = type === "sidebar";

  return (
    <Dropdown>
      <DropdownButton as={isSidebar ? SidebarItem : NavbarItem}>
        <Avatar initials={email?.at(0)} square />
        {isSidebar && (
          <>
            <span className="flex min-w-0 items-center px-1">
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  {email}
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </>
        )}
      </DropdownButton>
      <DropdownMenu
        className="min-w-64"
        anchor={isSidebar ? "top start" : "bottom end"}
      >
        <DropdownItem to="/dashboard/profile">
          <UserIcon />
          <DropdownLabel>My profile</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/settings">
          <Cog8ToothIcon />
          <DropdownLabel>Settings</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/privacy-policy">
          <ShieldCheckIcon />
          <DropdownLabel>Privacy policy</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/share-feedback">
          <LightBulbIcon />
          <DropdownLabel>Share feedback</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => signOut.mutateAsync()}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
