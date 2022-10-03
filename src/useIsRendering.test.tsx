import { render } from "@testing-library/react";
import { useEffect, useLayoutEffect } from "react";
import { describe, expect, it } from "vitest";
import { useIsRendering } from "./useIsRendering";

describe("useIsRendering", () => {
  it("works", () => {
    const MockComponent = () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const isRenderingRef = useIsRendering();

        expect(isRenderingRef.current).toBe(true);

        useLayoutEffect(() => {
            expect(isRenderingRef.current).toBe(false);
        }, [isRenderingRef]);

        useEffect(() => {
            expect(isRenderingRef.current).toBe(false);
        }, [isRenderingRef]);

        return null;
    }

    render(<MockComponent />);

    expect.assertions(3);
  });
});
