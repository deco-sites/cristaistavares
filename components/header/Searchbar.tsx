import { lazy, Suspense } from "preact/compat";

import { useUI } from "$store/sdk/useUI.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

import LazySearchbar from "$store/components/search/Searchbar.tsx";

export interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <div class="w-full md:max-w-[80%]">
      <LazySearchbar {...searchbar} />
    </div>
  );
}

export default Searchbar;
