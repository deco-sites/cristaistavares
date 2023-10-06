import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  shippingValue: number | null;
  setShippingValue: (value: number | null) => void;
}

function Shipping({ shippingValue, setShippingValue }: Props) {
  const { simulate, cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState("");

  return (
    <div class="flex justify-between items-center px-4 mt-1 w-full">
      <form
        class="flex items-center justify-center gap-2 w-full h-full"
        onSubmit={async (e) => {
          e.preventDefault();

          const text = cep;
          if (!text || cep === "") return;

          try {
            setLoading(true);

            const shippingValue = await simulate({
              items: items.map((item) => ({
                id: Number(item.id),
                quantity: item.quantity,
                seller: item.seller,
              })),
              postalCode: text,
              country: "BRA",
            });

            const methods = shippingValue.logisticsInfo?.reduce(
              (initial, { slas }) => {
                const price = slas.length > 0 ? slas[0].price : 0;
                return [...initial, price];
              },
              [] as number[],
            ) ?? [];

            const totalShippingPrice = methods.reduce(
              (sum, price) => sum + price,
              0,
            );

            setShippingValue(totalShippingPrice);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div class="flex items-center justify-center gap-3 w-full h-full border border-gray-200 bg-white rounded p-2 min-h-[48px]">
          <Icon
            id="ShoppingCart"
            width={20}
            height={20}
            class={shippingValue ? "text-dark-pink" : "text-[#ccc]"}
            strokeWidth={2}
          />
          <input
            name="shipping"
            class={`${
              shippingValue && "text-dark-pink font-bold"
            } w-full focus:outline-none`}
            type="text"
            maxLength={8}
            value={cep}
            onChange={(e) => {
              if (e.target instanceof HTMLInputElement) {
                const newValue = e.target.value;
                setCep(newValue);
              }
            }}
            placeholder={"Adicione o seu frete"}
          />
        </div>
        {!shippingValue
          ? (
            <Button
              type="submit"
              htmlFor="shipping"
              loading={loading}
              class="w-[88px] text-sm bg-dark-pink hover:bg-dark-pink/90 border-none text-white normal-case font-medium"
            >
              Adicionar
            </Button>
          )
          : (
            <Button
              class="text-lg border-transparent hover:border-transparent w-[88px]"
              onClick={() => {
                setShippingValue(null);
                setCep("");
              }}
            >
              X
            </Button>
          )}
      </form>
    </div>
  );
}

export default Shipping;
