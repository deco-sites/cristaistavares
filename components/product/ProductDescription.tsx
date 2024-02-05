export interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  if (!description) return null;

  function handleClick() {
    const content = document.getElementById("toggle-read-more")!;

    content.addEventListener("click", () => {
      const description = document.getElementById("read-more")!;

      if (content.innerText === "Ver menos") {
        content.innerText = "Ver mais";
        description.classList.add("max-h-[10.5em]", "overflow-hidden");
      } else {
        content.innerText = "Ver menos";
        description.classList.remove("max-h-[10.5em]", "overflow-hidden");
      }
    });
  }

  return (
    <>
      <div class="flex flex-col gap-2 w-full">
        <h2 class="text-sm font-bold">Descrição</h2>

        {/* Mobile Description */}
        <div
          id="read-more"
          class="block md:hidden text-justify max-h-[10.5em] overflow-hidden"
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        />

        {/* Desktop Description */}
        <div
          class="hidden md:block text-justify"
          dangerouslySetInnerHTML={{
            __html: description ?? "",
          }}
        />

        <div
          id="toggle-read-more"
          aria-label="expand content"
          class="flex md:hidden items-center read-more-label underline cursor-pointer"
        >
          Ver mais
        </div>
      </div>

      <script
        defer
        dangerouslySetInnerHTML={{ __html: `(${handleClick.toString()})()` }}
      />
    </>
  );
}
