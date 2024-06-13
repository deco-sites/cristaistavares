import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import type {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  isPDP?: boolean;
  /** @format html */
  title?: string;
  /** @format html */
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  hasPaddingOnTheRight?: boolean;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  isPDP = false,
  hasPaddingOnTheRight = false,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section class="flex w-full h-full bg-[#0a0a0a]">
      <div class="flex-grow xl:container py-8 flex flex-col gap-8 lg:gap-10 lg:py-10">
        <div
          class={`flex flex-col gap-1.5 ${
            layout?.headerAlignment === "center" &&
            "items-center justify-center"
          }`}
        >
          {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
          {description && (
            <h2 dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>

        <div
          id={id}
          class="container max-w-[1280px] grid grid-cols-[48px_1fr_48px] px-3 sm:px-5"
        >
          <Slider class="md:carousel md:carousel-end inline-flex overflow-x-scroll snap-mandatory scroll-smooth gap-1 md:gap-6 col-span-full row-start-2 row-end-5 scrollbar pb-4 lg:pb-0">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={`carousel-item sm:w-[292px] ${
                  hasPaddingOnTheRight &&
                  "first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
                } ${isPDP ? "w-full" : "w-[175px]"}`}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                />
              </Slider.Item>
            ))}
          </Slider>

          <>
            <div
              class={`${
                !isPDP && "hidden sm:block"
              } relative z-10 col-start-1 row-start-3`}
            >
              <Slider.PrevButton
                class={`absolute ${
                  !isPDP &&
                  "flex items-center justify-center text-white w-8 h-8 lg:rounded-[5px] border-none bg-gradient-to-l from-yellow-300 to-yellow-500 disabled:opacity-40 right-[68%]"
                }`}
              >
                <Icon
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="rotate-180"
                />
              </Slider.PrevButton>
            </div>
            <div
              class={`${
                !isPDP && "hidden sm:block"
              } relative z-10 col-start-3 row-start-3`}
            >
              <Slider.NextButton
                class={`absolute ${
                  !isPDP
                    ? "flex items-center justify-center text-white w-8 h-8 lg:rounded-[5px] border-none bg-gradient-to-r from-yellow-300 to-yellow-500 disabled:opacity-40 left-[68%]"
                    : "left-[60%]"
                }`}
              >
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>

          <SliderJS rootId={id} infinite />
          <SendEventOnLoad
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product) =>
                  mapProductToAnalyticsItem({
                    product,
                    ...(useOffer(product.offers)),
                  })
                ),
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductShelf;
