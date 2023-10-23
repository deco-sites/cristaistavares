import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import type {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  banner: {
    image: ImageWidget;
    href: string;
    description: string;
  };
  products: Product[] | null;
  title?: string;
  cardLayout?: cardLayout;
}

export default function ProductMatch(
  { banner, products, title, cardLayout }: Props,
) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section class="flex items-center justify-center w-full h-full px-6 lg:px-3">
      <div class="flex flex-col lg:flex-row max-w-[1280px] items-center lg:items-start justify-between gap-6 lg:gap-3">
        {banner && (
          <a href={banner.href} class="w-full h-full">
            <Image
              src={banner.image}
              alt={banner.description}
              width={620}
              height={517}
              loading="lazy"
            />
          </a>
        )}

        <div class="flex flex-col items-center justify-center w-full h-full">
          <h1 class="text-center mb-4 text-lg lg:text-xl font-bold">{title}</h1>

          <div
            id={id}
            class="container max-w-[605px] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
          >
            <Slider class="carousel sm:carousel-end gap-1 sm:gap-6 col-span-full row-start-2 row-end-5">
              {products?.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-[175px] sm:w-[265px] first:pl-2 sm:first:pl-0 last:pr-2 sm:last:pr-0"
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
              <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="absolute flex items-center justify-center text-neutral-800 w-8 h-8 hover:bg-white rounded-[5px] border border-solid border-[#EAEAEA] hover:border-black disabled:cursor-not-allowed disabled:opacity-40 right-[70%]">
                  <Icon
                    size={24}
                    id="ChevronRight"
                    strokeWidth={3}
                    class="rotate-180"
                  />
                </Slider.PrevButton>
              </div>
              <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="absolute flex items-center justify-center text-neutral-800 w-8 h-8 hover:bg-white rounded-[5px] border border-solid border-[#EAEAEA] hover:border-black disabled:cursor-not-allowed disabled:opacity-40 left-[70%]">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
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
      </div>
    </section>
  );
}
