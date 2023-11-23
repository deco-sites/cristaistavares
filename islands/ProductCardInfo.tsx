import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import ProductCta from "$store/components/product/ProductCta.tsx";
import Installments from "$store/components/product/Installments.tsx";

import type { Product } from "apps/commerce/types.ts";
import type { Layout } from "$store/components/product/ProductCard.tsx";

export interface ProductInfoProps {
  product: Product;
  layout?: Layout;
  resizeQuantity?: boolean;
  isProductMatcher?: boolean;
  itemListName?: string;
}

const newSkuId = (url: string | null) => {
  if (!url) return;

  const link = new URL(url);
  const skuId = link.searchParams.get("skuId");

  return skuId;
};

export default function ProductInfo(
  { product, layout, isProductMatcher, resizeQuantity, itemListName }:
    ProductInfoProps,
) {
  const {
    url,
    productID,
    name,
    offers,
    isVariantOf,
  } = product;

  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const { listPrice: listPriceOpt, price: offerPrice, seller } = useOffer(
    offers,
  );
  const { selectedSku } = useSkuSelector();

  const skuId = newSkuId(selectedSku.value);

  const filteredProduct = product.isVariantOf?.hasVariant.filter((item) =>
    item.sku === skuId
  )[0];

  const {
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
  const listPrice =
    (filteredProduct ?? product)?.offers?.offers[0]?.priceSpecification?.find((
      item,
    ) => item.priceType == "https://schema.org/ListPrice")?.price ??
      listPriceOpt;
  const pixPrice =
    (filteredProduct ?? product)?.offers?.offers[0]?.priceSpecification?.find((
      item,
    ) => item.name === "Pix")?.price ?? 0;

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  return (
    <>
      {l?.hide?.allPrices ? "" : (
        <div class="flex flex-col gap-1">
          <div
            class={`flex flex-row gap-1 ${
              align === "center"
                ? "justify-center items-center"
                : "justify-start items-center"
            }`}
          >
            {(listPrice ?? 0) >
                (price!) && (
              <div
                class={`line-through text-black text-xs ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:text-xl"
                    : "lg:text-sm"
                }`}
              >
                <span>
                  {formatPrice(
                    listPrice,
                    offers!.priceCurrency!,
                  )}
                </span>
              </div>
            )}
            <div class="text-black text-sm">
              {formatPrice(
                price,
                offers!.priceCurrency!,
              )}
            </div>
          </div>
          {pixPrice !== 0 && (
            <div class="text-black text-sm">
              {formatPrice(
                pixPrice,
                offers!.priceCurrency!,
              )} no <b>PIX</b>
            </div>
          )}
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

      {!l?.hide?.cta
        ? (
          <div
            class={`flex-auto flex items-center justify-center flex-grow pr-2.5 ${
              l?.onMouseOver?.showCta ? "lg:hidden" : ""
            }`}
          >
            <ProductCta
              name={name ?? ""}
              productID={(filteredProduct?.sku === skuId ? skuId : productID) ??
                productID}
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

      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product: filteredProduct ?? product,
                price: price,
                listPrice: listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}
