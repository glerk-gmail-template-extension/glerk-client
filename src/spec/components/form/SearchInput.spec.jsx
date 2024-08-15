import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchInput from "../../../components/form/SearchInput";

vi.mock("react-icons/io5", () => ({
  IoSearch: () => <div data-testid="search-icon" />,
}));

describe("SearchInput 컴포넌트 단위 테스트", () => {
  it("올바른 prop으로 input을 렌더링 한다.", () => {
    render(
      <SearchInput
        name="search"
        value=""
        onChange={() => {}}
        placeholder="검색어를 입력하세요"
      />,
    );

    const inputElement = screen.getByPlaceholderText("검색어를 입력하세요");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "search");
    expect(inputElement).toHaveAttribute("name", "search");
  });

  it("검색 아이콘을 렌더링 한다.", () => {
    render(<SearchInput name="search" value="" onChange={() => {}} />);

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("입력값이 변경되면 onChange 함수가 호출된다.", () => {
    const mockOnChange = vi.fn();

    render(<SearchInput name="search" value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "테스트 검색어" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("검색어를 입력하면 onKeyDown 함수가 호출 된다.", () => {
    const mockOnKeyDown = vi.fn();

    render(
      <SearchInput
        name="search"
        value=""
        onChange={() => {}}
        onKeyDown={mockOnKeyDown}
      />,
    );

    const inputElement = screen.getByRole("searchbox");
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
  });

  it("value prop이 올바르게 렌더링 된다.", () => {
    render(
      <SearchInput name="search" value="초기 검색어" onChange={() => {}} />,
    );

    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toHaveValue("초기 검색어");
  });
});
