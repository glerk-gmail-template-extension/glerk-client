import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ColorInput from "../../../components/form/ColorInput";

describe("ColorInput 컴포넌트 단위 테스트", () => {
  it("input 타입이 color인 요소가 올바르게 렌더링 되어야 한다.", () => {
    const { container } = render(
      <ColorInput
        id="test-color"
        tooltip="색상 선택"
        onColorChange={() => {}}
      />,
    );

    expect(container.querySelector("input[type='color']")).toBeInTheDocument();
    expect(container.querySelector("input[type='color']")).toHaveValue(
      "#000000",
    );
  });

  it("hover 할 경우 툴팁이 보이고 hover하지 않은 경우 툴팁이 보이지 않는다.", async () => {
    const { container } = render(
      <ColorInput
        id="test-color"
        tooltip="색상 선택"
        onColorChange={() => {}}
      />,
    );

    const colorInputElement = container.querySelector("input[type='color']");
    fireEvent.mouseEnter(colorInputElement);

    const tooltipElement = await screen.findByText("색상 선택");
    expect(tooltipElement).toBeInTheDocument();

    fireEvent.mouseLeave(colorInputElement);
    expect(screen.queryByText("색상 선택")).not.toBeInTheDocument();
  });

  it("색상을 변경하면 onColorChange 함수가 호출된다.", async () => {
    const mockOnColorChange = vi.fn();

    const { container } = render(
      <ColorInput
        id="test-color"
        tooltip="색상 선택"
        onColorChange={mockOnColorChange}
      />,
    );

    const colorInputElement = container.querySelector("input[type='color']");
    expect(colorInputElement).toHaveValue("#000000");

    fireEvent.change(colorInputElement, { target: { value: "#2c9f73" } });
    expect(mockOnColorChange).toHaveBeenCalledWith("#2c9f73");
  });
});
