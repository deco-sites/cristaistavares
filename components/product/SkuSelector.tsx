import Avatar from "$store/components/ui/Avatar.tsx";

export default function SkuSelector(
  { link, value, url }: { link: string; value: string; url?: string },
) {
  return (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value}
        />
      </a>
    </li>
  );
}
