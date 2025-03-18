import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/ui/navbar";

type Props = {
  pathname?: string;
  isAuthenticated?: boolean;
};

export function MarketingNav(props: Props) {
  const { isAuthenticated, pathname } = props;
  return (
    <header className="flex items-center px-4">
      <div className="min-w-0 flex-1">
        <Navbar>
          <NavbarSpacer className="hidden lg:flex" />
          <NavbarSection>
            <NavbarItem to="/" current={pathname === "/"}>
              <NavbarLabel>
                Product
              </NavbarLabel>
            </NavbarItem>
            <NavbarItem to="/pricing" current={pathname === "/pricing"}>
              <NavbarLabel>
                Pricing
              </NavbarLabel>
            </NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            {isAuthenticated
              ? <Button to="/dashboard" outline>Dashboard</Button>
              : <Button to="/login" outline>Get started</Button>}
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  );
}
