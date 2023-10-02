import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight, headerHeightWithCampaignTimer } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import CampaignTimer from "$store/islands/CampaignTimer.tsx";
import type { Props as CampaignTimerProps } from "./CampaignTimer.tsx";

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
  alerts: string[];
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
  campaignTimer?: CampaignTimerProps;
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
  campaignTimer,
}: Props) {
  const platform = usePlatform();
  const searchbar = { ..._searchbar, products, suggestions };

  function handleScroll() {
    self.addEventListener("scroll", () => {
      const scrollY = self.scrollY;
      const navbar = document.getElementById("navbar")!;
      const campaignTimer = document.getElementById("campaign-timer")!;

      if (scrollY > 270) {
        navbar.classList.remove("static");
        navbar.classList.add("fixed");
        campaignTimer.classList.add("hidden");
      } else {
        navbar.classList.remove("fixed");
        navbar.classList.add("static");
        campaignTimer.classList.remove("hidden");
      }
    });
  }

  return (
    <>
      <header
        style={{
          height: !campaignTimer ? headerHeight : headerHeightWithCampaignTimer,
        }}
        class="z-[80] w-full h-full relative"
      >
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
        >
          <div
            id="navbar"
            class="w-full bg-base-100 static z-50 drop-shadow-lg"
          >
            {campaignTimer && <CampaignTimer {...campaignTimer} />}
            <Alert alerts={alerts} />
            <Navbar items={navItems} searchbar={searchbar} logo={logo} />
          </div>
        </Drawers>
      </header>

      <script
        dangerouslySetInnerHTML={{ __html: `(${handleScroll.toString()})()` }}
      />
    </>
  );
}

export default Header;
