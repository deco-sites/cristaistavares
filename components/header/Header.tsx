import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
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

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  flagOnTop,
  searchbar: _searchbar,
  navItems = [],
  logo,
  device,
}: ReturnType<typeof loader>) {
  const platform = usePlatform();
  const searchbar = { ..._searchbar };

  return (
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
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default Header;
