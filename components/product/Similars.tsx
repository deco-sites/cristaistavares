import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: Product[];
  type?: "slider" | "normal";
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

export default function Similars({ products, type = "slider" }: Props) {
  if (!products || products.length === 0) return null;

  if (type === "slider") {
    return <SimilarsSlider products={products} />;
  }

  return (
    <div class="flex flex-wrap gap-x-2 gap-y-1.5 items-center">
      {products?.map(({ image: images, url }) => {
        const [front, back] = images ?? [];

        return (
          <a
            href={url && relative(url)}
            class="flex items-center justify-center border border-gray-300 rounded-xl w-14 h-14 p-1"
          >
            <img
              src={front.url}
              alt={front.description}
              width={52}
              height={52}
            />
          </a>
        );
      })}
    </div>
  );
}

function SimilarsSlider({ products }: { products?: Product[] }) {
  const id = useId();

  return (
    <div
      id={id}
      class="max-w-[480px] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
    >
      <Slider class="carousel gap-6 col-span-full row-start-2 row-end-5">
        {products?.map(({ image: images, url }, index) => {
          const [front, back] = images ?? [];

          return (
            <Slider.Item
              index={index}
              class="carousel-item w-20"
            >
              <a
                href={url && relative(url)}
                class="flex items-center justify-center border border-gray-300 rounded-xl w-20 h-20 p-1"
              >
                <img
                  src={front.url}
                  alt={front.description}
                  width={76}
                  height={76}
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </a>
            </Slider.Item>
          );
        })}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3 -translate-y-5">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3 -translate-y-5">
          <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
    </div>
  );
}
