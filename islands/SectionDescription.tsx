import { useState } from "preact/hooks";

export interface Props {
  description: string;
}
export default function SectionDescription({ description }: Props) {
  const [isToggle, setIsToggle] = useState(false);

  const descriptionValue = isToggle
    ? description
    : description.substring(0, 50).concat("...");

  return (
    <div class="max-w-[1240px] flex flex-col gap-4">
      <p
        dangerouslySetInnerHTML={{ __html: descriptionValue ?? "" }}
        class="text-[15px] leading-5 font-normal"
      />
      <button
        title="Botão Ver mais"
        onClick={() => setIsToggle((prev) => !prev)}
        class="btn btn-success"
      >
        {!isToggle ? "Ver mais" : "Ver menos"}
      </button>
    </div>
  );
}
