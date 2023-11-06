import Avatar from "$store/components/ui/Avatar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const translate: Record<string, string> = {
  "unico": "único",
};

const translateFilters: Record<string, string> = {
  "Departments": "Departamentos",
  "Categories": "Categorias",
  "Brands": "Marcas",
  "PriceRanges": "Faixas de Preço",
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm capitalize">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={translate[value] || value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <div class="flex flex-col gap-2">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <div class="flex flex-col gap-4">
            <div class="collapse">
              <input
                type="checkbox"
                name="pdc-filters"
                class="min-h-[0px]"
                aria-label="Filtros"
                checked={true}
              />
              <div class="collapse-title flex justify-between cursor-pointer min-h-[0px] pl-0">
                <span class="flex content-center flex-wrap h-9">
                  {translateFilters[filter.label] || filter.label}
                </span>
                <div class="flex content-center flex-wrap">
                  <Icon
                    class="h-[19px] w-[19px] transition-all duration-500"
                    width={19}
                    height={19}
                    id="ChevronDown"
                  />
                </div>
              </div>
              <div class="collapse-content transition-all duration-700 pt-1 pl-0">
                <FilterValues {...filter} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Filters;
