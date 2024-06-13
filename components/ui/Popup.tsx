import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { Runtime } from "$store/runtime.ts";
import { useEffect, useRef } from "preact/compat";

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;

  /**
   * @title Days to reopen modal if it is registered
   */
  modalSignExpiredDate: number;

  /**
   * @title Days to reopen moda if it is closed
   */
  modalCloseExpiredDate: number;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-10 h-7 px-5 join-item w-full mb-2.5 first:mt-5 border border-[#cacaca] placeholder:text-placeholder !outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

export default function Popup({
  isOpen,
  form,
  modalSignExpiredDate,
  modalCloseExpiredDate,
}: Props & { isOpen: boolean }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);
  const success = useSignal(false);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      let name = "";

      //todo: resolver erro do name
      if (form?.name?.show) {
        name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
          ?.value;
      }

      await Runtime.vtex.actions.newsletter.subscribe({ name, email });
    } finally {
      loading.value = false;
      success.value = true;

      setCookieOnCloseModal("registered", modalSignExpiredDate);

      setTimeout(() => {
        success.value = false;
        modalRef.current?.close();
      }, 2000);
    }
  };

  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();

    date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();

    document.cookie = "DecoNewsletterModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;

  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;

  return (
    <>
      <dialog
        ref={modalRef}
        class="modal bg-primary-content bg-opacity-70"
      >
        <form
          method="dialog"
          class="flex md:flex-row modal-box items-center overflow-visible max-w-4xl w-full md:h-[80%] bg-[#f5d5d5] rounded-lg p-0"
        >
          <div class="flex justify-center items-center absolute top-2 right-2">
            <button
              onClick={() =>
                setCookieOnCloseModal("closed", modalCloseExpiredDate)}
              class="btn btn-sm btn-circle btn-ghost focus:outline-none rounded-full p-1 bg-white hover:bg-white/90"
              aria-label="Fechar"
            >
              <Icon
                id="XMark"
                strokeWidth={2}
                width={20}
                height={20}
              />
            </button>
          </div>
          <div class="hidden md:block w-full h-full max-w-[50%] relative">
            <img
              alt="Banner Image"
              class="w-full h-full object-cover rounded-l-lg"
              src="https://d335luupugsy2.cloudfront.net/cms/files/179854/1676641172/$1gdbs1un41e"
            />
            <div class="absolute w-[160px] md:w-[211px] h-[85px] top-6 left-2 md:left-[78px] flex items-center justify-center">
              <img
                src="https://d335luupugsy2.cloudfront.net/cms/files/179854/1676639745/$ng21i0kukbr"
                alt="Logo Cristais Tavares"
              />
            </div>
          </div>
          {success.value
            ? (
              <div class="flex items-center justify-center lg:text-xl text-center text-[#EE3F65]">
                E-mail cadastrado com sucesso!
              </div>
            )
            : (
              <>
                <form
                  class="flex items-center justify-center w-full h-full form-control bg-[#f5d5d5] p-2 rounded-r-lg"
                  onSubmit={handleSubmit}
                >
                  <div class="max-w-[280px] text-center flex flex-col">
                    <h1 class="text-[34px] text-[#EE3F65] text-start font-bold">
                      Fique por dentro das nossas Novidades!
                    </h1>
                    <p class="text-[18px] text-[#9B9B9B] text-start pb-5">
                      Deixe o seu e-mail abaixo para se inscrever em nossa
                      Newsletter
                    </p>
                    {nameInput}
                    {emailInput}
                    <div class="w-full flex items-center gap-0.5 py-2">
                      <input
                        id="popup-checkbox"
                        aria-label="accept terms"
                        type="checkbox"
                        class="checkbox border-black w-[13px] h-[13px] bg-white ml-1"
                      />
                      <span class="text-xs sm:text-sm text-[#4A4A4A]">
                        Eu concordo em receber comunicações.
                      </span>
                    </div>

                    <p class="text-sm text-start text-[#4A4A4A]">
                      A nossa empresa está comprometida a proteger e respeitar
                      sua privacidade, utilizaremos seus dados apenas para fins
                      de marketing. Você pode alterar suas preferências a
                      qualquer momento.
                    </p>

                    <button
                      type="submit"
                      class="mt-2.5 pl-2.5 pr-2.5 h-[50px] font-semibold rounded w-full flex items-center justify-center text-[23px] text-white bg-red-500 hover:bg-red-600 border border-solid border-white"
                      disabled={loading}
                    >
                      {form?.button?.label || "Cadastrar"}
                    </button>
                  </div>
                </form>
              </>
            )}
        </form>
        <form method="dialog" class="modal-backdrop">
          <button
            onClick={() =>
              setCookieOnCloseModal("closed", modalCloseExpiredDate)}
          >
            fechar
          </button>
        </form>
      </dialog>
    </>
  );
}
