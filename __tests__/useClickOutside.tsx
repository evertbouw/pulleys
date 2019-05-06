import React, { useRef } from "react";
import { act } from "react-hooks-testing-library";
import { fireEvent, render, cleanup } from "react-testing-library";
import { useClickOutside } from "../src/useClickOutside";

const leftClick = { button: 0 };

afterEach(cleanup);

describe("useClickOutside", () => {
  it("should work", () => {
    const callback = jest.fn();

    const MockComponent = () => {
      const innerElementRef = useRef<HTMLDivElement>(null);

      useClickOutside({
        callback,
        innerElementRef
      });

      return (
        <div ref={innerElementRef}>
          <span>foo</span>
        </div>
      );
    };

    const { container, getByText } = render(<MockComponent />);

    act(() => {
      fireEvent.click(getByText("foo"), leftClick);
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(container, leftClick);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should accept outer boundary", () => {
    const callback = jest.fn();

    const MockComponent = () => {
      const innerElementRef = useRef<HTMLDivElement>(null);
      const outerElementRef = useRef<HTMLDivElement>(null);

      useClickOutside({
        callback,
        innerElementRef,
        outerElementRef
      });

      return (
        <div ref={outerElementRef}>
          <span>bar</span>
          <div ref={innerElementRef}>
            <span>foo</span>
          </div>
        </div>
      );
    };

    const { getByText, rerender } = render(<MockComponent />);

    rerender(<MockComponent />);

    act(() => {
      fireEvent.click(getByText("foo"), leftClick);
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(document.body, leftClick);
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(getByText("bar"), leftClick);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
