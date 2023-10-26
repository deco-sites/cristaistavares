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
    <section class="w-full h-full flex flex-col items-center justify-center py-[50] px-5">
      <div class="flex flex-col text-center pb-5 ">
        <div class="">
          <h1 class="text-xl font-medium">{title}</h1>
        </div>
        <a href={description.link ?? "#"}>
          <p class="text-sm font-bold hover:underline cursor-pointer">
            {description.label}
          </p>
        </a>
      </div>
      <div class="w-full h-full flex flex-wrap items-center justify-center gap-5">
        {cards?.map((card) => (
          <div class="flex items-center justify-center w-[295px] h-[368px]">
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
