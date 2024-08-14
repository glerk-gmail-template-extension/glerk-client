import { useAtom } from "jotai";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import AppWrapper from "../../../components/ui/AppWrapper";

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useAtom: vi.fn((inital) => {
      return [inital, vi.fn()];
    }),
  };
});

vi.mock("../../../App", () => ({
  default: vi.fn(() => <div>App 컴포넌트</div>),
}));

vi.mock("../../../components/ui/ToastMessage", () => ({
  default: vi.fn(({ message, isWarning }) => (
    <div data-testid="toast-message">
      {message} - {isWarning ? "Warning" : "Info"}
    </div>
  )),
}));

const TestLocation = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe("AppWrapper 컴포넌트 단위 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("인증 경로에서 Outlet을 렌더링 한다.", async () => {
    useAtom
      .mockReturnValueOnce([{ message: null, isWarning: false }])
      .mockReturnValueOnce([null, vi.fn()]);

    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="*" element={<AppWrapper />}>
            <Route path="signup" element={<div>회원가입</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("회원가입")).toBeInTheDocument();
  });

  it("사용자가 로그인한 경우 App 컴포넌트를 렌더링 한다.", async () => {
    useAtom
      .mockReturnValueOnce([{ message: null, isWarning: false }])
      .mockReturnValueOnce([{ username: "testuser" }, vi.fn()]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="*" element={<AppWrapper />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText("App 컴포넌트")).toBeInTheDocument();
  });

  it("사용자가 로그인하지 않은 경우 /signup으로 리다이렉트 한다.", async () => {
    useAtom
      .mockReturnValueOnce([{ message: null, isWarning: false }])
      .mockReturnValueOnce([null, vi.fn()]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="*" element={<AppWrapper />} />
            <Route path="signup" element={<TestLocation />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId("location").textContent).toBe("/signup");
  });

  it("토스트 메시지가 있을 경우 ToastMessage 컴포넌트를 렌더링 한다.", async () => {
    useAtom
      .mockReturnValueOnce([{ message: "Test message", isWarning: true }])
      .mockReturnValueOnce([{ username: "testuser" }, vi.fn()]);

    await act(async () => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<AppWrapper />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId("toast-message")).toBeInTheDocument();
    expect(screen.getByText("Test message - Warning")).toBeInTheDocument();
  });
});
