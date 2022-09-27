import { useEventListener } from './useEventListener';

export const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
};

/**
 * Ask for confirmation before leaving the app,
 * like closing the tab or clicking external links.
 * Can only work after the user interacted with the page in any way.
 *
 * @param active - flag to indicate if the page should be blocked right now
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { formState } = useForm();
 *   usePreventLeave(formState.isDirty);
 *   return <form />
 * }
 * ```
 */
export const usePreventLeave = (active: boolean): void =>
    useEventListener({
        eventName: 'beforeunload',
        listener,
        active,
        passive: false,
    });
