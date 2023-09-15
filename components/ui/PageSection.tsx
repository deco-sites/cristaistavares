import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

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
    <section class="w-full h-full flex flex-row flex-wrap items-center justify-center gap-4 my-10">
      {cards?.map((card) => (
        <div class="">
          <a href={card.link}>
            <Image
              src={card.image.icon}
              alt={card.image.alt}
              width={298}
              height={202}
              loading="lazy"
            />
          </a>
        </div>
      ))}
    </section>
  );
}
