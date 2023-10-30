import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PaymentItemTop {
  image: ImageWidget;
  href?: string;
  description: string;
}

export interface PaymentItemBottom {
  image: ImageWidget;
  href?: string;
  description: string;
}

export default function PaymentMethods(
  { content }: {
    content?: {
      title?: string;
      items?: PaymentItemTop[];
      bottomItems?: PaymentItemBottom[];
    };
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="font-bold">{content.title}</span>}
          <div class="flex flex-col gap-3 lg:gap-8 items-center lg:items-start">
            <ul class="flex items-center gap-4 flex-wrap lg:max-w-[261px]">
              {content.items.map((item) => {
                return (
                  <li
                    title={item.description}
                  >
                    <div class="w-full h-full">
                      <img
                        src={item.image}
                        width={34}
                        height={34}
                        alt={item.description}
                        loading="lazy"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul class="flex items-center gap-4 flex-wrap">
              {content?.bottomItems?.map((item) => {
                return (
                  <li
                    class=""
                    title={item.description}
                  >
                    <div class="w-full h-full">
                      <img
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.description}
                        loading="lazy"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
