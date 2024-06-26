import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: Product[];
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

export default function SimilarsGrid({ products }: Props) {
  if (!products) return null;

  function handleClick() {
    const content = document.getElementById("toggle-expand-products");

    if (!content) return;

    content.addEventListener("click", () => {
      const productsContent = document.getElementById("view-more-products")!;

      if (content.innerText === "Ver menos") {
        content.innerText = "Ver mais cores";
        productsContent.classList.add("max-h-[180px]", "overflow-hidden");
      } else {
        content.innerText = "Ver menos";
        productsContent.classList.remove("max-h-[180px]", "overflow-hidden");
      }
    });
  }

  return (
    <>
      <div
        id="view-more-products"
        class="flex flex-wrap gap-x-2 gap-y-1.5 items-center max-h-[180px] overflow-hidden"
      >
        {products?.map(({ image: images, url, isVariantOf, name }) => {
          const [front] = images ?? [];

          return (
            <a
              title={isVariantOf?.name ?? name}
              href={url && relative(url)}
              aria-label="change color"
              class="flex items-center justify-center border border-gray-300 rounded-xl w-14 h-14 p-1"
            >
              <img
                src={front.url}
                alt={front.description || "Imagem de Cores Similares"}
                width={52}
                height={52}
              />
            </a>
          );
        })}
      </div>

      {products.length > 21 && (
        <div
          id="toggle-expand-products"
          aria-label="view more products"
          class="flex items-center justify-center p-2 bg-dark-pink text-white w-[140px] rounded-[3.5px] cursor-pointer"
        >
          Ver mais cores
        </div>
      )}

      <script
        defer
        dangerouslySetInnerHTML={{ __html: `(${handleClick.toString()})()` }}
      />
    </>
  );
}
