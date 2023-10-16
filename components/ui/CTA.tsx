import { formatPrice } from "$store/sdk/format.ts";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

import type { AggregateOffer } from "apps/commerce/types.ts";

interface Props {
  listPrice?: number;
  price?: number;
  offers?: AggregateOffer;
  skuId: string;
  sellerId: string;
  productGroupId: string;
  name?: string;
}

export default function CTA(
  {
    listPrice,
    price,
    offers,
    skuId,
    sellerId,
    productGroupId,
    name,
  }: Props,
) {
  function handleScrollOnPDP() {
    self.addEventListener("scroll", () => {
      const scrollY = self.scrollY;
      const ctaContent = document.getElementById("cta-content")!;

      if (self.innerWidth < 640 && scrollY > 1100) {
        ctaContent.classList.remove("hidden");
        ctaContent.classList.add("flex");
      } else {
        ctaContent.classList.add("hidden");
        ctaContent.classList.remove("flex");
      }
    });
  }

  return (
    <>
      <div
        id="cta-content"
        class="hidden justify-between w-full h-[68px] z-40 py-2 px-3 fixed bottom-0 bg-base-100 shadow-2xl drop-shadow-md"
      >
        {/* Prices */}
        <div class="flex flex-col items-start justify-start">
          <div class="flex justify-start gap-6">
            <div>
              {Math.floor((listPrice ?? 0) - (price ?? 0)) > 0 && (
                <div class="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
                  <span class="line-through text-gray-base leading-[22px] text-sm">
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </span>
                </div>
              )}
              <span class="text-black font-semibold leading-[22px] text-[21px]">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
          </div>
        </div>

        <AddToCartButtonVTEX
          productID={skuId}
          seller={sellerId}
          price={price ?? 0}
          discount={price && listPrice ? listPrice - price : 0}
          name={name ?? ""}
          quantity={1}
          productGroupID={productGroupId ?? ""}
        />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(${handleScrollOnPDP.toString()})()`,
        }}
      />
    </>
  );
}
