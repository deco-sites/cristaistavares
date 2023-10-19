import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    productsQuantity?: number;
    isListModeActive?: boolean;
  };

function applySort() {
  const urlSearchParams = new URLSearchParams(window.location.search);

  if (!window.location.href.includes("grid")) {
    urlSearchParams.set("layout", "grid");
  } else {
    urlSearchParams.delete("layout");
  }

  window.location.search = urlSearchParams.toString();
}

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    productsQuantity,
    isListModeActive,
  }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 lg:mb-0 lg:p-0 lg:gap-4 lg:flex-row lg:h-[53px] lg:border-b lg:border-base-200">
        <div class="flex flex-row items-center lg:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-col gap-2 items-center justify-center text-center font-bold py-2">
          <h1 class="text-xl block lg:hidden">Muranos</h1>
          <span class="text-sm">{productsQuantity} produtos</span>
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 lg:gap-4 lg:border-none">
          <div class="hidden lg:flex items-center gap-4">
            <button
              onClick={applySort}
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(3).fill("").map((_) => (
                <div
                  class={`${
                    !isListModeActive && "bg-black"
                  } border border-black w-4 h-4`}
                />
              ))}
            </button>

            <button
              onClick={applySort}
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(4).fill("").map((_) => (
                <div
                  class={`${
                    isListModeActive && "bg-black"
                  } border border-black w-4 h-4`}
                />
              ))}
            </button>
          </div>
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost lg:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
