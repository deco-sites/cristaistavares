import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @format html
   */
  title: string;

  cards?: Array<{
    image: {
      icon: ImageWidget;
      alt?: string;
    };

    /**
     * @format html
     */
    description: HTMLWidget;

    descHover?: string;
  }>;

  isSlider?: boolean;
  interval?: number;
}

function Dots({ cards, interval = 0 }: Pick<Props, "cards" | "interval">) {
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
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {cards?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div>
                <div
                  class="w-3 h-3 rounded-full group-disabled:animate-progress bg-gradient-to-r from-dark-pink from-[length:var(--dot-progress)] to-black to-[length:var(--dot-progress)]"
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

export default function InfoSection(
  { title, cards, isSlider = false, interval }: Props,
) {
  const id = useId();

  return (
    <section class="flex-grow flex items-center justify-center mt-[30px] lg:mt-14">
      <div class="flex flex-col max-w-[1500px] items-center justify-center">
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          class="text-center lg:text-xl font-medium text-black"
        />

        {isSlider
          ? (
            <div
              id={id}
              class="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 mt-6 lg:mt-8 cursor-pointer"
            >
              <Slider class="carousel carousel-center w-full">
                {cards?.map((card, index) => (
                  <>
                    <Slider.Item
                      index={index}
                      class="carousel-item w-full items-center justify-center lg:group lg:relative lg:flex gap-1"
                    >
                      <div class="lg:absolute hidden group-hover:lg:flex p-4 bg-white items-center justify-center text-sm translate-y-10 shadow-2xl rounded-lg w-48">
                        {card.descHover}
                      </div>
                      <Image
                        src={card.image.icon}
                        alt={card.image.alt}
                        width={26}
                        height={26}
                        loading="lazy"
                      />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: card.description || "",
                        }}
                      />
                    </Slider.Item>
                  </>
                ))}
              </Slider>

              <Dots cards={cards} interval={interval} />

              <SliderJS
                rootId={id}
                infinite
                scroll="smooth"
                interval={interval && interval * 1e3}
              />
            </div>
          )
          : (
            <ul class="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 mt-8 cursor-pointer">
              {cards?.map((card) => (
                <>
                  <li class="lg:group lg:relative flex items-center gap-1">
                    <div class="lg:absolute hidden group-hover:lg:flex p-4 bg-white items-center justify-center text-sm translate-y-10 shadow-2xl rounded-lg w-48">
                      {card.descHover}
                    </div>
                    <Image
                      src={card.image.icon}
                      alt={card.image.alt}
                      width={26}
                      height={26}
                      loading="lazy"
                      class="w-[26px] h-[26px]"
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: card.description || "",
                      }}
                    />
                  </li>
                </>
              ))}
            </ul>
          )}
      </div>
    </section>
  );
}
