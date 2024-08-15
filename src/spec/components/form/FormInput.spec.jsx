import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormInput from "../../../components/form/FormInput";

describe("FormInput 컴포넌트 단위 테스트", () => {
  it("라벨과 입력 필드를 올바르게 렌더링 한다.", () => {
    render(<FormInput label="이름" name="name" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("이름")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("필수 필드일 경우 별표를 표시한다.", () => {
    render(
      <FormInput
        label="이름"
        name="name"
        value=""
        onChange={() => {}}
        isRequired={true}
      />,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("입력값이 변경되면 onChange 함수가 호출된다.", () => {
    const mockOnChange = vi.fn();

    render(
      <FormInput label="이름" name="name" value="" onChange={mockOnChange} />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "홍길동" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("유효성 검사 메시지가 있을 경우 올바르게 렌더링 된다.", () => {
    render(
      <FormInput
        label="이름"
        name="name"
        value=""
        onChange={() => {}}
        validationMessage="이름을 입력해주세요"
      />,
    );

    expect(screen.getByText("이름을 입력해주세요")).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("border-red");
    expect(inputElement).toHaveClass("text-red");
    expect(inputElement).toHaveClass("placeholder-red");

    const labelElement = screen.getByText("이름");
    expect(labelElement).toHaveClass("text-red");
  });

  it("placeholder가 올바르게 렌더링 된다.", () => {
    render(
      <FormInput
        label="이름"
        name="name"
        value=""
        onChange={() => {}}
        placeholder="이름을 입력하세요"
      />,
    );

    const inputElement = screen.getByPlaceholderText("이름을 입력하세요");
    expect(inputElement).toBeInTheDocument();
  });

  it("input창에서 blur하면 onBlur 함수가 호출된다.", () => {
    const mockOnBlur = vi.fn();

    render(
      <FormInput
        label="이름"
        name="name"
        value=""
        onChange={() => {}}
        onBlur={mockOnBlur}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });
});
