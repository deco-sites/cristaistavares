import { useState } from "preact/hooks";

// Função para remover formatação de texto indesejada
function sanitizeDescription(description?: string) {
  if (description) {
    return description.replace(/<[^>]*>/g, "");
  }

  return "";
}

export interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  const [isToggle, setIsToggle] = useState(
    self.innerWidth >= 640 ? true : false,
  );

  // Remova a formatação indesejada da descrição antes de renderizá-la
  const sanitizedDescription = sanitizeDescription(description);

  const descriptionValue = isToggle
    ? sanitizedDescription
    : sanitizedDescription.substring(0, 50).concat("...");

  return (
    <div class="flex flex-col gap-2 w-full">
      <h1 class="text-sm font-bold">Descrição</h1>
      <div
        class="text-justify"
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
