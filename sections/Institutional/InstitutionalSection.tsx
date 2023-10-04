import Icon from "$store/components/ui/Icon.tsx";
import InstitutionalCard from "$store/components/ui/InstitutionalCard.tsx";
import GridImage from "$store/components/ui/GridImage.tsx";
import type { Props as CardProps } from "$store/components/ui/InstitutionalCard.tsx";
import type { Props as GridProps } from "$store/components/ui/GridImage.tsx";
import type { BreadcrumbList } from "apps/commerce/types.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SelectableBanners from "$store/islands/SelectableBanners.tsx";
import type { BannerProps } from "$store/islands/SelectableBanners.tsx";

export interface FilterProps {
  label: string;
  values: {
    label: string;
    href: string;
  }[];
}

export interface QuestionProps {
  label: string;
  /** @format html */
  answer: string;
}

export interface Props {
  filters: FilterProps[];
  title: string;
  questions?: QuestionProps[];
  /** @format html */
  info?: string;
  banners?: BannerProps[];
  cards?: CardProps[];
  gridImages?: GridProps[];
}

const DEFAULT_PROPS = {
  title: "",
  info: "",
  filters: [
    {
      label: "Institucional",
      values: [
        { label: "Quem somos", href: "/quem-somos" },
        { label: "Fale Conosco", href: "/fale-conosco" },
        { label: "Atacado", href: "/atacado" },
        { label: "Atendimento", href: "/atendimento" },
        { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
      ],
    },
    {
      label: "Ajuda e suporte",
      values: [
        {
          label: "Perguntas Frequentes",
          href: "/faq",
        },
        {
          label: "Trocas e Devoluções",
          href: "/trocas-devolucoes",
        },
        {
          label: "Prazo de Entrega",
          href: "/prazos-entregas",
        },
        {
          label: "Formas de Pagamento",
          href: "/formas-pagamento",
        },
        {
          label: "Política de Privacidade",
          href: "/politica-privacidade",
        },
        {
          label: "Termos de Uso",
          href: "/temos-uso",
        },
      ],
    },
  ],
  questions: [],
  gridImages: [],
  banners: [],
  cards: [],
};

function Filters({ filters }: { filters: FilterProps[] }) {
  return (
    <ul class="flex flex-col p-3 md:p-8 gap-4">
      {filters
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <div class="collapse">
              <input
                type="checkbox"
                name="pdc-filters"
                class="min-h-0"
                checked={true}
              />
              <div class="collapse-title flex justify-between cursor-pointer border-b border-gray-200 p-0 min-h-0">
                <span class="flex content-center flex-wrap h-9">
                  {filter.label}
                </span>
                <span class="flex content-center flex-wrap">
                  <Icon
                    class="text-gray-medium h-[8px] w-[14px] transition-all duration-500"
                    width={25}
                    height={25}
                    id="ChevronDown"
                  />
                </span>
              </div>
              <div class="collapse-content transition-all duration-700 p-0">
                <div class="flex flex-col gap-2 w-full py-3">
                  {filter.values.map((item) => (
                    <a
                      href={item.href}
                      class="cursor-pointer px-3 w-full py-1 hover:text-dark-pink hover:underline"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

function Question({ questions }: { questions: QuestionProps[] }) {
  return (
    <ul class="flex flex-col gap-4 text-gray-base w-full">
      {questions
        .map((question) => (
          <li class="flex flex-col gap-4">
            <div class="collapse">
              <input type="checkbox" name="pdc-filters" class="min-h-0" />
              <div class="collapse-title flex justify-between cursor-pointer border-b border-gray-100 p-0 min-h-0">
                <span class="flex content-center flex-wrap h-9">
                  {question.label}
                </span>
                <span class="flex content-center flex-wrap">
                  <Icon
                    class="text-gray-medium h-[8px] w-[14px] transition-all duration-500"
                    width={25}
                    height={25}
                    id="ChevronDown"
                  />
                </span>
              </div>
              <div class="collapse-content transition-all duration-700 p-0">
                <div class="flex flex-col gap-2 w-full py-3">
                  <div dangerouslySetInnerHTML={{ __html: question.answer }} />
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default function Faq(props: Props) {
  const {
    filters,
    title,
    questions = [],
    cards,
    banners,
    gridImages = [],
    info,
  } = { ...DEFAULT_PROPS, ...props };

  const itemListElement: BreadcrumbList["itemListElement"] = [];

  return (
    <section class="container max-w-[1180px] px-4 sm:py-10">
      <div class="flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={itemListElement} />
      </div>

      <div class="flex flex-col md:flex-row">
        {filters.length > 0 && (
          <aside class="block md:sticky w-full md:w-min md:min-w-[300px] md:h-full md:top-36">
            <Filters filters={filters} />
          </aside>
        )}
        <div class="flex-grow">
          <div class="w-full container px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10 lg:px-0">
            <div class={`flex flex-col ${info ? "gap-6" : "gap-10"}`}>
              <h1 class="text-xl text-gray-base font-bold">{title}</h1>

              {questions && (
                <div class="join join-vertical w-full">
                  <Question questions={questions} />
                </div>
              )}

              {info && <div dangerouslySetInnerHTML={{ __html: info }} />}

              {cards && (
                <div class="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 my-10 gap-10 w-full place-items-center">
                  {cards.map((card) => <InstitutionalCard {...card} />)}
                </div>
              )}

              {banners && <SelectableBanners banners={banners} />}

              {gridImages && (
                <div class="grid sm:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 w-full items-center justify-center text-center">
                  {gridImages.map((grid) => <GridImage {...grid} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
