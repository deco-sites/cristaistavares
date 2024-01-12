interface Props {
  price: number;
  listPrice: number;
  isPDP?: boolean;
}

const Discount = ({ price, listPrice, isPDP = true }: Props) => {
  const discountValue = Math.round(listPrice - price);

  if (discountValue <= 0) return null;

  const discountPercentage = Math.round(discountValue * 100 / listPrice);

  return (
    <span
      class={`${
        isPDP && "absolute top-1.5"
      } indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 z-30 rounded-md text-xs lg:text-normal`}
    >
      {discountPercentage}% OFF
    </span>
  );
};

export default Discount;
