import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

import SuggestionCard from "$store/components/product/ProductSuggestion.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import useAddToCart from "$store/actions/addToCart.ts";

import { useState } from "preact/compat";

interface Props {
  product: Product;
  suggestions: Product[] | null;
}

export default function Matcher({ product, suggestions }: Props) {
  const [isChecked, setIsChecked] = useState(true);
  const { seller } = useOffer(product.offers);

  const definitiveListPrice = product.offers?.offers[0].priceSpecification[0]
    .price;

  const definitivePrice = product.offers?.offers[0].priceSpecification[1].price;

  if (suggestions === null) {
    return null;
  }

  const {
    offers,
  } = suggestions[0];

  const secondListPrice = suggestions[0].offers?.offers[0].priceSpecification[0]
    .price;

  const secondPrice = suggestions[0].offers?.offers[0].priceSpecification[1]
    .price;

  const {
    seller: secondSeller,
  } = useOffer(offers);

  const items = useAddToCart({
    items: isChecked
      ? [
        {
          skuId: product.productID,
          sellerId: seller!,
          price: definitivePrice ?? 0,
          discount: definitivePrice && definitiveListPrice
            ? definitiveListPrice - definitivePrice
            : 0,
          name: product.name ?? "",
          quantity: 1,
          productGroupId: product.isVariantOf?.productGroupID ?? "",
        },
        {
          skuId: suggestions[0].productID,
          sellerId: secondSeller!,
          price: secondPrice ?? 0,
          discount: secondPrice && secondListPrice
            ? secondListPrice - secondPrice
            : 0,
          name: suggestions[0].name ?? "",
          quantity: 1,
          productGroupId: suggestions[0].isVariantOf?.productGroupID ?? "",
        },
      ]
      : [
        {
          skuId: product.productID,
          sellerId: seller!,
          price: definitivePrice ?? 0,
          discount: definitivePrice && definitiveListPrice
            ? definitiveListPrice - definitivePrice
            : 0,
          name: product.name ?? "",
          quantity: 1,
          productGroupId: product.isVariantOf?.productGroupID ?? "",
        },
      ],
  });

  return (
    <div class="flex flex-col lg:flex-row items-center justify-start w-full lg:gap-8 mb-8">
      <div class="flex flex-col lg:flex-row items-center justify-start border border-gray-dark lg:border-none rounded-xl px-2 lg:px-0 lg:gap-8">
        <SuggestionCard product={product} />

        <div class="btn btn-circle btn-outline text-dark-gray hover:text-dark-gray hover:bg-none">
          <Icon id="Plus" width={12} height={12} strokeWidth={3} />
        </div>

        <SuggestionCard
          product={suggestions[0]}
          hasCheckbox={{
            isChecked,
            setIsChecked,
          }}
        />

        <div class="btn btn-circle btn-outline text-dark-gray hover:text-dark-gray hover:bg-none mb-2 lg:mb-0">
          =
        </div>
      </div>

      <div class="flex flex-col items-center lg:items-start gap-1 mt-4 lg:mt-0">
        <p class="text-gray-base">
          {isChecked ? "Compre os 2 produtos por:" : "Compre um 1 produto por:"}
        </p>
        <span class="font-bold leading-[22px]">
          {formatPrice(
            (definitivePrice ?? 0) + (isChecked ? (secondPrice ?? 0) : 0),
            offers!.priceCurrency!,
          )}
        </span>
        <span class="flex">
          <div class="text-sm leading-[22px]">
            ou{"  "}<span class="font-bold text-lg">8x</span>{"  "}de{"  "}
            <span class="font-bold text-lg">
              {formatPrice(
                ((definitivePrice ?? 0) +
                  (isChecked ? (secondPrice ?? 0) : 0)) / 8,
                offers!.priceCurrency!,
              )}
            </span>{"  "}
            s/juros
          </div>
        </span>
        {isChecked
          ? (
            <Button
              data-deco="add-to-cart"
              {...items}
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR JUNTO
            </Button>
          )
          : (
            <Button
              data-deco="add-to-cart"
              {...items}
              class="w-full h-[41px] min-h-min bg-emerald-500 hover:bg-emerald-400 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
            >
              COMPRAR ÚNICO
            </Button>
          )}
      </div>
    </div>
  );
}
