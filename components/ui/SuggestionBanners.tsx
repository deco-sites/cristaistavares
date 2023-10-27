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
    <section class="w-full h-full flex flex-col items-center justify-center px-5 my-2">
      <div class="flex flex-col text-center pb-5 ">
        <div class="">
          <p class="text-xl font-medium">{title}</p>
        </div>
        <a href={description.link ?? "#"}>
          <p class="text-sm font-bold hover:underline cursor-pointer">
            {description.label}
          </p>
        </a>
      </div>
      <div class="w-full h-full grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-5">
        {cards?.map((card) => (
          <div class="flex items-center justify-center md:w-[295px] md:h-[368px]">
            <a href={card.link}>
              <img
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
