import { useUser } from "apps/vtex/hooks/useUser.ts";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const url = self?.location?.href;

  const component = item?.children?.length
    ? (
      <div class="collapse collapse-plus relative items-start">
        <input
          type="checkbox"
          class="absolute left-0 w-full top-0"
        />
        <div
          class={`${
            item.label.toLowerCase() === "muranos" && "text-dark-pink"
          } collapse-title min-h-0 p-0 py-2.5 font-medium px-0 flex items-center justify-between`}
        >
          {item.label}
        </div>
        <div class="collapse-content px-0">
          <div class="border-t border-base-content border-solid pt-0 px-0 pl-5">
            {item.children?.map(({ children }) => (
              <ul>
                <li>
                  <a
                    href={item.href}
                    class="w-full block pt-5 font-medium text-base-300"
                  >
                    {item.children && item.children[0].label}
                  </a>
                </li>
                {children?.map((item) => (
                  <li>
                    <a
                      href={item.href}
                      class={`${
                        url.includes(item.href) && "underline font-bold"
                      } hover:underline w-full block pt-5 font-medium text-base-300`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
    : (
      <a
        href={item.href}
        title={item.label}
        class={`${url.includes(item.href) && "underline"} ${
          item.label.toLowerCase() === "outlet" && "text-dark-pink"
        } hover:underline w-full block py-2.5 font-medium`}
      >
        {item.label}
      </a>
    );

  return component;
}

function Menu({ items }: Props) {
  const { user } = useUser();

  return (
    <div class="flex flex-col max-h-[95%] overflow-y-scroll">
      <a
        href={!user.value ? "/login" : "/account"}
        class="flex items-center justify-start min-h-8 px-4 text-sm bg-gray-300"
      >
        Bem vindo(a), {!user.value ? "faça seu login" : `${user.value.email}`}
      </a>

      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 mt-1 gap-0.5">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
