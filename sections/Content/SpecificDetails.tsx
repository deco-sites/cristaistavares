import { Section } from "deco/blocks/section.ts";

export interface Props {
  sections: Section[];
}

export default function SpecificDetails({ sections }: Props) {
  if (!sections) return null;

  return (
    <div class="flex flex-col gap-4 max-w-[1240px] mx-auto mt-4 sm:mt-6 mb-4">
      {sections?.map((section, index) => {
        const { Component, props } = section;
        return <Component key={index} {...props} />;
      })}
    </div>
  );
}
