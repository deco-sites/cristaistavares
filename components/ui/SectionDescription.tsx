import type { RichText } from "apps/admin/widgets.ts";
import { useScript } from "deco/hooks/useScript.ts";

export interface Props {
  title?: RichText;
  description?: RichText;
  hasMostPaddingBottom?: boolean;
}

export default function SectionDescription(
  { title, description, hasMostPaddingBottom = false }: Props,
) {
  function handleClick() {
    const content = document.getElementById("toggle-read-more")!;

    content.addEventListener("click", () => {
      const description = document.getElementById("read-more")!;

      if (content.innerText === "Ver menos") {
        content.innerText = "Ver mais";
        description.classList.add("max-h-[2.6em]", "overflow-hidden");
      } else {
        content.innerText = "Ver menos";
        description.classList.remove("max-h-[2.6em]", "overflow-hidden");
      }
    });
  }

  return (
    <>
      <section
        className={`${
          hasMostPaddingBottom && "pb-4"
        } h-full flex flex-col items-center justify-center text-center gap-2 mt-[30px] md:mt-10 lg:mt-[30px] px-4 lg:px-0`}
      >
        <div>
          {title && (
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-base font-medium"
            />
          )}
        </div>
        {description && (
          <div className="lg:max-w-[1240px] flex flex-col gap-4">
            <div
              id="read-more"
              class="text-[15px] leading-5 font-normal max-h-[2.6em] overflow-hidden"
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            />

            <div
              id="toggle-read-more"
              aria-label="expand content"
              class="read-more-label underline cursor-pointer"
            >
              Ver mais
            </div>
          </div>
        )}
      </section>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleClick) }}
      />
    </>
  );
}
