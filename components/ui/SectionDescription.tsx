import type { HTMLWidget } from "apps/admin/widgets.ts";
import Description from "$store/islands/SectionDescription.tsx";

export interface Props {
  title?: HTMLWidget;
  description?: HTMLWidget;
  textEndAt?: number;
  hasMostPaddingBottom?: boolean;
}

export default function SectionDescription(
  { title, description, textEndAt = 450, hasMostPaddingBottom = false }: Props,
) {
  return (
    <section
      class={`${
        hasMostPaddingBottom && "pb-4"
      } h-full flex flex-col items-center justify-center text-center gap-2 mt-[30px] md:mt-10 lg:mt-[30px] px-4 lg:px-0`}
    >
      <div>
        {title && (
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            class="text-base font-medium"
          />
        )}
      </div>
      {description && (
        <Description description={description} textEndAt={textEndAt} />
      )}
    </section>
  );
}
