import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props{
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
  }>;
}

export default function InfoSection({ title, cards}: Props){
    return(
        <section class="w-full h-full flex items-center justify-center my-8">
            <div class="flex flex-col max-w-[1500px] items-center justify-center">
                    <h1 dangerouslySetInnerHTML={{ __html: title }} class="text-center lg:text-xl font-medium text-black"/>
                    <ul class="flex items-center justify-center gap-6 w-full flex-wrap mt-8">
                    {cards?.map((card) => (
                        <li class="flex gap-1">
                            <img src={card.image.icon} alt={card.image.alt} />
                            <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
                        </li>
                    ))}
                    </ul>
            </div>
        </section>
        )
}
