const cache = new Map();

/**
 * Think of this as useMemo but across component instances
 * @param create - Function that creates the item to be cached
 * @param deps - list of dependencies. Make sure there is a unique value to avoid collisions
 * @returns value returned by create function
 * @example
 * ```ts
 *  export const FormattedRelativeTime = ({ value, unit, ...options }: FormattedRelativeTimeProps) => {
 *      const { i18n } = useLingui();
 *
 *      const formatter = useCache(
 *          () => new Intl.RelativeTimeFormat(i18n.locale, options),
 *          ["FormattedRelativeTime", i18n.locale, JSON.stringify(options)]
 *      );
 *
 *      return formatter.format(value, unit) as unknown as JSX.Element;
 *  };
 * ```
 */
export const useCache = <Value>(
    create: () => Value,
    deps: unknown[],
): Value => {
    const key = deps.join('-');

    if (!cache.has(key)) {
        cache.set(key, create());
    }

    return cache.get(key);
};
