import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="w-full">
      <Slider class="flex items-center justify-center carousel carousel-center bg-dark-pink text-white gap-6 px-3 scrollbar-none h-[35px]">
        {alerts.map((alert, index) => (
          <Slider.Item
            index={index}
            class="carousel-item max-w-[80%] lg:max-w-full"
          >
            <span class="text-xs sm:text-sm text-secondary-content flex justify-center items-center text-center w-full h-[56px] md:h-10">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
