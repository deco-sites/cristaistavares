import { Section } from "deco/blocks/section.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { SectionProps } from "deco/mod.ts";

export interface Props {
  sections: Section[];
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function SpecificDetails(props: SectionProps<typeof loader>) {
  if (!props || !props.sections) return null;

  return (
    <div class="flex flex-col gap-4 max-w-[1240px] mx-auto mt-4 sm:mt-6 mb-4">
      {props.sections?.map((section, index) => {
        const { Component, props } = section;
        return <Component key={index} {...props} />;
      })}
    </div>
  );
}

export const loader = (props: Props) => {
  const additionalProperties = props.page?.product.additionalProperty ?? [];
  const hasMuranosValue = additionalProperties.find((item) =>
    item.value?.toLowerCase() === "muranos"
  );

  if (hasMuranosValue) {
    return props;
  }

  return null;
};
