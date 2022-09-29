import { useCallback, useRef, type RefObject } from 'react';
import { useEventListener } from './useEventListener';
import { useGetter } from './useGetter';
import { isDefined } from './utils/isDefined';

/**
 * options for useClickOutside
 */
export interface UseClickOutsideOptions<Foo extends HTMLElement>{
    /**
     * a ref object to the target element
     * @defaultValue creates a ref if not provided
     */
    innerElementRef?: RefObject<Foo>;
    /**
     * an optional ref to the outside element.
     * @defaultValue uses `window` as the default target
     */
    outerElementRef?: RefObject<Foo>;
    /**
     * flag to indicate if the listener should be currently active
     * @defaultValue true
     */
    active?: boolean;
}

/**
 * Register a callback on click events outside of a dom node.
 * Can be contained to a certain part of the page by passing
 * a ref to the node that counts as the outer limit. Defaults to window.
 *
 * @param callback - function to be called when the user clicked outside of the target
 * @param options - {@link UseClickOutsideOptions}
 * @returns a ref object you can attach to your node
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const elementRef = useClickOutside(() => console.log("clicked"));
 *
 *   return (
 *     <div ref={elementRef}>Foo</div>
 *   );
 * };
 * ```
 */
export const useClickOutside = <InnerElement extends HTMLElement>(
    callback: () => void,
    {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        innerElementRef = useRef<InnerElement>(null),
        outerElementRef,
        active = true,
    }: UseClickOutsideOptions<InnerElement> = {},
): RefObject<InnerElement> => {
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

    return innerElementRef as RefObject<InnerElement>;
};
