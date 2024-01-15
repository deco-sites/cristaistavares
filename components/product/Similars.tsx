import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SimilarsGrid from "$store/components/product/SimilarsGrid.tsx";

import { useId } from "$store/sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: Product[];
  type?: "slider" | "normal";
  preload?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function filterSimilarProducts(products: Product[]) {
  const uniqueNames = new Set();
  const filteredProducts = [];

  for (const product of products) {
    const name = product?.isVariantOf?.name;

    if (!uniqueNames.has(name)) {
      uniqueNames.add(name);
      filteredProducts.push(product);
    }
  }

  return filteredProducts;
}

export default function Similars(
  { products, type = "slider", preload }: Props,
) {
  if (!products || products.length === 0) return null;

  const filteredProducts = filterSimilarProducts(products);

  if (type === "slider") {
    return <SimilarsSlider products={filteredProducts} preload={preload} />;
  }

  return <SimilarsGrid products={filteredProducts} />;
}

function SimilarsSlider(
  { products, preload }: { products?: Product[]; preload?: boolean },
) {
  if (!products) return null;

  const id = useId();

  return (
    <div
      id={id}
      class="max-w-max grid grid-cols-[48px_1fr_48px]"
    >
      <Slider class="carousel gap-1.5 col-span-full row-start-2 row-end-5 mx-4">
        {products?.map(({ image: images, url }, index) => {
          const [front] = images ?? [];

          return (
            <Slider.Item
              index={index}
              class="carousel-item w-16"
            >
              <a
                href={url && relative(url)}
                aria-label="change color"
                class="flex items-center justify-center border border-gray-300 rounded-xl w-16 h-16 p-1"
              >
                <img
                  src={front.url}
                  alt={front.description || "Imagem de Cores Similares"}
                  width={60}
                  height={60}
                  loading={preload ? index < 4 ? "eager" : "lazy" : "lazy"}
                />
              </a>
            </Slider.Item>
          );
        })}
      </Slider>

      <>
        <div class="relative block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="absolute right-[60%] rotate-180 -translate-y-3 disabled:opacity-40">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="relative block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="absolute left-[60%] -translate-y-3 disabled:opacity-40">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
    </div>
  );
}
