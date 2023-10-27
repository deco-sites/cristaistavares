import Image from "apps/website/components/Image.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
  columns?: number;
}

function NavItem({ item, index }: { item: INavItem; index?: number }) {
  const { href, label, children, image, columns = 3 } = item;

  return (
    <li class="group flex items-center relative">
      <a href={href} class="px-4 py-3">
        <span
          class={`group-hover:border-b group-hover:border-dark-pink group-hover:text-dark-pink transition duration-300 ease-in ${
            ["muranos", "outlet"].includes(label.toLowerCase()) &&
            "text-dark-pink group-hover:font-bold"
          }`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`${
              index! < 5 ? "flex-row-reverse" : "-translate-x-[85%]"
            } absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-stretch justify-between border-t border-b-2 border-base-200 lg:w-[920px] xl:w-[1260px] h-[425px]`}
            style={{ top: "0px", left: "0px", marginTop: "48px" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={412}
                height={335}
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
                    class="h-full gap-y-3 mt-2.5"
                    style={{ columnCount: columns }}
                  >
                    {node.children?.map((leaf) => (
                      <li class="pt-2">
                        {leaf.href === "#" ? (
                          <div class="hover:text-dark-pink duration-200 transition-colors">
                              <span class="text-sm">{leaf.label}</span>
                          </div>
                        ) : (
                            <a
                              class="hover:text-dark-pink duration-200 transition-colors"
                              href={leaf.href}
                            >
                              <span class="text-sm">{leaf.label}</span>
                            </a>
                          )}
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
