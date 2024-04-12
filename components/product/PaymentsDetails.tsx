import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  productPrice?: number;
  pixPrice?: number;
  priceCurrency: string;
  cardsPrices?: { billingDuration?: number; billingIncrement?: number }[];
  ticketPrice?: number;
}

export default function PaymentsDetails(
  { productPrice, pixPrice, priceCurrency, cardsPrices, ticketPrice }: Props,
) {
  const discountValue = Math.round((productPrice ?? 0) - (pixPrice ?? 0));
  const discountPercentage = Math.round(
    discountValue * 100 / (productPrice ?? 0),
  );

  return (
    <>
      <label for="my_modal_7" class="flex w-full">
        <span class="flex items-center px-3 py-2 cursor-pointer border rounded-md text-black text-sm">
          Opções de Pagamento
        </span>
      </label>

      <input type="checkbox" id="my_modal_7" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box place-items-center lg:w-[500px] border bg-[#f2f2f2] rounded-lg">
          <div class="flex flex-col h-full w-full gap-6">
            <div class="flex justify-between items-center w-full">
              <h2 class="font-bold">Opções de Pagamento</h2>

              <div class="modal-action">
                <label class="modal-backdrop" for="my_modal_7">X</label>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 w-full h-full">
              {pixPrice && pixPrice > 0 && (
                <div class="flex items-center justify-between w-full rounded-md shadow-lg h-[56px] px-4">
                  <Icon
                    id="Pix"
                    width={65}
                    height={24}
                    strokeWidth={0.75}
                    loading="lazy"
                  />

                  <div class="flex items-center justify-center gap-4">
                    {discountPercentage > 0 && (
                      <span class="flex items-center justify-center w-full px-2 py-0.5 text-white bg-red-500 z-30 rounded-md text-xs lg:text-sm">
                        {discountPercentage}% OFF
                      </span>
                    )}
                    <span class="text-emerald-500 font-bold text-sm">
                      {formatPrice(pixPrice, priceCurrency)}
                    </span>
                  </div>
                </div>
              )}

              {cardsPrices && cardsPrices.length > 0 && (
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
                          <b>{item.billingDuration}x</b> de{" "}
                          <b>R$ {item.billingIncrement}</b>
                        </span>

                        <span class="font-bold">sem juros</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ticketPrice && ticketPrice > 0 && (
                <div class="flex items-center justify-between w-full rounded-md shadow-lg h-[56px] px-4">
                  <div class="flex items-center gap-2">
                    <Icon
                      id="Discount"
                      size={20}
                      strokeWidth={2}
                      loading="lazy"
                    />
                    <h4 class="font-bold">Boleto</h4>
                  </div>

                  <div class="flex items-center">
                    <span class="font-bold text-sm">
                      {formatPrice(ticketPrice, priceCurrency)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <label class="modal-backdrop" for="my_modal_7" />
      </div>
    </>
  );
}
