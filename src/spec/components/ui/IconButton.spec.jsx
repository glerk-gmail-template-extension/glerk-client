import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import IconButton from "../../../components/ui/IconButton";

describe("IconButton 컴포넌트 단위 테스트", () => {
  it("children이 렌더링 되어야한다.", () => {
    render(
      <IconButton tooltip="Test tooltip">
        <span>Icon</span>
      </IconButton>,
    );

    const iconElement = screen.getByText("Icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("hover 할 경우 툴팁이 보여야한다.", async () => {
    render(
      <IconButton tooltip="Test tooltip">
        <span>Icon</span>
      </IconButton>,
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.mouseEnter(buttonElement);

    const tooltipElement = await screen.findByText("Test tooltip");
    expect(tooltipElement).toBeInTheDocument();

    fireEvent.mouseLeave(buttonElement);
    expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();
  });

  it("버튼을 클릭하면 onClick 함수가 호출되어야 한다.", () => {
    const onClickMock = vi.fn();

    render(
      <IconButton onClick={onClickMock}>
        <span>Icon</span>
      </IconButton>,
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("isActive가 true일 경우 버튼의 배경색이 회색이다.", () => {
    render(
      <IconButton isActive={true}>
        <span>Icon</span>
      </IconButton>,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("bg-gray-200");
  });

  it("isActive가 false일 경우 hover 스타일이 적용된다.", () => {
    render(
      <IconButton isActive={false}>
        <span>Icon</span>
      </IconButton>,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("hover:bg-gray-100");
  });
});
