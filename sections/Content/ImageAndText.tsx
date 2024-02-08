import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

import Image from "apps/website/components/Image.tsx";

export interface Props {
  additionalText?: HTMLWidget;
  additionalImage?: {
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  };
  mobilePosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  mobileAlignment?: "items-start" | "items-center" | "items-end";
  desktopPosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  desktopAlignment?: "items-start" | "items-center" | "items-end";
}

const DESKTOP_POSITION: Record<string, string> = {
  "flex-col": "lg:flex-col",
  "flex-row": "lg:flex-row",
  "flex-col-reverse": "lg:flex-col-reverse",
  "flex-row-reverse": "lg:flex-row-reverse",
};

const DESKTOP_ALIGNMENT: Record<string, string> = {
  "items-start": "lg:items-start",
  "items-center": "lg:items-center",
  "items-end": "lg:items-end",
};

export default function ImageAndText({
  additionalText,
  additionalImage,
  mobilePosition = "flex-col",
  mobileAlignment = "items-center",
  desktopPosition = "flex-row",
  desktopAlignment = "items-start",
}: Props) {
  return (
    <div
      class={`${mobilePosition} ${mobileAlignment} ${
        DESKTOP_POSITION[desktopPosition]
      } ${
        DESKTOP_ALIGNMENT[desktopAlignment]
      } flex-grow flex justify-between gap-4 max-w-[1240px] mx-auto p-4 xl:p-0`}
    >
      {additionalText && (
        <div dangerouslySetInnerHTML={{ __html: additionalText }} />
      )}

      {additionalImage && (
        <Image
          src={additionalImage.image || ""}
          width={additionalImage.width ?? 250}
          height={additionalImage.height ?? 250}
          alt={additionalImage.description ?? "Imagem Ilustrativa"}
          loading="lazy"
        />
      )}
    </div>
  );
}
