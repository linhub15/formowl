import { Container } from "@/components/layout/container";
import { BRANDING } from "@/lib/constants";
import { Link, type LinkProps } from "@tanstack/react-router";

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
    { name: "Terms of service", to: "/" },
    { name: "Privacy policy", to: "/" },
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
                <h3 className="text-sm/6 font-semibold text-white">
                  Product
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-sm/6 text-gray-400 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {
                /* <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">Guides</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.guides.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-sm/6 text-gray-400 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */
              }
            </div>
            <div>
              <h3 className="text-sm/6 font-semibold text-white">Legal</h3>
              <ul className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm/6 text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <p className="mt-8 text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; {BRANDING.established} 🇨🇦 {BRANDING.company}{" "}
            All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
