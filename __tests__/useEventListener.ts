import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useEventListener } from "../src/useEventListener";

const leftClick = { button: 0 };

describe("useEventListener", () => {
  it("works", () => {
    const listener = jest.fn();

    const { result } = renderHook(() =>
      useEventListener({
        eventName: "click",
        listener
      })
    );

    act(() => {
      fireEvent.click(window, leftClick);
    });

    expect(result.error).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("can be toggled", () => {
    const listener = jest.fn();

    const { result, rerender } = renderHook(
      (active: boolean) =>
        useEventListener({
          eventName: "click",
          listener,
          active
        }),
      { initialProps: false }
    );
    act(() => {
      fireEvent.click(window, leftClick);
    });
    expect(result.error).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(0);

    rerender(true);
    act(() => {
      fireEvent.click(window, leftClick);
    });
    expect(result.error).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(1);

    rerender(false);
    act(() => {
      fireEvent.click(window, leftClick);
    });
    expect(result.error).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("accepts elements", () => {
    const listener = jest.fn((e: MouseEvent) => {
      expect((e.currentTarget as HTMLButtonElement).tagName).toBe("BUTTON");
    });

    const element = document.createElement("button");

    const { result } = renderHook(() =>
      useEventListener({
        eventName: "click",
        listener,
        element
      })
    );

    act(() => {
      element.click();
    });

    expect(result.error).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
