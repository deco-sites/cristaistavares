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
    <section class="flex-grow flex items-center justify-center mt-14 mb-8">
      <div class="flex flex-col max-w-[1500px] items-center justify-center">
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          class="text-center lg:text-xl font-medium text-black"
        />
        <ul class="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 mt-8 cursor-pointer">
          {cards?.map((card) => (
            <>
              <li class="lg:group lg:relative flex gap-1">
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
                <p dangerouslySetInnerHTML={{ __html: card.description || "" }} />
              </li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
}
