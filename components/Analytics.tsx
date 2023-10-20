import { sendEvent } from "$store/sdk/analytics.tsx";
import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const script = (id: string, event: AnalyticsEvent) => {
  const element = document.getElementById(id);
  const sendEvent = () => window.DECO.events.dispatch(event);
  element && element.addEventListener("click", sendEvent);
};

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => (
  <script
    defer
    src={scriptAsDataURI(script, id, event)}
  />
);

interface Props<E extends AnalyticsEvent> {
  event: E;
}

/**
 * This componente should be used when want to send event for rendered componentes.
 * This behavior is usefull for view_* events.
 */
export function SendEventOnLoad<E extends AnalyticsEvent>(
  { event }: Props<E>,
) {
  return <script defer src={scriptAsDataURI(sendEvent, event)} />;
}
