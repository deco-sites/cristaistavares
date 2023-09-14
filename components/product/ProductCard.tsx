import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/islands/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;

  platform: ReturnType<typeof usePlatform>;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 275;
const HEIGHT = 275;

const RATING = {
  votes: 16,
  rating: 3,
};

function ProductCard(
  { product, preload, itemListName, layout, platform }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, [link]], index) => (
    <li>
      <div>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value}
          index={index}
        />
      </div>
    </li>
  ));
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white w-full h-full py-2 duration-150 transition-colors max-h-[50px]"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class={`bg-white card card-compact rounded-none group w-full hover:shadow-2xl ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        {
          /* <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div> */
        }
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full relative"
        >
          <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 top-1 z-30">
            LANÇAMENTO
          </span>

          <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 top-8 z-30">
            {30}% OFF
          </span>

          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${
              l?.onMouseOver?.image == "Zoom image" ? "duration-100" : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        <div class="flex flex-row gap-1 align-middle items-center justify-center">
          <div class="rating align-middle">
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
              checked={Math.floor(RATING.rating) == 1}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
              checked={Math.floor(RATING.rating) == 2}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
              checked={Math.floor(RATING.rating) == 3}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
              checked={Math.floor(RATING.rating) == 4}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-yellow-300 w-4 cursor-default"
              checked={Math.floor(RATING.rating) === 5}
            />
          </div>
        </div>

        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col items-center justify-center text-center gap-0 w-full">
              {l?.hide?.productName
                ? ""
                : (
                  <h2 class="text-sm text-center w-full">
                    {product.isVariantOf?.name}
                  </h2>
                )}
              {l?.hide?.productDescription ? "" : (
                <p
                  class="truncate text-sm lg:text-sm text-neutral"
                  dangerouslySetInnerHTML={{
                    __html: product.description ?? "",
                  }}
                />
              )}
            </div>
          )}
        {l?.hide?.allPrices ? "" : (
          <div class="flex flex-col gap-1">
            <div
              class={`flex flex-col gap-0 ${
                l?.basics?.oldPriceSize === "Normal"
                  ? "lg:flex-row lg:gap-2"
                  : "lg:flex-row lg:gap-2"
              } ${
                align === "center"
                  ? "justify-center items-center"
                  : "justify-start items-start"
              }`}
            >
              <div
                class={`line-through text-black text-xs ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:text-xl"
                    : "lg:text-sm"
                }`}
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </div>
              <div class="text-black text-sm">
                {formatPrice(price, offers!.priceCurrency!)}
              </div>
            </div>
            <div class="text-black text-sm">
              {formatPrice(price, offers!.priceCurrency!)} no <b>PIX</b>
            </div>
            {l?.hide?.installments ? "" : (
              <div class="text-black text-sm">
                {installments}
              </div>
            )}
          </div>
        )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-center w-full ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              <QuantitySelector quantity={1} />
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
