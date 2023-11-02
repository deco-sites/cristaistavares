interface Props {
  price: number;
  listPrice: number;
}

const Discount = ({ price, listPrice }: Props) => {
  const discountValue = Math.floor(listPrice - price);

  if (discountValue <= 0) return null;

  const discountPercentage = Math.ceil(discountValue * 100 / listPrice);

  return (
    <span class="indicator-item indicator-start badge badge-primary border-none text-white bg-red-500 absolute left-1 top-6 lg:top-10 z-30 rounded-md text-xs lg:text-normal">
      {discountPercentage}% OFF
    </span>
  );
};

export default Discount;
