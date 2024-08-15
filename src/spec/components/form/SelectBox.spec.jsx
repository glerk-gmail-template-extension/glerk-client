import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SelectBox from "../../../components/form/SelectBox";

describe("SelectBox 컴포넌트 단위 테스트", () => {
  const mockOptions = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];

  it("SelectBox의 옵션 요소가 올바르게 렌더링 되어야 한다.", () => {
    render(
      <SelectBox
        name="test-select"
        value="1"
        options={mockOptions}
        onChange={() => {}}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("선택된 값이 올바르게 렌더링 되어야 한다.", () => {
    render(
      <SelectBox
        name="test-select"
        value="2"
        options={mockOptions}
        onChange={() => {}}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("2");
  });

  it("새로운 옵션이 선택될 경우 onChange 함수가 호출된다.", () => {
    const mockOnChange = vi.fn();

    render(
      <SelectBox
        name="test-select"
        value="1"
        options={mockOptions}
        onChange={mockOnChange}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "3" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("주어진 children prop이 올바르게 렌더링 된다.", () => {
    render(
      <SelectBox
        name="test-select"
        value="1"
        options={mockOptions}
        onChange={() => {}}
      >
        <span>+</span>
      </SelectBox>,
    );

    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("hasLabel가 true일 경우 올바른 스타일 클래스가 적용된다.", () => {
    render(
      <SelectBox
        name="test-select"
        value="1"
        options={mockOptions}
        onChange={() => {}}
        hasLabel={true}
      />,
    );

    const containerElement = screen.getByRole("combobox").closest("div");
    expect(containerElement).toHaveClass("mt-1.5");
  });
});
