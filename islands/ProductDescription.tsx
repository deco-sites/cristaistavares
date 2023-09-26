import { useState } from "preact/hooks";

export interface Props {
  description?: string;
}
export default function ProductDescription({ description }: Props) {
  const [isToggle, setIsToggle] = useState(
    self.innerWidth >= 640 ? true : false,
  );
  const descriptionValue = isToggle
    ? description
    : description?.substring(0, 50).concat("...");

  return (
    <div class="flex flex-col gap-2 w-full">
      <h1 class="text-sm font-bold">Descrição</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: descriptionValue ?? "",
        }}
      />
      {self.innerWidth < 640 && (
        <button
          title="Botão Ver mais"
          onClick={() => setIsToggle((prev) => !prev)}
          class="btn btn-success"
        >
          {!isToggle ? "Ver mais" : "Ver menos"}
        </button>
      )}
    </div>
  );
}
