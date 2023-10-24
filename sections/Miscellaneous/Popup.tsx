export { default } from "$store/islands/Popup.tsx";
import type { Props } from "$store/islands/Popup.tsx";
export type { Props } from "$store/islands/Popup.tsx";
import { getCookies } from "std/http/mod.ts";

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const isOpen = cookieEmpty ? false : Boolean(!cookies["DecoNewsletterModal"]);

  return { ...props, isOpen };
};
