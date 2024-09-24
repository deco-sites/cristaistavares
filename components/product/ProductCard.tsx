import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossibilities.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductInfo from "$store/islands/ProductCardInfo.tsx";
import DiscountPercentage from "$store/components/product/DiscountPercentage.tsx";
import SkuSelector from "$store/components/product/SkuSelector.tsx";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

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

export interface Props {
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

const WIDTH = 275;
const HEIGHT = 275;

function filterSimilarProductsLength(products: Product[]): number {
  const uniqueURLs = new Set();

  for (const product of products) {
    const url = product.url && relative(product.url);
    uniqueURLs.add(url);
  }

  return uniqueURLs.size;
}

function ProductCard(
  {
    product,
    preload = false,
    itemListName,
    layout,
    isSearchbar = false,
    resizeNameHeight = true,
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
    additionalProperty,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice: listPriceOpt, price: offerPrice, seller } = useOffer(
    offers,
  );
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const price = product?.offers?.offers[0]?.priceSpecification?.find((
    item,
  ) => item.priceType == "https://schema.org/SalePrice")?.price ?? offerPrice;
  const listPrice = product?.offers?.offers[0]?.priceSpecification?.find((
    item,
  ) => item.priceType == "https://schema.org/ListPrice")?.price ??
    listPriceOpt;
  const pixPrice = product?.offers?.offers[0]?.priceSpecification?.find((
    item,
  ) => item.name === "Pix")?.price ?? 0;

  const {
    billingDuration: installmentsBillingDuration,
    billingIncrement: installmentsBillingIncrement,
  } = (product.offers?.offers[0].priceSpecification || [])
    .filter((item) => item.billingDuration !== undefined)
    .sort((a, b) => (b.billingDuration || 0) - (a.billingDuration || 0))
    .map(({ billingDuration, billingIncrement }) => ({
      billingDuration,
      billingIncrement,
    }))[0] || {};

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuOrder = ["PP", "P", "M", "G", "GG"];

  const skuSelector = variants
    .sort(([a], [b]) => skuOrder.indexOf(a) - skuOrder.indexOf(b))
    .map(([value, [link]]) => (
      <SkuSelector
        key={value}
        value={value}
        link={link}
        product={{
          name,
          hasVariant: product?.isVariantOf?.hasVariant?.map((variant) => ({
            name: variant.name ?? "",
            sku: variant.sku ?? "",
          })),
        }}
        url={url}
      />
    ));

  const isNew = additionalProperty?.find((item) =>
    item.value == "LANÇAMENTO FLAG"
  );

  const isKit = additionalProperty?.find((item) =>
    item.value == "Kits" || item.value === "KIT"
  );

  // const isProgressiveDiscount = additionalProperty?.find((item) =>
  //   item.value === "DESCONTO PROGRESSIVO"
  // );

  return (
    <div
      id={id}
      class={`flex flex-col justify-between card card-compact group w-full h-full bg-white rounded-md group border border-[#c9c9c9] p-1.5 lg:p-3 ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
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
          class="grid grid-cols-1 grid-rows-1 w-full h-full"
        >
          <div class="flex flex-col gap-1.5 absolute left-1 lg:top-4 w-full">
            {isKit && (
              <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 z-30 rounded-md text-xs lg:text-normal">
                KIT
              </span>
            )}

            {isNew && (
              <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 z-30 rounded-md text-xs lg:text-normal">
                LANÇAMENTO
              </span>
            )}

            <DiscountPercentage
              price={price!}
              listPrice={listPrice!}
              isPDP={false}
            />
          </div>

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
            class={`bg-base-100 col-span-full row-span-full w-full rounded-lg ${
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
              class="hidden lg:block bg-base-100 col-span-full row-span-full transition-opacity rounded-lg w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
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
            } flex flex-col lg:flex-row flex-wrap justify-between flex-grow gap-2`}
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
                +{filterSimilarProductsLength(product.isSimilarTo)} cores
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
            } flex flex-col gap-0 flex-grow`}
          >
            {l?.hide?.productName ? "" : (
              <a
                href={url && relative(url)}
                aria-label={`view ${product.isVariantOf?.name}`}
              >
                <h3
                  class={`text-sm text-black w-full ${
                    resizeNameHeight &&
                    "min-h-[100px] max-h-[100px] sm:min-h-[80px] sm:max-h-[80px]"
                  }`}
                >
                  {product.isVariantOf?.name}
                </h3>
              </a>
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

        <ProductInfo
          product={{
            productID,
            url,
            name,
            pixPrice,
            price,
            listPrice,
            seller,
            installmentsBillingDuration,
            installmentsBillingIncrement,
            isVariantOf: {
              productGroupID: isVariantOf?.productGroupID,
              hasVariant: (product?.isVariantOf?.hasVariant || []).map(
                (variant) => {
                  const {
                    price: partialPrice,
                    listPrice: partialListPrice,
                    seller: filteredProductSeller,
                  } = useOffer(variant?.offers);

                  const filteredPrice =
                    variant?.offers?.offers[0]?.priceSpecification?.find(
                      (item) =>
                        item.priceType == "https://schema.org/SalePrice",
                    )?.price ?? partialPrice;

                  const filteredListPrice =
                    variant?.offers?.offers[0]?.priceSpecification?.find(
                      (item) =>
                        item.priceType == "https://schema.org/ListPrice",
                    )?.price ?? partialListPrice;

                  const filteredPixPrice =
                    variant?.offers?.offers[0]?.priceSpecification?.find(
                      (item) => item.name === "Pix",
                    )?.price ?? 0;

                  const {
                    billingDuration: installmentsBillingDurationSecondary,
                    billingIncrement: installmentsBillingIncrementSecondary,
                  } = (variant.offers?.offers[0].priceSpecification || [])
                    .filter((item) => item.billingDuration !== undefined)
                    .sort((a, b) =>
                      (b.billingDuration || 0) - (a.billingDuration || 0)
                    )
                    .map(({ billingDuration, billingIncrement }) => ({
                      billingDuration,
                      billingIncrement,
                    }))[0] || {};

                  return {
                    name: variant.name ?? "",
                    sku: variant.sku ?? "",
                    price: filteredPrice,
                    listPrice: filteredListPrice,
                    pixPrice: filteredPixPrice,
                    seller: filteredProductSeller,
                    installmentsBillingDuration:
                      installmentsBillingDurationSecondary,
                    installmentsBillingIncrement:
                      installmentsBillingIncrementSecondary,
                  };
                },
              ),
            },
          }}
          layout={layout}
          resizeQuantity={resizeQuantity}
          isProductMatcher={isProductMatcher}
        />

        <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName,
              items: [
                mapProductToAnalyticsItem({
                  product: product,
                  price: price,
                  listPrice: listPrice,
                }),
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductCard;
