interface Props {
  price: number;
  listPrice: number;
}

const Discount = ({ price, listPrice }: Props) => {
  const discountValue = Math.floor(listPrice - price);

  if (discountValue <= 0) return null;

  const discountPercentage = Math.floor(discountValue * 100 / listPrice);

  return (
    <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 top-10 z-30">
      {discountPercentage}% OFF
    </span>
  );
};

export default Discount;
