import type { AnalyticsEvent } from "apps/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

export const sendEvent = <E extends AnalyticsEvent>(event: E) =>
  window.DECO.events.dispatch(event);
