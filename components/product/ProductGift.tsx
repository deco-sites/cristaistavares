export interface Props {
  productGift?: {
    name: string;
    imageUrl: string;
  };
}

export default function ProductGift({ productGift }: Props) {
  if (!productGift) return null;

  return (
    <div class="flex flex-col sm:flex-row items-center justify-between w-full h-full px-2 py-4 rounded-[5px] border border-[#cacbcc] max-w-[500px]">
      <span class="sm:max-w-[60%]">{productGift.name}</span>

      <img
        alt="Product Image"
        src={productGift.imageUrl}
        loading="lazy"
        class="w-[125px] h-[125px] object-cover"
      />
    </div>
  );
}
