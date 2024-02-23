import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  productPrice?: number;
  pixPrice?: number;
  priceCurrency: string;
  cardsPrices?: { billingDuration?: number; billingIncrement?: number }[];
}

export default function PaymentsDetails(
  { productPrice, pixPrice, priceCurrency, cardsPrices }: Props,
) {
  const discountValue = Math.round((productPrice ?? 0) - (pixPrice ?? 0));
  const discountPercentage = Math.round(
    discountValue * 100 / (productPrice ?? 0),
  );

  console.log(cardsPrices);

  return (
    <>
      <a
        href="#formas-de-pagamentos"
        aria-label="abrir mais formas de pagamentos"
        class="flex w-full"
      >
        <div class="flex items-center w-[150px] px-3 py-2 cursor-pointer border rounded-md text-black text-sm">
          +formas de pagamento
        </div>
      </a>

      <div
        class="modal"
        role="dialog"
        id="formas-de-pagamentos"
        aria-label="modal"
      >
        <div class="modal-box place-items-center lg:w-[325px] border bg-[#f2f2f2] rounded-lg">
          <div class="flex flex-col h-full w-full gap-6">
            <div class="flex justify-between items-center w-full">
              <h2 class="font-bold">Formas de pagamento</h2>

              <div class="modal-action">
                <a href="#">X</a>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 w-full h-full">
              {pixPrice && pixPrice > 0 && (
                <div class="flex items-center justify-between w-full rounded-md shadow-lg h-[56px] px-4">
                  <Icon
                    id="Pix"
                    width={120}
                    height={24}
                    strokeWidth={0.75}
                    loading="lazy"
                  />

                  <div class="flex items-center justify-center gap-4">
                    {discountPercentage > 0 && (
                      <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 z-30 rounded-md text-sm">
                        {discountPercentage}% OFF
                      </span>
                    )}
                    <span class="text-emerald-500 font-bold text-sm">
                      {formatPrice(pixPrice, priceCurrency)}
                    </span>
                  </div>
                </div>
              )}

              <div class="flex flex-col gap-4 w-full h-full rounded-md shadow-lg px-4 py-3">
                <div class="flex items-center gap-2">
                  <Icon
                    id="CreditCard"
                    size={20}
                    strokeWidth={2}
                    loading="lazy"
                  />
                  <h4 class="font-bold">Cartão de Crédito</h4>
                </div>

                <span>Condições de pagamento</span>

                <ul class="flex flex-col gap-1.5">
                  {cardsPrices?.map((item) => (
                    <li class="flex items-center justify-between w-full text-sm border-b pb-1">
                      <span class="flex items-center justify-center gap-1">
                        {item.billingDuration}x de R$ {item.billingIncrement}
                      </span>

                      <span>sem juros</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
