import { useCallback, type RefObject } from 'react';
import { useEventListener } from './useEventListener';
import { useGetter } from './useGetter';
import { isDefined } from './utils/isDefined';

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
 *   useClickOutside({
 *     callback: () => console.log("clicked"),
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
    callback,
}: {
    innerElementRef: RefObject<HTMLElement>;
    outerElementRef?: RefObject<HTMLElement>;
    active?: boolean;
    callback: () => void;
}): void => {
    const getCallback = useGetter(callback);

    const listener = useCallback(
        (event: Event) => {
            if (
                isDefined(innerElementRef.current) &&
                !innerElementRef.current.contains(event.target as Node)
            ) {
                getCallback()();
            }
        },
        [getCallback, innerElementRef],
    );

    useEventListener({
        target: outerElementRef?.current ?? window,
        eventName: 'click',
        active:
            active &&
            isDefined(outerElementRef) === isDefined(outerElementRef?.current),
        listener,
    });
};
