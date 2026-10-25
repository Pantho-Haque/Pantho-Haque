// Trackima, started lazily so call order never matters. Off outside production, without a site id,
// and for the rest of the tab session once a URL carries ?me (links opened from the Control Room).
import { event, identify, init, type Props } from "@pantho075/trackima";

const SITE = process.env.NEXT_PUBLIC_TRACKIMA_SITE;
const OFF = "trackima:off";
let state: boolean | undefined;

function optedOut() {
  try {
    if (new URLSearchParams(location.search).has("me")) sessionStorage.setItem(OFF, "1");
    return sessionStorage.getItem(OFF) === "1";
  } catch {
    return new URLSearchParams(location.search).has("me");
  }
}

export function track(): boolean {
  if (state === undefined) {
    state = typeof window !== "undefined" && process.env.NODE_ENV === "production" && !!SITE && !optedOut();
    if (state) init({ site: SITE!, host: "https://trackima.pantho-haque-dev.workers.dev" });
  }
  return state;
}

export const trackEvent = (name: string, props?: Props) => { if (track()) event(name, props); };
export const trackIdentify = (id: string, traits?: Props) => { if (track()) identify(id, traits); };
