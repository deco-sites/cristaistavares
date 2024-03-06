import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface BannerProps {
  image: ImageWidget;
  width?: number;
  height?: number;
  description?: string;
  preload?: boolean;
  isRounded?: boolean;
}

export interface Props {
  banners?: BannerProps[];
  mobilePosition?: 1 | 2 | 3 | 4;
  desktopPosition?: 1 | 2 | 3 | 4;
  interval?: number;
}

function BannerCard(
  { image, width, height, description, preload, isRounded = false }:
    BannerProps,
) {
  return (
    <Image
      src={image}
      width={width || 350}
      height={height || 350}
      alt={description}
      preload={preload}
      class={`${isRounded && "rounded-xl"}`}
    />
  );
}

export default function BannerCategories(
  { banners = [], mobilePosition = 2, desktopPosition = 4, interval = 0 }:
    Props,
) {
  const id = useId();

  const MOBILE_WIDTH: Record<number, string> = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
  };

  const DESKTOP_WIDTH: Record<number, string> = {
    1: "lg:w-full",
    2: "lg:w-1/2",
    3: "lg:w-1/3",
    4: "lg:w-1/4",
  };

  return (
    <div
      id={id}
      class="flex items-center justify-center container py-8 lg:py-12 px-4 lg:px-0"
    >
      <Slider class="carousel carousel-center sm:carousel-end gap-6">
        {banners?.map((banner, index) => (
          <Slider.Item
            index={index}
            class={`${MOBILE_WIDTH[mobilePosition]} ${
              DESKTOP_WIDTH[desktopPosition]
            } carousel-item`}
          >
            <BannerCard {...banner} />
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} infinite interval={interval && interval * 1e3} />
    </div>
  );
}
