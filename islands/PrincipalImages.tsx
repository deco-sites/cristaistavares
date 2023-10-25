import { h } from "preact";
import { useSignal } from "@preact/signals";

import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";

const WIDTH = 480;
const HEIGHT = 480;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export interface ProductCarouselProps {
  images: Array<{
    url?: string;
    alternateName?: string;
  }>;
}

export default function PrincipalImages({ images }: ProductCarouselProps) {
  const open = useSignal(false);

  const handleMouseMove = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    if (self.window.innerWidth < 1024) return;

    const image = event.currentTarget;
    const boundingRect = image.getBoundingClientRect();

    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;

    const percentageX = (mouseX / boundingRect.width) * 100;
    const percentageY = (mouseY / boundingRect.height) * 100;

    image.style.transform = `scale(1.8)`;
    image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
    image.style.zIndex = "20";
  };

  const handleMouseLeave = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    const image = event.currentTarget;

    image.style.transform = "scale(1)";
    image.style.transformOrigin = "center center";
    image.style.zIndex = "0";
  };

  return (
    <Slider class="carousel gap-6 w-full">
      {images.map((img, index) => {
        return (
          <Slider.Item
            index={index}
            onClick={() => open.value = true}
            class="carousel-item w-full group"
          >
            <Image
              id={`image-${index}`}
              class="w-full duration-100 cursor-pointer"
              sizes="(max-width: 640px) 100vw, 40vw"
              style={{
                aspectRatio: ASPECT_RATIO,
                transition: "transform 0.3s ease",
              }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={(e) => handleMouseLeave(e)}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </Slider.Item>
        );
      })}
    </Slider>
  );
}
