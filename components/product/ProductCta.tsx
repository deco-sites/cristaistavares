import { useState } from "preact/compat";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { Props } from "$store/components/product/AddToCartButton/vtex.tsx";

export default function ProductCta(
  { seller, discount, name, price, productGroupID, productID }: Props,
) {
  const [quantity, setQuantity] = useState(1);

  const cta = (
    <AddToCartButtonVTEX
      discount={discount}
      name={name}
      price={price}
      productGroupID={productGroupID}
      productID={productID}
      seller={seller}
      quantity={quantity}
    />
  );

  return (
    <>
      <QuantitySelector quantity={quantity} onChange={setQuantity} />
      {cta}
    </>
  );
}
