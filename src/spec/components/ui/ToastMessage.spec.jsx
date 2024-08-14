import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSetAtom } from "jotai";

import ToastMessage from "../../../components/ui/ToastMessage";

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useSetAtom: vi.fn(),
  };
});

describe("ToastMessage 컴포넌트 단위 테스트", () => {
  const mockSetToastMessage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useSetAtom.mockReturnValue(mockSetToastMessage);
  });

  it("경고 메시지가 올바르게 렌더링 되어야 한다.", () => {
    render(<ToastMessage message="경고 메시지입니다" isWarning={true} />);

    const messageElement = screen.getByText("경고 메시지입니다");
    expect(messageElement).toBeInTheDocument();

    const toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveClass("bg-light-orange");
  });

  it("정보 메시지가 올바르게 렌더링 되어야 한다.", () => {
    render(<ToastMessage message="정보 메시지입니다" isWarning={false} />);

    const messageElement = screen.getByText("정보 메시지입니다");
    expect(messageElement).toBeInTheDocument();

    const toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveClass("bg-light-sky");
  });

  it("닫기 버튼을 클릭하면 onClick 핸들러가 호출 되어야 한다.", () => {
    render(<ToastMessage message="닫기 버튼 테스트" isWarning={true} />);

    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    expect(mockSetToastMessage).toHaveBeenCalledWith({
      message: null,
      isWarning: true,
    });
  });
});
