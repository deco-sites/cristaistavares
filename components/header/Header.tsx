import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import LoadingProgressBar from "./LoadingProgressBar.tsx";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { FnContext } from "deco/types.ts";

export interface NavItem {
  label: string;
  href: string;
  columns?: number;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Props {
  flagOnTop: {
    alerts: string[];
    spacing?: number;
    interval?: number;
  };
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  flagOnTop,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
  device,
}: ReturnType<typeof loader>) {
  const platform = usePlatform();
  const searchbar = { ..._searchbar, products, suggestions };

  function handleScroll() {
    self.addEventListener("scroll", () => {
      const scrollY = self.scrollY;
      const navbar = document.getElementById("navbar");
      const campaignTimer = document.getElementById("campaign-timer");

      if (scrollY > 60) {
        navbar?.classList?.add("fixed");
        campaignTimer?.classList?.add("hidden");
      } else {
        navbar?.classList?.remove("fixed");
        campaignTimer?.classList?.remove("hidden");
      }
    });
  }

  return (
    <>
      <header
        style={{
          height: headerHeight,
        }}
        class="z-50 w-full h-full relative"
      >
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
        >
          <div
            id="navbar"
            class="w-full bg-base-100 z-50 drop-shadow-lg"
          >
            <LoadingProgressBar />
            {flagOnTop && <Alert {...flagOnTop} />}
            <Navbar
              items={navItems}
              searchbar={searchbar}
              logo={logo}
              device={device}
            />
          </div>
        </Drawers>
      </header>

      <script
        dangerouslySetInnerHTML={{ __html: `(${handleScroll.toString()})()` }}
      />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default Header;
