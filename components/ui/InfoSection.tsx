import Image from "apps/website/components/Image.tsx";
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
}

export default function InfoSection({ title, cards }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-center mt-14 mb-8">
      <div class="flex flex-col max-w-[1500px] items-center justify-center">
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          class="text-center lg:text-xl font-medium text-black"
        />
        <ul class="flex items-center justify-center gap-6 w-full flex-wrap mt-8 cursor-pointer">
          {cards?.map((card) => (
            <>
              <li class="group relative flex gap-1">
                <div class="absolute hidden group-hover:lg:flex p-4 bg-white items-center justify-center text-sm translate-y-10 shadow-2xl rounded-lg w-48">
                  {card.descHover}
                </div>
                <Image
                  src={card.image.icon}
                  alt={card.image.alt}
                  width={25}
                  height={25}
                  loading="lazy"
                />
                <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
              </li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
}
