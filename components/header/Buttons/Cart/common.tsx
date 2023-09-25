import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { asset } from "$fresh/runtime.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm bg-dark-pink border-none p-1 ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="w-9 h-9 btn-circle btn-sm btn-ghost"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <img
          src={asset("/minicart-icon.png")}
          alt="Cart Icon"
          width={36}
          height={36}
          loading="eager"
        />
      </Button>
    </div>
  );
}

export default CartButton;
