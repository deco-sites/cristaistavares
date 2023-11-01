import Avatar from "$store/components/ui/Avatar.tsx";
import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";

export default function SkuSelector(
  { link, value, url }: { link: string; value: string; url?: string },
) {
  const { selectedSku, setSku } = useSkuSelector();

  return (
    <li>
      <div onClick={() => setSku(link)}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value.toLowerCase()}
          isSelected={selectedSku.value === link}
        />
      </div>
    </li>
  );
}
