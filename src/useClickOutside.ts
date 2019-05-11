import { useCallback, RefObject } from "react";
import { useEventListener } from "./useEventListener";

/**
 * @typedef ClickOutsideParams
 * @property {object} innerElementRef ref to inner dom node
 * @property {object} [outerElementRef] ref to outer dom node
 * @property {boolean} [active] flag to indicate if the event listener should be active
 * @property {function} callback the function to call when a click occurs
 */

/**
 * Register a callback on click events outside of a dom node.
 * Can be contained to a certain part of the page by passing
 * a ref to the node that counts as the outer limit. Defaults to window.
 *
 * @param {object} ClickOutsideParams
 * @returns {void}
 * @example
 * const MyComponent = () => {
 *   const innerElementRef = useRef(null);
 *
 *   const callback = useCallback(() => console.log("clicked"), []);
 *
 *   useClickOutside({
 *     callback,
 *     innerElementRef,
 *   });
 *
 *   return (
 *     <div ref={innerElementRef}>Foo</div>
 *   );
 * };
 */
export const useClickOutside = ({
  innerElementRef,
  outerElementRef,
  active = true,
  callback
}: {
  innerElementRef: RefObject<HTMLElement>;
  outerElementRef?: RefObject<HTMLElement>;
  active?: boolean;
  callback: () => void;
}): void => {
  const listener = useCallback(
    (event: Event) => {
      if (
        innerElementRef.current !== null &&
        !innerElementRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    },
    [innerElementRef, callback]
  );

  useEventListener({
    eventName: "click",
    element: outerElementRef !== undefined ? outerElementRef.current : window,
    active,
    listener
  });
};
