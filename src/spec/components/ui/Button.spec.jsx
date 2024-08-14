import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../../../components/ui/Button";

describe("Button 컴포넌트 단위 테스트", () => {
  it("버튼 텍스트가 올바르게 렌더링 되어야 한다.", () => {
    render(<Button text="클릭하세요" />);

    const buttonTextElement = screen.getByText("클릭하세요");
    expect(buttonTextElement).toBeInTheDocument();
  });

  it("아이콘이 제공되었을 때 아이콘이 렌더링 되어야 한다.", () => {
    render(<Button text="클릭하세요" children={<span>아이콘</span>} />);

    const chidrenElement = screen.getByText("아이콘");
    expect(chidrenElement).toBeInTheDocument();
  });

  it("버튼을 클릭하면 onClick 핸들러가 호출되어야 한다.", () => {
    const onClickMock = vi.fn();

    render(<Button onClick={onClickMock} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("버튼의 기본 스타일이 올바르게 적용되어야 한다.", () => {
    render(<Button />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass(
      "text-dark-gray",
      "border-stroke",
      "bg-white",
      "hover:bg-gray-50",
    );
  });

  it("버튼의 커스텀 스타일이 올바르게 적용되어야 한다.", () => {
    render(
      <Button
        text="클릭하세요"
        textColor="text-red-500"
        borderColor="border-blue-500"
      />,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("text-red-500", "border-blue-500");
  });
});
