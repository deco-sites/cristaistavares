import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    href?: string;
    width?: number;
    height?: number;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div
          style={{
            width: (logo.width ?? 90) + "px",
            height: (logo.height ?? 90) / 4.5 + "px",
          }}
        >
          <a
            href={logo.href || "https://deco.cx/"}
            target="_blank"
            rel="nofollow noindex"
            aria-label={logo.description || "Powered by deco.cx"}
            style={{ display: "flex" }}
          >
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={logo.width ?? 90}
              height={logo.height ?? 90}
            />
          </a>
        </div>
      )}
    </>
  );
}
