import { useCart } from "apps/wake/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  subscription?: {
    subscriptionGroupId: number;
    recurringTypeId: number;
  };
  customization?: { customizationId: number; value: string }[];
}

function AddToCartButton(props: Props) {
  const { addItem } = useCart();
  const onAddItem = () =>
    addItem({
      productVariantId: Number(props.productID),
      quantity: 1,
      customization: props.customization!,
      subscription: props.subscription!,
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
