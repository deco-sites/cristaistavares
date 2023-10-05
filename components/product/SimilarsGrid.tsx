import { useState } from "preact/compat";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: Product[];
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

export default function SimilarsGrid({ products }: Props) {
  const [isViewMoreItemsActive, setIsViewMoreItemsActive] = useState(false);

  const displayAllProducts = isViewMoreItemsActive
    ? products
    : products?.slice(0, 27);

  return (
    <>
      <div class="flex flex-wrap gap-x-2 gap-y-1.5 items-center">
        {displayAllProducts?.map(({ image: images, url }) => {
          const [front] = images ?? [];

          return (
            <a
              href={url && relative(url)}
              class="flex items-center justify-center border border-gray-300 rounded-xl w-14 h-14 p-1"
            >
              <img
                src={front.url}
                alt={front.description}
                width={52}
                height={52}
              />
            </a>
          );
        })}
      </div>

      {!isViewMoreItemsActive && (
        <button
          title="view more products"
          onClick={() => setIsViewMoreItemsActive(true)}
          class="flex items-center justify-center p-2 bg-dark-pink text-white w-[140px] rounded-[3.5px]"
        >
          Ver mais cores
        </button>
      )}
    </>
  );
}