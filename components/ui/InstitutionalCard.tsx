import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    link: ImageWidget;
    description: string;
  };

  title: HTMLWidget;
  subtitle: HTMLWidget;
}

export default function InstitutionalCard({ image, title, subtitle }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-center">
      <div class="w-full h-full flex items-center justify-center">
        <div class="min-w-[280px] h-full relative border-2 border-solid border-[#D9D9D9] flex flex-col items-center justify-center">
          <div class="absolute -top-[28px] bg-white w-[60px] h-[51px] pl-2">
            <Image
              src={image.link}
              alt={image.description}
              width={45}
              height={51}
              loading="lazy"
            />
          </div>
          <div class="flex flex-col items-center justify-center text-center w-[220px] mb-[30px]">
            <p
              class="text-2xl text-dark-pink my-6"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              class="text-[15px] my-[15px]"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
