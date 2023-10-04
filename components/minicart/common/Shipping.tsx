import Button from "$store/components/ui/Button.tsx";

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
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center px-4 mt-1">
      <span class="text-sm">Frete</span>
      {display
        ? (
          <form
            class="join"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("shipping") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

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

                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="shipping"
              class="input join-item placeholder:text-sm"
              type="text"
              maxLength={8}
              value={""}
              placeholder={"Adicione o seu frete"}
            />
            <Button
              class="join-item"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Ok
            </Button>
          </form>
        )
        : (
          <Button
            class="btn-ghost underline font-normal"
            onClick={() => {
              setShippingValue(null);
              setDisplay(true);
            }}
          >
            {shippingValue &&
                (shippingValue / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "Adicionar"}
          </Button>
        )}
    </div>
  );
}

export default Shipping;
