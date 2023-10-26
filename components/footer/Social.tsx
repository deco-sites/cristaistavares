import { ImageWidget } from "apps/admin/widgets.ts";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Pinterest"
    | "Twitter";
  link: string;
  image: ImageWidget;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="font-bold">{content.title}</span>}
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-6 items-center w-[47px] h-[47px]"
                  >
                    <img
                      alt={item.label}
                      src={item.image}
                      width={47}
                      height={47}
                      loading="lazy"
                    />
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
