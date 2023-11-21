import { useState } from "preact/hooks";

export interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  const [isToggle, setIsToggle] = useState(
    self.innerWidth >= 640 ? true : false,
  );

  if (!description) return null;

  const descriptionValue = isToggle
    ? description
    : description.substring(0, 150).concat("...");

  return (
    <div class="flex flex-col gap-2 w-full">
      <h1 class="text-sm font-bold">Descrição</h1>
      {self.innerWidth < 640
        ? (
          <div
            class="text-justify"
            dangerouslySetInnerHTML={{
              __html: descriptionValue ?? "",
            }}
          />
        )
        : (
          <div
            class="text-justify"
            dangerouslySetInnerHTML={{
              __html: description ?? "",
            }}
          />
        )}
      {self.innerWidth < 640 && (
        <button
          title="Botão Ver mais"
          onClick={() => setIsToggle((prev) => !prev)}
          class="underline text-black hover:text-dark-pink pb-0.5"
        >
          {!isToggle ? "Ver mais" : "Ver menos"}
        </button>
      )}
    </div>
  );
}
