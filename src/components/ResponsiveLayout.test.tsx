import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ResponsiveLayout } from "./ResponsiveLayout";

describe("ResponsiveLayout breakpoint tests", () => {
  const resizeWindow = (width: number) => {
    // @ts-ignore
    window.innerWidth = width;
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
  };

  afterEach(() => {
    // Reset to default width after each test
    resizeWindow(1024);
  });

  it("shows 'mobile' label for width < 600", () => {
    resizeWindow(500);
    render(<ResponsiveLayout />);
    const label = screen.getByTestId("layout-label");
    expect(label).toHaveTextContent("mobile");
  });

  it("shows 'tablet' label for width between 600 and 1023", () => {
    resizeWindow(800);
    render(<ResponsiveLayout />);
    const label = screen.getByTestId("layout-label");
    expect(label).toHaveTextContent("tablet");
  });

  it("shows 'desktop' label for width >= 1024", () => {
    resizeWindow(1300);
    render(<ResponsiveLayout />);
    const label = screen.getByTestId("layout-label");
    expect(label).toHaveTextContent("desktop");
  });
});
