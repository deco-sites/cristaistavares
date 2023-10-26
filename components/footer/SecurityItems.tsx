import type { SecurityItem } from "./Footer.tsx";

export default function SecurityItems(
  { content }: { content?: { title?: string; items?: SecurityItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="font-bold">{content.title}</span>}
          <ul class="flex flex-wrap items-center justify-center gap-4 w-full">
            {content.items.map((item) => {
              return (
                <li class="w-[60px] h-[60px]" title={item.description}>
                  {item.href
                    ? (
                      <a href={item.href} class="w-full h-full">
                        <img
                          src={item.image}
                          width={60}
                          height={60}
                          alt={item.description}
                          loading="lazy"
                        />
                      </a>
                    )
                    : (
                      <img
                        src={item.image}
                        width={60}
                        height={60}
                        alt={item.description}
                        loading="lazy"
                      />
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
