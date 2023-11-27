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
    width?: number;
    height?: number;
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
    <section class="flex items-center justify-center flex-grow lg:px-3 xl:container">
      <div class="flex flex-col lg:flex-row max-w-[1240px] flex-grow items-center justify-between gap-6 lg:gap-3">
        {banner && (
          <a href={banner.href} class="lg:w-full lg:h-full px-6 lg:px-0">
            <Image
              src={banner.image}
              alt={banner.description}
              width={banner.width || 594}
              height={banner.height || 496}
              loading="lazy"
            />
          </a>
        )}

        <div class="flex flex-col items-center justify-center w-full">
          <h2 class="text-center mb-4 text-lg lg:text-xl font-bold">{title}</h2>

          <div
            id={id}
            class="xl:container grid grid-cols-[48px_1fr_48px] px-3 sm:px-5"
          >
            <Slider class="md:carousel md:carousel-end inline-flex overflow-x-scroll snap-mandatory scroll-smooth gap-1 md:gap-6 col-span-full row-start-2 row-end-5 scrollbar pb-4 lg:pb-0">
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
                    resizeQuantity={false}
                    isProductMatcher={true}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <>
              <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="absolute flex items-center justify-center text-neutral-800 w-8 h-8 lg:bg-white rounded-[5px] border border-solid border-[#EAEAEA] lg:border-black/50 disabled:opacity-40 right-[68%]">
                  <Icon
                    size={24}
                    id="ChevronRight"
                    strokeWidth={3}
                    class="rotate-180"
                  />
                </Slider.PrevButton>
              </div>
              <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="absolute flex items-center justify-center text-neutral-800 w-8 h-8 lg:bg-white rounded-[5px] border border-solid border-[#EAEAEA] lg:border-black/50 disabled:opacity-40 left-[68%]">
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
      </div>
    </section>
  );
}
