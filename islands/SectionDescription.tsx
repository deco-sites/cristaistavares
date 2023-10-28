import { useState } from "preact/hooks";

export interface Props {
  description: string;
  textEndAt?: number;
}
export default function SectionDescription(
  { description, textEndAt = 450 }: Props,
) {
  const [isToggle, setIsToggle] = useState(false);

  const descriptionValue = isToggle
    ? description
    : description.substring(0, textEndAt).concat("...");

  return (
    <div class="lg:max-w-[1240px] flex flex-col gap-4">
      <p
        dangerouslySetInnerHTML={{ __html: descriptionValue ?? "" }}
        class="text-[15px] leading-5 font-normal"
      />
      <button
        title="Botão Ver mais"
        onClick={() => setIsToggle((prev) => !prev)}
        class="underline text-black hover:text-dark-pink"
      >
        {!isToggle ? "Ver mais" : "Ver menos"}
      </button>
    </div>
  );
}
