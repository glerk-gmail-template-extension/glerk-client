import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import LabelSelectBox from "../../../components/form/LabelSelectBox";

describe("LabelSelectBox 컴포넌트 단위 테스트", () => {
  const mockOptions = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];

  it("SelectBox의 옵션 요소와 라벨이 올바르게 렌더링 되어야 한다.", () => {
    render(
      <LabelSelectBox
        name="test-select"
        label="테스트 선택"
        value="1"
        options={mockOptions}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("테스트 선택")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("필수 필드일 경우 별표가 표시되어야 한다.", () => {
    render(
      <LabelSelectBox
        name="test-select"
        label="테스트 선택"
        isRequired={true}
        value="1"
        options={mockOptions}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("새로운 옵션이 선택될 경우 onChange 함수가 호출된다.", () => {
    const mockOnChange = vi.fn();

    render(
      <LabelSelectBox
        name="test-select"
        label="테스트 선택"
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
      <LabelSelectBox
        name="test-select"
        label="테스트 선택"
        value="1"
        options={mockOptions}
        onChange={() => {}}
      >
        <span>+</span>
      </LabelSelectBox>,
    );

    expect(screen.getByText("+")).toBeInTheDocument();
  });
});
