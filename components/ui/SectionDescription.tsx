import type { HTMLWidget } from "apps/admin/widgets.ts";
import Description from "$store/islands/SectionDescription.tsx";

export interface Props {
  title: HTMLWidget;
  description: HTMLWidget;
  textEndAt?: number;
}

export default function SectionDescription(
  { title, description, textEndAt = 450 }: Props,
) {
  return (
    <section class="h-full flex flex-col items-center justify-center text-center gap-2 mt-[30px] px-4 lg:px-0">
      <div>
        <h2
          dangerouslySetInnerHTML={{ __html: title }}
          class="text-base font-medium"
        />
      </div>
      <Description description={description} textEndAt={textEndAt} />
    </section>
  );
}
