import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Subheading } from "@/components/ui/heading";
import { P, TextLink } from "@/components/ui/text";
import { BRANDING } from "@/lib/constants";
import type { LinkProps } from "@tanstack/react-router";

type Nav = Record<string, Array<{ name: string; to: LinkProps["to"] }>>;
const navigation: Nav = {
  product: [
    { name: "Home", to: "/" },
    { name: "Pricing", to: "/pricing" },
    { name: "Dashboard", to: "/dashboard" },
    // { name: "Status", to: "#" },
    // { name: "Documentation", to: "#" },
    // { name: "Support", to: "#" },
  ],
  guides: [
    // { name: "HTML", to: "/" },
    // { name: "React", to: "/" },
  ],
  legal: [
    { name: "Terms of service", to: "/terms" },
    { name: "Privacy policy", to: "/privacy" },
    // { name: "GDPR", to: "#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer>
      <Container>
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="max-w-lg grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Subheading className="text-sm/6">Product</Subheading>
                <ul className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <TextLink className="text-sm/6 no-underline" to={item.to}>
                        {item.name}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <Subheading className="text-sm/6">Legal</Subheading>
              <ul className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <TextLink className="text-sm/6 no-underline" to={item.to}>
                      {item.name}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 flex flex-col md:flex-row md:items-center md:justify-between lg:mt-24 gap-4">
          <a href="https://uptime.birdy.dev/status/formowl">
            <Badge>
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-full size-2 bg-green-600 animate-pulse" />
                All systems operational
              </div>
            </Badge>
          </a>

          <P className="text-sm/6">
            {BRANDING.name} &copy; {BRANDING.established} 🇨🇦 {BRANDING.company}
            {" "}
            <span className="inline-block">All rights reserved.</span>
          </P>
        </div>
      </Container>
    </footer>
  );
}
