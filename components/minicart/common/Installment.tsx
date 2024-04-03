import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  locale: string;
  currency: string;
}

export default function Installment({ locale, currency }: Props) {
  const { cart } = useCart();

  const { count, total } =
    cart?.value?.paymentData?.installmentOptions?.[2]?.installments?.slice(-1)
      ?.[0] ?? {};

  if (!count || !total) return null;

  const installmentPrice = ((total / 100) / count);

  return (
    <div class="flex justify-between items-center w-full">
      <span class="text-sm">Parcelamento</span>

      <span class="text-sm">
        até {count}x de {formatPrice(installmentPrice, currency, locale)}
      </span>
    </div>
  );
}
