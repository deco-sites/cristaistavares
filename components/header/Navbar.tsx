import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Login from "$store/components/header/LoginHeader.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex flex-col justify-between items-center border-b border-base-200 shadow-md w-full pl-2 pr-4 py-2 gap-2">
        <div class="grid grid-cols-3 items-center justify-center w-full h-full">
          <div class="flex justify-start">
            <MenuButton />
          </div>

          {logo && (
            <a
              href="/"
              class="flex justify-center max-h-fit h-fit"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={126}
                height={16}
                loading="eager"
              />
            </a>
          )}
          <div class="flex justify-end">
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
          </div>
        </div>
        <div class="w-full px-2">
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col max-w-[1266px] mx-auto pl-1 pr-3 pt-3">
        <div class="flex flex-row justify-between items-center">
          <div class="flex justify-start">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-3 w-[160px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={126}
                  height={16}
                  loading="eager"
                />
              </a>
            )}
          </div>

          <div class="flex items-center justify-center w-full">
            <Searchbar searchbar={searchbar} />
          </div>
          <div class="flex-none w-54 flex items-center justify-start gap-2">
            <Login />
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>

        <ul class="flex-auto flex-wrap flex items-center justify-between w-full">
          {items.map((item, index) => <NavItem item={item} index={index} />)}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
