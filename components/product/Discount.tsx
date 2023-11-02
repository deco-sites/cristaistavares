import { formatPrice, formatPriceWithoutCents } from "$store/sdk/format.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  price: number;
  listPrice: number;
  currencySimbol: string;
  type?: "bordered" | "normal";
}

const Discount = (
  { price, listPrice, currencySimbol, type = "normal" }: Props,
) => {
  const discountValue = Math.ceil(listPrice - price);

  if (discountValue === 0) return null;

  const discountPercentage = Math.ceil(discountValue * 100 / listPrice);

  if (type === "bordered") {
    return (
      <div class="flex border border-red-medium px-4 py-[2px] rounded-md">
        <span class="flex flex-col items-center justify-center text-[#F21A1A] text-sm">
          <span>Economize</span>
          {formatPrice(discountValue, currencySimbol)}
        </span>
      </div>
    );
  }

  return (
    <div class="flex gap-[6px]">
      <span class="inline-flex flex-wrap justify-center items-center gap-1 h-4 px-1 bg-[#F21A1A] rounded-[3px] text-[11px] text-white">
        <Icon
          id="Discount"
          width={6}
          height={9}
          class="inline-flex text-white"
          loading="lazy"
        />{" "}
        -{discountPercentage}%
      </span>
      <span class="hidden sm:block text-[#F21A1A] text-[10px] font-semibold">
        Economize {formatPriceWithoutCents(discountValue, currencySimbol)}
      </span>
      <span class="block sm:hidden text-[#F21A1A] text-[10px]">
        {formatPriceWithoutCents(discountValue, currencySimbol)} OFF
      </span>
    </div>
  );
};

export default Discount;
