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
      class="input lg:h-12 h-9 px-5 join-item w-full mb-2.5 first:mt-5 border-2 border-neutral rounded-full placeholder:text-placeholder !outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

export default function Popup({
  isOpen,
  form,
  text,
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
          class="flex md:flex-row modal-box items-center overflow-visible p-3 max-w-3xl w-full md:h-[65%]"
        >
          <div class="flex justify-center items-center absolute top-0 right-2">
            <button
              onClick={() =>
                setCookieOnCloseModal("closed", modalCloseExpiredDate)}
              class="btn btn-sm btn-circle btn-ghost focus:outline-none"
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
          <img
            alt="Banner Image"
            class="w-1/2 h-full object-cover"
            src="https://d335luupugsy2.cloudfront.net/cms/files/179854/1676641172/$1gdbs1un41e"
          />
          {success.value
            ? (
              <div class="text-base-content lg:text-xl text-left text-base-100">
                E-mail cadastrado com sucesso!
              </div>
            )
            : (
              <>
                <form
                  class="flex items-center justify-center w-full h-full form-control bg-[#f5d5d5] p-2"
                  onSubmit={handleSubmit}
                >
                  <div class="text-center">
                    {nameInput}
                    {emailInput}
                    <button
                      style={{
                        minWidth: "150px",
                      }}
                      type="submit"
                      class="capitalize md:ml-5 mt-2.5 font-semibold btn rounded-full join-item btn-primary bg-red-500 hover:bg-red-600 border-white"
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
