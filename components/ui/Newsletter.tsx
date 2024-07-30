import { Runtime } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { RichText } from "apps/admin/widgets.ts";
import type { JSX } from "preact";

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
   */
  text: RichText;
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
      class="lg:h-10 h-9 w-full placeholder:text-placeholder outline-none lg:text-base text-xs bg-transparent text-black border-b border-b-gray-400 lg:max-w-[250px]"
      placeholder={placeholder}
      required={required}
    />
  );
}

function Form(props: Props) {
  const { text, form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      await Runtime.vtex.actions.newsletter.subscribe({ email, name });
    } finally {
      loading.value = false;
      success.value = true;
    }
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
    <section class="flex py-8 px-5 xl:px-0 w-full bg-whitesmoke">
      <div class="flex flex-col lg:flex-row container max-w-[1240px] w-full items-baseline lg:items-center gap-5 lg:gap-16 justify-between">
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          class="text-left text-black lg:max-w-sm max-w-xs lg:pr-0 pr-14"
        />
        {success.value
          ? (
            <div class="text-dark-pink lg:text-xl text-left">
              E-mail cadastrado com sucesso!
            </div>
          )
          : (
            <form
              class="w-full form-control"
              onSubmit={handleSubmit}
            >
              <div class="flex gap-4 w-full lg:flex-row flex-col items-center lg:justify-between justify-center">
                <div class="flex flex-col gap-4 lg:flex-row items-center justify-end w-full">
                  {nameInput}
                  {emailInput}
                </div>
                <button
                  type="submit"
                  class="capitalize font-medium btn disabled:loading rounded-md text-white bg-emerald-500 hover:bg-emerald-600 lg:max-w-[150px] w-full duration-200"
                  disabled={loading}
                >
                  {form?.button?.label || "Cadastrar"}
                </button>
              </div>
            </form>
          )}
      </div>
    </section>
  );
}

export default Form;
