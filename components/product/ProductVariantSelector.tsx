import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossibilities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);
  const order: string[] = ["PP", "P", "M", "G", "GG", "ÚN"];

  const sortedPossibilities: Record<string, Record<string, string[]>> = Object
    .keys(
      possibilities,
    ).reduce((acc, key) => {
      const sortedValues: Record<string, string[]> = Object.fromEntries(
        Object.entries(possibilities[key]).sort(
          ([a], [b]) => order.indexOf(a) - order.indexOf(b),
        ),
      );
      return { ...acc, [key]: sortedValues };
    }, {});

  return (
    <div class="mt-4 px-4">
      <ul className="flex flex-col gap-4">
        {Object.entries(sortedPossibilities).map(([name, values]) => (
          <li className="flex flex-col gap-2" key={name}>
            <span className="text-sm">{name}</span>
            <ul className="flex flex-row gap-3">
              {Object.entries(values).map(([value, links]) => {
                return (
                  <li key={value}>
                    <button
                      f-partial={links[0]}
                      f-client-nav
                      disabled={links[0] === "unavailable"}
                    >
                      <Avatar
                        content={value}
                        variant={links[0] === url
                          ? "active"
                          : links[0] !== "unavailable"
                          ? "default"
                          : "disabled"}
                        isSelected={value.toUpperCase() ===
                          (product && product.name
                            ? product.name.toUpperCase()
                            : null)}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VariantSelector;
