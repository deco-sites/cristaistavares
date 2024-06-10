import { useOffer } from "deco-sites/cristaistavares/sdk/useOffer.ts";
import type { AggregateOffer, Product } from "apps/commerce/types.ts";

export const useVariantPossibilities = (
  { url: productUrl, isVariantOf }: Product,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ additionalProperty = [], url, offers = [] }) => {
      if (!offers) return [];

      const { availability } = useOffer(offers as AggregateOffer);

      return additionalProperty.map((property) => ({
        property,
        url: availability === "https://schema.org/InStock"
          ? url
          : "unavailable",
      }));
    })
    .filter((x) => x.url) // Filtra aqueles que não têm URL (os que não estão em estoque)
    .filter((x) => x.property.valueReference === "SPECIFICATION") // Remova esta linha para permitir outras propriedades além de especificações
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce((acc, { property, url }) => {
    const { name = "", value = "" } = property;

    if (!acc[name]) {
      acc[name] = {};
    }

    if (!acc[name][value]) {
      acc[name][value] = [];
    }

    if (url) {
      // Prefere a URL atual para facilitar a implementação do seletor
      url === productUrl
        ? acc[name][value].unshift(url)
        : acc[name][value].push(url);
    }

    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return possibilities;
};
