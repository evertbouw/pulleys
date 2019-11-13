import { cleanup, fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useEvent } from "../src/useEvent";

const leftClick = { button: 0, clientX: 50 };

afterEach(cleanup);

describe("useEvent", () => {
  it("works", () => {
    const eventName = "click";
    const getValue = jest.fn((e: MouseEvent) => e.clientX);
    const initialState = 0;

    const { result } = renderHook(() =>
      useEvent({
        eventName,
        getValue,
        initialState
      })
    );

    expect(result.current).toBe(initialState);

    act(() => {
      fireEvent.click(window, leftClick);
    });

    expect(getValue).toHaveBeenCalledTimes(1);

    expect(result.current).toBe(leftClick.clientX);
  });

  it("accepts elements", () => {
    const eventName = "click";
    const getValue = jest.fn(
      (e: MouseEvent) => (e.target as HTMLButtonElement).name
    );
    const initialState = "foo";
    const element = document.createElement("button");
    element.name = "bar";

    const { result } = renderHook(() =>
      useEvent({
        eventName,
        getValue,
        initialState,
        element
      })
    );

    expect(result.current).toBe(initialState);

    act(() => {
      element.click();
    });

    expect(getValue).toHaveBeenCalledTimes(1);

    expect(result.current).toBe(element.name);
  });
});
