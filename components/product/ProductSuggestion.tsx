import Image from "apps/website/components/Image.tsx";
import Discount from "./Discount.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import DiscountPercentage from "$store/components/product/DiscountPercentage.tsx";

import { StateUpdater } from "preact/compat";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  hasCheckbox?: {
    isChecked: boolean;
    setIsChecked: StateUpdater<boolean>;
  };
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const DESKTOP_IMAGE_SIZE = {
  WIDTH: 150,
  HEIGHT: 150,
};

function SuggestionCard(
  { product, preload, hasCheckbox }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;

  const id = `product-suggestion-${productID}`;

  const definitiveListPrice =
    product.offers?.offers[0].priceSpecification[0].price;

  const definitivePrice = product.offers?.offers[0].priceSpecification[1].price;

  const [front, back] = images ?? [];

  return (
    <>
      {/* Mobile */}
      <div
        id={id}
        class="flex lg:hidden items-center justify-center gap-6 relative p-5 lg:p-2 border-black-opacity80 group w-full"
        data-deco="view-product"
      >
        {
          /* <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName,
              items: [
                mapProductToAnalyticsItem({
                  product,
                  price: definitivePrice,
                  listPrice: definitiveListPrice,
                }),
              ],
            },
          }}
        /> */
        }
        {hasCheckbox && (
          <div class="-translate-y-16 right-0 z-30 absolute">
            <input
              type="checkbox"
              aria-label="Botão de Check"
              checked={hasCheckbox.isChecked}
              onChange={() => hasCheckbox.setIsChecked((prev) => !prev)}
              class="checkbox"
            />
          </div>
        )}
        <figure
          class="relative"
          style={{
            aspectRatio:
              `${DESKTOP_IMAGE_SIZE.WIDTH} / ${DESKTOP_IMAGE_SIZE.HEIGHT}`,
          }}
        >
          <a
            href={url && relative(url)}
            aria-label="view product"
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={DESKTOP_IMAGE_SIZE.WIDTH}
              height={DESKTOP_IMAGE_SIZE.HEIGHT}
              class="rounded-[3px] w-full"
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        </figure>

        <div class="flex flex-col gap-1">
          <h2 class="text-sm text-gray-base leading-5">
            {product.isVariantOf?.name ?? name}
          </h2>
          <div class="w-full">
            <div class="flex justify-start gap-6 w-full">
              <div class="w-full">
                {Math.floor(
                      (definitiveListPrice ?? 0) - (definitivePrice ?? 0),
                    ) > 0 && (
                  <div class="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
                    <span class="line-through text-gray-base leading-[22px]">
                      {formatPrice(definitiveListPrice, offers!.priceCurrency!)}
                    </span>
                  </div>
                )}
                <span class="text-gray-base leading-[22px]">
                  {formatPrice(definitivePrice, offers!.priceCurrency!)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        id={id}
        class="hidden lg:block card card-compact justify-between p-2 pb-3 border-black-opacity80 group max-w-[220px]"
        data-deco="view-product"
      >
        {
          /* <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName,
              items: [
                mapProductToAnalyticsItem({
                  product,
                  price: definitivePrice,
                  listPrice: definitiveListPrice,
                }),
              ],
            },
          }}
        /> */
        }
        {hasCheckbox && (
          <div class="top-1 right-2 z-30 absolute">
            <input
              type="checkbox"
              aria-label="Botão de Check"
              checked={hasCheckbox.isChecked}
              onChange={() => hasCheckbox.setIsChecked((prev) => !prev)}
              class="checkbox"
            />
          </div>
        )}
        <div class="mb-4">
          <figure
            class="relative mb-[6px] sm:mb-3"
            style={{
              aspectRatio:
                `${DESKTOP_IMAGE_SIZE.WIDTH} / ${DESKTOP_IMAGE_SIZE.HEIGHT}`,
            }}
          >
            {!hasCheckbox && (
              <DiscountPercentage
                price={definitivePrice ?? 0}
                listPrice={definitiveListPrice ?? 0}
              />
            )}
            {/* Product Images */}
            <a
              href={url && relative(url)}
              aria-label="view product"
              class="contents"
            >
              <Image
                src={front.url!}
                alt={front.alternateName}
                width={DESKTOP_IMAGE_SIZE.WIDTH}
                height={DESKTOP_IMAGE_SIZE.HEIGHT}
                class="absolute transition-opacity rounded-[3px] w-full opacity-100 group-hover:opacity-0"
                sizes="(max-width: 640px) 50vw, 20vw"
                preload={preload}
                loading={preload ? "eager" : "lazy"}
                decoding="async"
              />
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={DESKTOP_IMAGE_SIZE.WIDTH}
                height={DESKTOP_IMAGE_SIZE.HEIGHT}
                class="absolute transition-opacity rounded-[3px] w-full opacity-0 group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>
          {/* Name */}
          <h2 class="text-sm text-gray-base leading-5">
            {product.isVariantOf?.name ?? name}
          </h2>
        </div>
        <div class="w-full">
          <div class="flex lg:items-end justify-start gap-6 w-full">
            <div class="w-full">
              {Math.floor((definitiveListPrice ?? 0) - (definitivePrice ?? 0)) >
                  0 && (
                <div class="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
                  <span class="line-through text-gray-base leading-[22px]">
                    {formatPrice(definitiveListPrice, offers!.priceCurrency!)}
                  </span>
                </div>
              )}
              <span class="text-gray-base leading-[22px]">
                {formatPrice(definitivePrice, offers!.priceCurrency!)}
              </span>
            </div>
            <div class="block">
              <Discount
                listPrice={definitiveListPrice ?? 0}
                price={definitivePrice ?? 0}
                currencySimbol={offers!.priceCurrency!}
                type="bordered"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestionCard;
