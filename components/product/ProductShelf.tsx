import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import type {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
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
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  preload?: boolean;
  interval?: number;
  hasPaddingOnTheRight?: boolean;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  interval,
  preload = false,
  isPDP = false,
  hasPaddingOnTheRight = false,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-8 lg:gap-10 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="container max-w-[1280px] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-1 md:gap-6 col-span-full row-start-2 row-end-5">
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
            <Slider.PrevButton class={`absolute ${!isPDP && "btn right-1/2"}`}>
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div
            class={`${
              !isPDP && "hidden sm:block"
            } relative z-10 col-start-3 row-start-3`}
          >
            <Slider.NextButton
              class={`absolute ${!isPDP ? "btn left-1/2" : "left-[60%]"}`}
            >
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>

        {/* <Dots products={products} interval={(interval && interval * 1e3) ?? 0} /> */}

        <SliderJS rootId={id} />
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
  );
}

function Dots({ products, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel gap-4 translate-y-8">
        {products?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-3 h-3 rounded-full border border-gray-400 group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductShelf;
