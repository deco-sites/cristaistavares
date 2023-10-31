import type { HTMLWidget } from "apps/admin/widgets.ts";
import type { ImageWidget } from "apps/admin/widgets.ts"; 

export interface Props{
    title?: HTMLWidget;
    subTitle?: HTMLWidget;
    cards?: {
        image: {
            link: ImageWidget;
            description: string;
          };
          
        titleCategory: string;
    }[];
}

export default function LPCategoryCards( {title, subTitle, cards}: Props ) {
    return(
        <div class="w-full h-full bg-black">
            <section class="w-full h-full flex flex-col items-center justify-center">
                <div class="w-full text-center mt-4">
                    <h1 class="text-2xl text-white font-bold"
                    dangerouslySetInnerHTML={{ __html: title}}/>
                    <p class="text-sm text-white"
                    dangerouslySetInnerHTML={{ __html: subTitle}}/>
                    
                </div>
                <div class="w-full h-full flex flex-wrap items-center justify-center my-4 gap-4">
                    {cards?.map((item) => (
                        <div class="flex flex-col items-center justify-center">
                            <img src={item.image.link} alt="Imagem" width={140} height={150} class="rounded-lg w-[140px] h-[150px]" alt={item.image.description}/>
                            <p class="w-[130px] h-full text-lg text-center text-white font-semibold" >{item.titleCategory}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        )
}