import { ImageWidget } from "apps/admin/widgets.ts";
import { useState } from "preact/compat";

export interface BannerProps {
  year: string;
  banner: {
    image: ImageWidget;
    alt: string;
  };
  description: string;
}

export interface Props {
  banners: BannerProps[];
}

export default function SelectableBanners({ banners }: Props) {
  const [selectedYear, setSelectedYear] = useState("2015");

  const years = [
    { value: "2015" },
    { value: "2017" },
    { value: "2018" },
    { value: "2019" },
  ];

  return (
    <section class="flex flex-col justify-between w-full h-full md:h-[476px] bg-gray-100">
      <div class="flex items-center justify-center w-full -translate-y-4">
        <div class="flex items-center justify-center sm:max-w-[75%] gap-1 bg-dark-pink text-white leading-tight p-3">
          <span>Conheça um pouco da</span>
          <span class="text-[#ffad8b]">nossa história</span>
        </div>
      </div>

      <div class="w-full px-2">
        {banners.filter((banner) => banner.year === selectedYear).map(
          (item) => (
            <div class="flex flex-col sm:flex-row items-center justify-between w-full gap-10 md:gap-3">
              <img
                src={item.banner.image}
                alt={item.banner.alt}
                width={320}
                height={212}
                loading="lazy"
              />

              <div class="flex flex-col justify-center gap-1 bg-white max-w-max min-h-[212px] h-full px-5 py-3">
                <span class="text-[#f2703b] font-bold text-3xl">
                  {item.year}
                </span>
                <span class="text-[15px] leading-4">{item.description}</span>
              </div>
            </div>
          ),
        )}
      </div>

      <div class="grid grid-cols-4 place-items-center gap-2.5 mt-6 md:mt-0 px-6 pb-6 w-full">
        {years.map((year) => (
          <span
            onClick={() => setSelectedYear(year.value)}
            class={`${
              selectedYear === year.value && "border-b-4 border-b-dark-pink"
            } text-[#888888] font-bold text-lg md:text-[32px] cursor-pointer`}
          >
            {year.value}
          </span>
        ))}
      </div>
    </section>
  );
}
