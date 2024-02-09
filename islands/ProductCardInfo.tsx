import { formatPrice } from "$store/sdk/format.ts";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";

import ProductCta from "$store/components/product/ProductCta.tsx";
import Installments from "$store/components/product/Installments.tsx";

import type { Layout } from "$store/components/product/ProductCard.tsx";

export interface ProductInfoProps {
  product: {
    name?: string;
    installmentsBillingDuration?: number;
    installmentsBillingIncrement?: number;
    productID: string;
    url?: string;
    price?: number;
    listPrice?: number;
    pixPrice?: number;
    seller?: string;
    isVariantOf?: {
      productGroupID?: string;
      hasVariant?: {
        sku: string;
        price?: number;
        listPrice?: number;
        pixPrice?: number;
        seller?: string;
        installmentsBillingDuration?: number;
        installmentsBillingIncrement?: number;
      }[];
    };
  };
  layout?: Layout;
  resizeQuantity?: boolean;
  isProductMatcher?: boolean;
}

const newSkuId = (url: string | null) => {
  if (!url) return;

  const link = new URL(url);
  const skuId = link.searchParams.get("skuId");

  return skuId;
};

export default function ProductInfo({
  product,
  layout,
  isProductMatcher,
  resizeQuantity,
}: ProductInfoProps) {
  const {
    url,
    productID,
    name,
    isVariantOf,
  } = product;

  const productGroupID = isVariantOf?.productGroupID;

  const { selectedSku } = useSkuSelector();

  const skuId = newSkuId(selectedSku.value);

  const filteredProduct = product?.isVariantOf?.hasVariant?.filter((item) =>
    item.sku === skuId
  )[0];

  const price = filteredProduct?.price ?? product.price;
  const listPrice = filteredProduct?.listPrice ?? product.listPrice;
  const pixPrice = filteredProduct?.pixPrice ?? product.pixPrice;

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
                    "BRL",
                  )}
                </span>
              </div>
            )}
            <div class="text-black text-sm">
              {formatPrice(
                price,
                "BRL",
              )}
            </div>
          </div>
          {pixPrice !== 0 && (
            <div class="font-medium text-base text-emerald-500">
              {formatPrice(
                pixPrice,
                "BRL",
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
                installmentsBillingDuration={filteredProduct
                  ?.installmentsBillingDuration ??
                  product?.installmentsBillingDuration ?? 0}
                installmentsBillingIncrement={filteredProduct
                  ?.installmentsBillingIncrement ??
                  product?.installmentsBillingIncrement ?? 0}
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
              seller={filteredProduct?.seller ?? product.seller!}
              resizeQuantity={resizeQuantity}
              isProductMatcher={isProductMatcher}
            />
          </div>
        )
        : ""}
    </>
  );
}
