// prettier-ignore
export type EventMapFor<Target> =
    Target extends Window ? WindowEventMap
  : Target extends HTMLElement ? HTMLElementEventMap
  : Target extends MediaQueryList ? MediaQueryListEventMap
  : never;
