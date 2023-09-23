import { asset } from "$fresh/runtime.ts";

import { useUser } from "apps/vtex/hooks/useUser.ts";

const LoginElement = () => {
  const { user } = useUser();

  return (
    <div class="group relative mr-8 group-hover:opacity-100 group-hover:visible">
      <a
        class="btn btn-square btn-ghost bg-transparent hover:bg-transparent w-full"
        href="/login"
        aria-label="login on website"
      >
        <img
          class="object-cover mr-2"
          src={asset("/icon-user.png")}
          width={20}
          height={23}
          alt="User Icon"
          loading="eager"
        />
        <div class="flex justify-center items-center">
          <strong class="font-normal leading-5 truncate overflow-hidden text-sm text-gray-base normal-case arrow-down">
            Bem vindo (a), <br />{" "}
            {!user.value ? "Faça seu login" : `${user.value.email}`}
          </strong>
        </div>
      </a>

      <div class="absolute top-45 left-0 w-48 py-5 bg-white w z-10 border-t-2 border-gray-400 opacity-0 invisible -translate-y-30 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:animate-dropdown animate-dropdown-reverse">
        <div class="before-absolute"></div>
        <ul>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-9 bg-dark-pink flex justify-center items-center text-base text-white font-bold text-center mb-2 uppercase"
              href="/account"
            >
              {!user.value ? "Entrar" : "Minha Conta"}
            </a>
          </li>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-7 flex text-gray-base text-sm font-normal"
              href="/account"
            >
              Minha Conta
            </a>
          </li>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-7 flex text-gray-base text-sm font-normal"
              href="/account/orders"
            >
              Meus Pedidos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginElement;
