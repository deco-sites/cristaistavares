import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    link: ImageWidget;
    description: string;
  };
  title?: HTMLWidget;
  subtitle?: HTMLWidget;
}

export default function GridImage({ image, title, subtitle }: Props) {
  return (
    <div class="w-[227px] h-[270px] relative flex flex-col bg-base-100 shadow-xl image-full">
      <figure>
        <Image
          src={image.link}
          alt={image.description}
          width={227}
          height={270}
          loading="lazy"
        />
      </figure>
      <div class="absolute flex flex-col items-center justify-center mt-[90px] px-8">
        <div class="w-full h-full flex flex-col text-center items-center justify-center gap-4">
          <div class="flex items-center justify-center">
            <h2
              class="text-center"
              dangerouslySetInnerHTML={{ __html: title ?? ""}}
            />
          </div>
          <div class="flex items-center justify-center">
            <p
              class="font-normal"
              dangerouslySetInnerHTML={{ __html: subtitle ?? ""}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
