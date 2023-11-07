/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef, useState } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

const terms = [
  { term: "esmeralda" },
  { term: "vaso" },
  { term: "trouxinhas" },
  { term: "cachepots" },
  { term: "abajur" },
  { term: "verde esmeralda" },
  { term: "vasos grandes" },
  { term: "love" },
  { term: "daisy grafite" },
  { term: "trouxinhas" },
];

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const id = useId();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};

  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms &&
    (searchInputRef.current && searchInputRef.current.value.length > 0);

  const searchTerm = searchInputRef.current ? searchInputRef.current.value : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, searchTerm]);

  return (
    <div class="flex-grow flex flex-col relative z-[70]">
      <form
        id={id}
        action={action}
        class="flex flex-grow relative h-[40px] px-0 border-b border-b-dark-pink"
      >
        <input
          ref={searchInputRef}
          id={useId()}
          class="flex-grow w-[80%] outline-none placeholder-shown:sibling:hidden placeholder:text-xs md:placeholder:text-sm"
          aria-label="Barra de pesquisa"
          aria-expanded={showSuggestions ? "true" : "false"}
          name={name}
          defaultValue={query}
          onClick={() => setShowSuggestions(true)}
          onFocus={() => setShowSuggestions(true)}
          onInput={(e) => {
            setShowSuggestions(true);
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        {
          /* <button
          onClick={() => {
            setShowSuggestions(false);
          }}
        >
          <Icon id="XMark" size={16} strokeWidth={2} class="text-dark-pink" />
        </button> */
        }
        <button
          type="submit"
          class="btn-ghost bg-transparent"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={24}
                strokeWidth={0.01}
                class="text-dark-pink"
              />
            )}
        </button>
      </form>

      {showSuggestions && (
        <div
          ref={modal}
          class="flex flex-col lg:flex-row w-full gap-6 lg:divide-x-2 lg:divide-y-0 divide-y-2 absolute flex-grow top-10 lg:top-[52px] px-[15px] pt-2 lg:pt-0 rounded-md max-h-[375px] lg:max-h-[525px] bg-white lg:shadow-lg overflow-y-auto lg:overflow-y-hidden z-[9999999]"
        >
          {notFound
            ? (
              <span
                class="font-bold uppercase py-2"
                role="heading"
                aria-level={3}
              >
                Sem sugestões
              </span>
            )
            : (
              <>
                <div class="flex flex-col gap-6 pb-2">
                  <span
                    class="font-bold uppercase"
                    role="heading"
                    aria-level={3}
                  >
                    {!hasTerms ? "Termos mais buscados" : "Sugestões"}
                  </span>
                  <ul id="search-suggestion" class="flex flex-col gap-5">
                    {(!hasTerms ? terms : searches).map(({ term }, index) => (
                      <li class="flex items-center gap-2 hover:lg:scale-105 duration-100 transition">
                        {!hasTerms && terms && (
                          <span class="text-gray-500 text-sm">
                            {index + 1}º
                          </span>
                        )}
                        <a
                          href={`/s?q=${term}`}
                          class="flex gap-4 items-center"
                        >
                          {
                            /* <span>
                        <Icon
                          id="MagnifyingGlass"
                          size={24}
                          strokeWidth={0.01}
                        />
                      </span> */
                          }
                          <span class="text-sm">
                            {term}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  class={hasProducts
                    ? "flex flex-col pt-6 pb-1 md:pt-0 gap-6 lg:pl-3"
                    : "hidden"}
                >
                  <span
                    class="font-bold uppercase"
                    role="heading"
                    aria-level={3}
                  >
                    Produtos para {searchInputRef.current?.value}
                  </span>
                  <Slider class="carousel overflow-x-scroll">
                    {products?.slice(0, 3)?.map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item first:ml-4 last:mr-4 min-w-[160px] max-w-[160px] h-full"
                      >
                        <ProductCard
                          product={product}
                          platform={"vtex"}
                          isSearchbar={true}
                          resizeNameHeight={false}
                          layout={{
                            hide: {
                              productDescription: true,
                              cta: true,
                              skuSelector: true,
                              stars: true,
                            },
                            basics: {
                              contentAlignment: "Center",
                              oldPriceSize: "Small",
                            },
                          }}
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                  <a
                    href={`/s?q=${searchInputRef.current?.value}`}
                    class="text-black text-center underline py-3"
                  >
                    Veja mais produtos
                  </a>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
