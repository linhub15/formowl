import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/ui/navbar";
import { BRANDING } from "@/lib/constants";
import { MatchRoute } from "@tanstack/react-router";

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
          <NavbarItem className="hidden sm:block" disabled>
            <span className="text-base leading-tight font-semibold">
              {BRANDING.name}
            </span>
          </NavbarItem>
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
              ? (
                <MatchRoute to="/dashboard" pending>
                  {(match) => (
                    match
                      ? (
                        <Button outline>
                          <LoadingSpinner className="text-white" />
                        </Button>
                      )
                      : <Button to="/dashboard" outline>Dashboard</Button>
                  )}
                </MatchRoute>
              )
              : (
                <MatchRoute to="/login" pending>
                  {(match) => (
                    match
                      ? (
                        <Button outline>
                          <LoadingSpinner />
                        </Button>
                      )
                      : (
                        <Button
                          className="data-[current=true]:invisible"
                          to="/login"
                          outline
                          data-current={pathname === "/login"}
                        >
                          Try the Alpha
                        </Button>
                      )
                  )}
                </MatchRoute>
              )}
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  );
}
