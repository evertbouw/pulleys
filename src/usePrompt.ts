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
 * @param {boolean} active
 * @returns {void}
 */
export const usePrompt = (active: boolean): void =>
    useEventListener({
        eventName: 'beforeunload',
        listener,
        active,
        passive: false,
    });
