import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  cards?: Array<{
    link: string;

    image: {
      icon: ImageWidget;
      alt?: string;
    };
  }>;
}

export default function PagesSection({ cards }: Props) {
  return (
    <section class="w-full h-full flex flex-row flex-wrap items-center justify-center gap-4 my-[30px]">
      {cards?.map((card) => (
        <div class="">
          <a href={card.link}>
            <Picture>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={"auto"}
                src={card.image.icon}
                width={335}
                height={205}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={"auto"}
                src={card.image.icon}
                width={298}
                height={202}
              />
              <img
                src={card.image.icon}
                alt={card.image.alt}
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
      ))}
    </section>
  );
}
