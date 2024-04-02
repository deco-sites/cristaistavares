import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";

export default function Installment() {
  const { cart } = useCart();

  console.log(cart?.value?.paymentData);

  return (
    <div class="flex justify-between items-center w-full">
      <span class="text-sm">Parcelamento</span>

      <span class="text-sm">
        R$ 100,00
      </span>
    </div>
  );
}
