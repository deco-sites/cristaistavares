import { useEffect, useId, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
    lcp?: boolean;
  };

  expiresAt?: string;

  labels?: {
    expired?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };

  text?: {
    mobile?: HTMLWidget;
    desktop?: HTMLWidget;
  };

  backgroundHex?: string;
  textHex?: string;
  hiddenCampaignTimer?: boolean;
}

function CampaignTimer({
  image,
  expiresAt = `${new Date()}`,
  labels,
  text,
  hiddenCampaignTimer,
  textHex,
  backgroundHex,
}: Props) {
  const id = useId();

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const expirationDate = new Date(expiresAt).getTime();

  const calculateTimeRemaining = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);

    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderCountdownElement = (value: number, label: string) => {
    return (
      <div class="flex flex-col items-center justify-center text-center">
        <span class="countdown text-sm sm:text-xl md:text-3xl">
          {value < 10 ? `0${value}` : value}
        </span>
        <span class="text-sm">{label}</span>
      </div>
    );
  };

  return (
    <>
      {!hiddenCampaignTimer && (
        <>
          <div
            style={{ background: backgroundHex }}
            class="text-black w-full min-h-[90px] justify-center items-center text-center flex md:py-3 px-4 xl:px-0"
          >
            <div class="flex items-center justify-between gap-4 md:gap-0 w-full max-w-[1266px]">
              <div class="flex">
                <Picture preload={image.lcp}>
                  <Source
                    media="(max-width: 476px)"
                    fetchPriority={image.lcp ? "high" : "auto"}
                    src={image.mobile}
                    width={220}
                    height={70}
                  />
                  <Source
                    media="(min-width: 768px)"
                    fetchPriority={image.lcp ? "high" : "auto"}
                    src={image.desktop}
                    width={220}
                    height={70}
                  />
                  <img
                    class="object-cover max-w-full"
                    loading={image.lcp ? "eager" : "lazy"}
                    src={image.desktop}
                    alt={image.alt}
                  />
                </Picture>
              </div>
              {text && (
                <div class="flex max-w-full lg:max-w-[420px] xl:max-w-[580px] text-center px-1 sm:px-6 md:px-8">
                  <div class="text-sm xl:text-xl leading-tight tracking-tighter block lg:hidden">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text?.mobile ??
                          "Time left for a campaign to end with a link",
                      }}
                    />
                  </div>
                  <div class="text-sm xl:text-xl leading-tight tracking-tighter hidden lg:block">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text?.desktop ??
                          "Time left for a campaign to end with a link",
                      }}
                    />
                  </div>
                </div>
              )}
              <div style={{ color: textHex }} class="flex items-center h-20">
                <div class="flex flex-col items-center justify-center text-center sm:gap-1 min-w-full">
                  <div
                    class={timeRemaining.hours + timeRemaining.minutes +
                          timeRemaining.seconds < 0
                      ? "hidden h-full text-center"
                      : "hidden"}
                  >
                    <span class="flex items-center text-sm sm:text-2xl h-full">
                      {labels?.expired || "Expired!"}
                    </span>
                  </div>

                  <div
                    class={timeRemaining.hours + timeRemaining.minutes +
                          timeRemaining.seconds >= 0
                      ? ""
                      : "hidden"}
                  >
                    <div class="flex sm:grid sm:grid-flow-col gap-2 text-center sm:auto-cols-max items-center font-bold uppercase px-2 sm:px-0">
                      {renderCountdownElement(
                        timeRemaining.days,
                        labels?.days || "Dias",
                      )}
                      <div>:</div>
                      {renderCountdownElement(
                        timeRemaining.hours,
                        labels?.hours || "Horas",
                      )}
                      <div>:</div>
                      {renderCountdownElement(
                        timeRemaining.minutes,
                        labels?.minutes || "Min",
                      )}
                      <div>:</div>
                      {renderCountdownElement(
                        timeRemaining.seconds,
                        labels?.seconds || "Seg",
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CampaignTimer;
