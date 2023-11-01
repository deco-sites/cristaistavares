import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: HTMLWidget;
  subTitle?: HTMLWidget;
  cards?: {
    link: string;
    image: {
      link: ImageWidget;
      description: string;
    };

    titleCategory: string;
  }[];
}

export default function LPCategoryCards({ title, subTitle, cards }: Props) {
  return (
    <section class="w-full h-full container max-w-[1240px] py-8 px-4">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="flex flex-col w-full text-center gap-2">
          <h1
            class="text-2xl text-white font-bold"
            dangerouslySetInnerHTML={{ __html: title || "" }}
          />
          <p
            class="text-sm text-white"
            dangerouslySetInnerHTML={{ __html: subTitle || "" }}
          />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full h-full items-center justify-center gap-4">
          {cards?.map((item) => (
            <a
              href={item.link}
              class="flex flex-col items-center justify-center"
            >
              <Image
                src={item.image.link}
                width={191}
                height={191}
                class="rounded-lg"
                alt={item.image.description}
              />
              <p class="w-[130px] min-h-[58px] text-lg text-center text-white font-semibold">
                {item.titleCategory}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
