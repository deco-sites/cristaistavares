import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  resizeQuantity?: boolean;
  isProductMatcher?: boolean;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  {
    onChange,
    quantity,
    disabled,
    loading,
    resizeQuantity = false,
    isProductMatcher = false,
  }: Props,
) {
  const inputWidth = isProductMatcher
    ? "w-[23px]"
    : resizeQuantity
    ? "w-[10px]"
    : "w-[45px]";
  const decrement = () => onChange?.(Math.max(1, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border rounded-none max-w-min h-[50px]">
      <Button
        class={`${
          resizeQuantity && "max-w-[35px] xl:max-w-full"
        } btn-square btn-ghost join-item`}
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class={`text-center ${inputWidth} [appearance:textfield] join-item`}
        type="number"
        aria-label="current selected number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class={`${
          resizeQuantity && "max-w-[35px] xl:max-w-full"
        } btn-square btn-ghost join-item`}
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
