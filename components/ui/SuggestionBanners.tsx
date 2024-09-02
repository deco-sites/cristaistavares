import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  description: {
    label: string;
    link: string;
  };
  cards?: Array<{
    image: {
      icon: ImageWidget;
      alt?: string;
    };
    link?: string;
  }>;
}

export default function CategoryList({ title, description, cards }: Props) {
  return (
    <section class="flex-grow flex flex-col items-center justify-center px-5 my-2">
      <div class="flex flex-col text-center pb-5">
        <div class="">
          <p class="text-xl font-medium">{title}</p>
        </div>
        <a href={description.link ?? "#"}>
          <p class="text-sm font-bold hover:underline cursor-pointer">
            {description.label}
          </p>
        </a>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5">
        {cards?.map((card) => (
          <div class="flex items-center justify-center lg:h-[368px]">
            <a href={card.link}>
              <Image
                src={card.image.icon}
                alt={card.image.alt}
                width={296}
                height={368}
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
