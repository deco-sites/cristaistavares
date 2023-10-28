import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossibilities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductCta from "$store/components/product/ProductCta.tsx";
import Installments from "./Installments.tsx";
import DiscountPercentage from "$store/components/product/DiscountPercentage.tsx";
import SkuSelector from "$store/components/product/SkuSelector.tsx";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";

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
    stars?: boolean;
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
  isSearchbar?: boolean;
  resizeNameHeight?: boolean;
  resizeQuantity?: boolean;
  isProductMatcher?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const newSkuId = (url: string | null) => {
  if (!url) return;

  const link = new URL(url);
  const skuId = link.searchParams.get("skuId");

  return skuId;
};

const WIDTH = 275;
const HEIGHT = 275;

function ProductCard(
  {
    product,
    preload = false,
    itemListName,
    layout,
    isSearchbar = false,
    resizeNameHeight = false,
    resizeQuantity,
    isProductMatcher = false,
  }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price: offerPrice, seller } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const { selectedSku } = useSkuSelector();

  const skuId = newSkuId(selectedSku.value);

  const filteredProduct =
    product.isVariantOf?.hasVariant.filter((item) => item.sku === skuId)[0];

  const {
    listPrice: filteredProductListPrice,
    price: filteredProductPrice,
    seller: filteredProductSeller,
  } = useOffer(filteredProduct?.offers);

  const {
    billingDuration: installmentsBillingDuration,
    billingIncrement: installmentsBillingIncrement,
  } = ((filteredProduct ?? product).offers?.offers[0].priceSpecification || [])
    .filter((item) => item.billingDuration !== undefined)
    .sort((a, b) => (b.billingDuration || 0) - (a.billingDuration || 0))
    .map(({ billingDuration, billingIncrement }) => ({
      billingDuration,
      billingIncrement,
    }))[0] || {};

  const price =
    (filteredProduct ?? product)?.offers?.offers[0]?.priceSpecification?.find((
      item,
    ) => item.priceType == "https://schema.org/SalePrice")?.price ?? offerPrice;
  const pixPrice =
    (filteredProduct ?? product)?.offers?.offers[0]?.priceSpecification?.find((
      item,
    ) => item.name === "Pix")?.price ?? 0;

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuOrder = ["PP", "P", "M", "G", "GG"];

  const skuSelector = variants
    .sort(([a], [b]) => skuOrder.indexOf(a) - skuOrder.indexOf(b))
    .map(([value, [link]]) => (
      <SkuSelector key={value} value={value} link={link} url={url} />
    ));

  const isNew = additionalProperty?.find((item) => item.value == "LANÇAMENTO");
  const isKit = additionalProperty?.find((item) => item.value == "KIT");

  return (
    <div
      id={id}
      class={`flex flex-col justify-between bg-white relative card-compact rounded-md group w-full h-full hover:shadow-2xl border border-[#c9c9c9] p-1.5 lg:p-3 ${
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
                product: filteredProduct ?? product,
                price: filteredProductPrice ?? price,
                listPrice: filteredProductListPrice ?? listPrice,
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
          class="grid grid-cols-1 grid-rows-1 w-full h-full relative"
        >
          {isKit && (
            <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 lg:top-4 z-30 rounded-md text-xs lg:text-normal">
              KIT
            </span>
          )}

          {isNew && (
            <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 lg:top-4 z-30 rounded-md text-xs lg:text-normal">
              LANÇAMENTO
            </span>
          )}

          <DiscountPercentage
            price={filteredProductPrice! ?? price!}
            listPrice={filteredProductListPrice! ?? listPrice!}
          />

          {
            /* {!isSearchbar && product.isSimilarTo &&
            product.isSimilarTo.length !== 0 && (
            <div class="hidden md:block indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute right-1 gap-1 lg:top-4 z-30 rounded-md">
              +{product.isSimilarTo.length} cores
            </div>
          )} */
          }

          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full w-full h-full object-cover rounded-lg ${
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
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded-lg w-full opacity-0 lg:group-hover:opacity-100"
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
          {l?.onMouseOver?.showCta &&
            (
              <ProductCta
                name={name ?? ""}
                productID={(filteredProduct?.sku === skuId
                  ? skuId
                  : productID) ?? productID}
                productGroupID={productGroupID ?? ""}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                seller={filteredProductSeller ?? seller!}
                resizeQuantity={resizeQuantity}
                isProductMatcher={isProductMatcher}
              />
            )}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex flex-col md:p-2 gap-[0.4rem] lg:gap-2">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <div
            class={`${
              align === "center"
                ? "items-center"
                : "items-start lg:items-center"
            } flex flex-col lg:flex-row justify-between w-full gap-2`}
          >
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex flex-wrap items-center gap-2 overflow-auto ${
                  align === "center" ? "justify-center p-3" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}

            {!isSearchbar && product.isSimilarTo &&
              product.isSimilarTo.length !== 0 && (
              <div class="flex text-xs text-black">
                +{product.isSimilarTo.length} cores
              </div>
            )}
          </div>
        )}

        {!l?.hide?.stars && (
          <div
            class={`${
              align === "center" && "align-middle justify-center"
            } flex flex-row gap-1 items-center`}
          >
            <div class="rating align-middle">
              <input
                type="radio"
                name="rating-1"
                aria-label="first star"
                class="mask mask-star-2 bg-gray-300 w-4 cursor-default"
              />
              <input
                type="radio"
                name="rating-2"
                aria-label="second star"
                class="mask mask-star-2 bg-gray-300 w-4 cursor-default"
              />
              <input
                type="radio"
                name="rating-3"
                aria-label="third star"
                class="mask mask-star-2 bg-gray-300 w-4 cursor-default"
              />
              <input
                type="radio"
                name="rating-4"
                aria-label="fourth star"
                class="mask mask-star-2 bg-gray-300 w-4 cursor-default"
              />
              <input
                type="radio"
                name="rating-5"
                aria-label="fifth star"
                class="mask mask-star-2 bg-gray-300 w-4 cursor-default"
              />
            </div>
          </div>
        )}

        {l?.hide?.productName && l?.hide?.productDescription ? "" : (
          <div
            class={`${
              align === "center" && "items-center justify-center text-center"
            } flex flex-col gap-0 w-full ${resizeNameHeight && "min-h-[60px]"}`}
          >
            {l?.hide?.productName ? "" : (
              <h3 class="text-sm w-full">
                {product.isVariantOf?.name}
              </h3>
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
              class={`flex flex-row gap-1 ${
                align === "center"
                  ? "justify-center items-center"
                  : "justify-start items-center"
              }`}
            >
              {(filteredProductListPrice ?? listPrice ?? 0) >
                  (filteredProductPrice ?? price!) && (
                <div
                  class={`line-through text-black text-xs ${
                    l?.basics?.oldPriceSize === "Normal"
                      ? "lg:text-xl"
                      : "lg:text-sm"
                  }`}
                >
                  <span>
                    {formatPrice(
                      filteredProductListPrice ?? listPrice,
                      offers!.priceCurrency!,
                    )}
                  </span>
                </div>
              )}
              <div class="text-black text-sm">
                {formatPrice(
                  filteredProductPrice ?? price,
                  offers!.priceCurrency!,
                )}
              </div>
            </div>
            <div class="text-black text-sm">
              {formatPrice(
                pixPrice,
                offers!.priceCurrency!,
              )} no <b>PIX</b>
            </div>
            {l?.hide?.installments ? "" : (
              <div
                class={`flex ${
                  align === "center" && "items-center justify-center"
                }`}
              >
                <Installments
                  installmentsBillingDuration={installmentsBillingDuration ??
                    0}
                  installmentsBillingIncrement={installmentsBillingIncrement ??
                    0}
                />
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
              class={`flex-auto flex items-center justify-center w-full pr-2.5 ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              <ProductCta
                name={name ?? ""}
                productID={(filteredProduct?.sku === skuId
                  ? skuId
                  : productID) ?? productID}
                productGroupID={productGroupID ?? ""}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                seller={filteredProductSeller ?? seller!}
                resizeQuantity={resizeQuantity}
                isProductMatcher={isProductMatcher}
              />
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
