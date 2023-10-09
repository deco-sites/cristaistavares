import { useState } from "preact/hooks";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div class="flex justify-between items-center px-4 mt-1 w-full">
      <form
        class="flex items-center justify-center gap-2 w-full h-full"
        onSubmit={async (e) => {
          e.preventDefault();
          const { currentTarget: { elements } } = e;

          const input = elements.namedItem("coupon") as HTMLInputElement;
          const text = input.value;

          if (!text) return;

          try {
            setLoading(true);
            const coupon = await onAddCoupon(text);
            console.log(coupon);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div class="flex items-center justify-center gap-3 w-full h-full border border-gray-200 bg-white rounded p-2 min-h-[48px]">
          <Icon
            id="Discount"
            width={20}
            height={20}
            class={coupon ? "text-dark-pink" : "text-[#ccc]"}
            strokeWidth={2}
          />
          <input
            name="coupon"
            class={`${
              coupon && "text-dark-pink font-bold"
            } w-full focus:outline-none`}
            type="text"
            value={coupon ?? ""}
            placeholder={"Adicionar cupom"}
          />
        </div>
        {!coupon
          ? (
            <Button
              type="submit"
              htmlFor="coupon"
              loading={loading}
              class="w-[88px] text-sm bg-dark-pink hover:bg-dark-pink/90 border-none text-white normal-case font-medium"
            >
              Adicionar
            </Button>
          )
          : (
            <Button
              class="text-lg border-transparent hover:border-transparent w-[88px]"
              loading={loading}
              onClick={async () => {
                await onAddCoupon("");
              }}
            >
              X
            </Button>
          )}
      </form>
    </div>
  );
}

export default Coupon;
