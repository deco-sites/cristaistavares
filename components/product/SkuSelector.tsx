import Avatar from "$store/components/ui/Avatar.tsx";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";

export default function SkuSelector(
  { link, value, url, productName }: {
    link: string;
    value: string;
    url?: string;
    productName?: string;
  },
) {
  const { selectedSku, setSku } = useSkuSelector();

  return (
    <li>
      <div onClick={() => setSku(link)}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value.toLowerCase()}
          isSelected={value.toLowerCase() ===
            (productName && productName.toLowerCase())}
        />
      </div>
    </li>
  );
}
