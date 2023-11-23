import Avatar from "$store/components/ui/Avatar.tsx";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";

import type { Product } from "apps/commerce/types.ts";

const newSkuId = (url: string | null) => {
  if (!url) return;

  const link = new URL(url);
  const skuId = link.searchParams.get("skuId");

  return skuId;
};

export default function SkuSelector(
  { link, value, url, product }: {
    link: string;
    value: string;
    url?: string;
    product: Product;
  },
) {
  const { selectedSku, setSku } = useSkuSelector();
  const skuId = newSkuId(selectedSku.value);

  const filteredProduct = product.isVariantOf?.hasVariant.filter((item) =>
    item.sku === skuId
  )[0];

  const productName = filteredProduct?.name || product.name;

  return (
    <li>
      <div onClick={() => setSku(link)}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value.toLowerCase()}
          isSelected={value.toLowerCase() ===
            (productName && productName.toLowerCase())}
        />
      </div>
    </li>
  );
}
