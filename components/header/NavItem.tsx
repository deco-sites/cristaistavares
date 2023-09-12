import Image from "apps/website/components/Image.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
  columns?: number;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image, columns = 3 } = item;

  return (
    <li class="group flex items-center relative">
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline group-hover:text-dark-pink transition-colors duration-400">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="flex-row-reverse absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-stretch justify-between border-t border-b-2 border-base-200 w-[980px] h-[380px]"
            style={{ top: "0px", left: "0px", marginTop: "48px" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6 h-[95%]">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline font-bold" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  <ul
                    class="h-full gap-y-3 mt-3"
                    style={{ columnCount: columns }}
                  >
                    {node.children?.map((leaf) => (
                      <li>
                        <a
                          class="hover:text-dark-pink duration-200 transition-colors"
                          href={leaf.href}
                        >
                          <span class="text-sm">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
