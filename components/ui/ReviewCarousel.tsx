import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Review {
  image: ImageWidget;
  description: string;
}

export interface Props {
  reviews: Review[];
  interval: number;
  /**
   * @default true
   */
  hasMarginLeft?: boolean;
}

function ReviewCard({ image, description }: Review) {
  return (
    <Image
      src={image}
      alt={description}
      width={252}
      height={204}
      loading="lazy"
    />
  );
}

export default function ReviewCarousel(
  { reviews, interval = 0, hasMarginLeft = true }: Props,
) {
  const id = useId();

  return (
    <section class="flex items-center justify-center bg-whitesmoke w-full h-full min-h-[204px] mb-12 py-3">
      <div
        class={`flex flex-col items-center justify-center w-full h-full ${
          hasMarginLeft && "lg:ml-[270px]"
        }`}
      >
        <div class="flex items-center justify-center px-3 py-2 w-full max-w-[400px] text-center mb-4 text-lg bg-dark-pink text-white -translate-y-8">
          Depoimento dos clientes
        </div>

        <div
          id={id}
          class="container max-w-[626px] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
        >
          <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
            {reviews.map((review, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[252px]"
              >
                <ReviewCard {...review} />
              </Slider.Item>
            ))}
          </Slider>

          <>
            <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 -top-10 bg-base-100">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 -top-10 bg-base-100">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
            scroll="smooth"
          />
        </div>
      </div>
    </section>
  );
}
