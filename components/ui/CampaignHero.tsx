import CampaignTimer, {
  Props as CampaignProps,
} from "$store/components/ui/CampaignTimer.tsx";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type InputProps =
  & JSX.IntrinsicElements["input"]
  & {
    name: string;
    label: string;
  };

export interface Props {
  campaignTimer: CampaignProps;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  ...props
}, ref) => (
  <div class="flex flex-col gap-0.5 text-white w-full">
    <label for={name}>{label}</label>
    <input
      {...props}
      ref={ref}
      id={name}
      name={name}
      class="bg-[#292627] placeholder:text-white/40 md:max-w-[160px] w-full rounded-lg p-2 focus:border-b focus:border-b-yellow-500 duration-150 transition-colors"
    />
  </div>
));

function SubmitButton() {
  return (
    <button
      type="submit"
      class="font-bold md:max-w-[160px] h-10 w-full rounded-lg p-2 bg-yellow-500 hover:bg-yellow-400 duration-150 transition-colors uppercase"
    >
      Cadastre-se
    </button>
  );
}

export default function CampaignHero({ campaignTimer }: Props) {
  return (
    <section
      style={`background-image: url('https://i.pinimg.com/originals/71/72/69/7172693062dfdf53798b0857ebc1d6d3.gif');`}
      class="w-full h-full bg-center object-cover bg-opacity-80 border-b border-b-gray-200/40"
    >
      <div class="flex flex-col justify-between items-center container mx-auto max-w-[1240px] gap-12 w-full py-12 px-4 xl:px-0 text-white">
        <div class="flex flex-col lg:flex-row w-full justify-between items-center">
          <div class="flex flex-col items-center lg:items-start justify-center text-center lg:text-start gap-1.5">
            {/* <img src="https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif" /> */}
            <span class="flex items-center justify-center before:bg-yellow-400 before:w-[1px] before:h-5 before:flex font-semibold gap-2">
              Garanta antecipadamente todas as nossas
            </span>
            <div class="text-4xl sm:text-6xl font-bold tracking-wide leading-tight">
              <h1>VANTAGENS</h1>
              <h1 class="text-yellow-500">EXCLUSIVAS!</h1>
            </div>
          </div>

          {campaignTimer && <CampaignTimer {...campaignTimer} />}
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-0">
          <div class="flex flex-col gap-1.5">
            <h2 class="text-lg font-bold">Junte-se a nós e tenha:</h2>

            <ul class="flex flex-col gap-0.5">
              <li>
                <span class="text-yellow-400">1.</span> Desconto imperdíveis.
              </li>
              <li>
                <span class="text-yellow-400">2.</span>{" "}
                Informações divulgadas primeiro pra você.
              </li>
              <li>
                <span class="text-yellow-400">3.</span>{" "}
                Acesso antecipado aos descontos.
              </li>
              <li>
                <span class="text-yellow-400">4.</span>{" "}
                Cupom exclusivo para economizar ainda mais.
              </li>
            </ul>
          </div>

          <div class="flex flex-col md:flex-row items-end justify-center gap-3 w-full md:w-auto">
            <Input name="name" placeholder="Seu nome" label="Nome:" />
            <Input name="email" placeholder="Seu e-mail" label="E-mail:" />
            <Input name="whatsapp" placeholder="Seu número" label="WhatsApp:" />
            <SubmitButton />
          </div>
        </div>
      </div>
    </section>
  );
}
