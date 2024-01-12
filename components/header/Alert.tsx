import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  spacing?: number;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], spacing = 0, interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider
        style={{ gap: `${spacing}px` }}
        class="lg:items-center lg:justify-center carousel carousel-center bg-dark-pink text-white px-3 scrollbar-none h-full w-screen lg:w-full"
      >
        {alerts.map((alert, index) => (
          <Slider.Item
            index={index}
            class="carousel-item h-full"
          >
            <span class="text-xs sm:text-sm text-secondary-content flex justify-center items-center text-center h-[56px] md:h-10 w-screen lg:w-full">
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
