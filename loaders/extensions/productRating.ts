import type { Product } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

export interface Props {
  average: number;
  totalCount: number;
}

/**
 * @title Get the Product Rating
 */
export default function productRating(
  { average, totalCount }: Props,
): ExtensionOf<Product | null> {
  return (p: Product | null) => {
    if (!p) return null;

    return {
      ...p,
      average,
      totalCount,
    };
  };
}
