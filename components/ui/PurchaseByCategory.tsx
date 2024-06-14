import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  title: string;
  interval?: number;
  cards?: Array<{
    image: {
      icon: ImageWidget;
      alt?: string;
      isBorder?: boolean;
    };

    link?: string;
    description: string;
  }>;
}

export default function CategoryList({ title, cards, interval }: Props) {
  const id = useId();

  return (
    <section class="flex-grow h-[678px] lg:h-full flex items-center justify-center bg-[#f4f4f4]">
      <div>
        <div class="flex items-center justify-center h-[28px] text-center mt-2">
          <h2 class="text-lg lg:text-xl font-bold">{title}</h2>
        </div>
        <div
          id={id}
          class="xl:container grid grid-cols grid-cols-[48px_1fr_48px]"
        >
          <Slider class="carousel carousel-center gap-[14px] col-span-full row-start-2 row-end-5">
            {cards?.map((card, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[296px] h-[581px] flex flex-col items-center justify-center first:pl-6 last:pr-6 lg:first:pl-0 lg:last:pr-0"
              >
                <div class="w-[295px] h-[521px]">
                  <a href={card.link}>
                    <Image
                      class={`${
                        card.image.isBorder ? "rounded-full" : "rounded-none"
                      }`}
                      src={card.image.icon}
                      alt={card.image.alt}
                      width={296}
                      height={523}
                      loading="lazy"
                    />
                  </a>
                </div>
                <div class="w-[296px] h-[28px] mt-2">
                  <h3 class="text-lg font-semibold text-center">
                    {card.description}
                  </h3>
                </div>
              </Slider.Item>
            ))}
          </Slider>

          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </div>
      </div>
    </section>
  );
}
