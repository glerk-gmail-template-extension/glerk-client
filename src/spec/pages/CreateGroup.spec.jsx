import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAtom, useSetAtom } from "jotai";
import { BrowserRouter, useNavigate } from "react-router-dom";

import CreateGroup from "../../pages/Group/Modal/CreateGroup";

import axios from "../../api/axiosConfig";
import { validateGroupName } from "../../api/validators";

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useAtom: vi.fn((inital) => {
      return [inital, vi.fn()];
    }),
    useSetAtom: vi.fn(),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../api/axiosConfig", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

vi.mock("../../api/validators", () => ({
  validateGroupName: vi.fn(),
}));

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("CreateGroup 컴포넌트 단위 테스트", () => {
  const mockNavigate = vi.fn();
  const mockSetGroups = vi.fn();
  const mockFetchGroupOptions = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useAtom.mockReturnValue([[], mockSetGroups]);
    useSetAtom.mockReturnValue(mockFetchGroupOptions);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("그룹 이름 입력 필드가 올바르게 렌더링 되어야 한다.", () => {
    renderWithRouter(<CreateGroup />);
    expect(
      screen.getByLabelText("새로운 그룹 이름", { exact: false }),
    ).toBeInTheDocument();
  });

  it("중복되지 않은 그룹 이름으로 그룹을 생성할 수 있다.", async () => {
    const newGroupName = "새 그룹";
    validateGroupName.mockReturnValue({ isValid: true });
    axios.post.mockResolvedValue({ data: { id: 1, name: newGroupName } });

    renderWithRouter(<CreateGroup />);

    const inputElement = screen.getByLabelText("새로운 그룹 이름", {
      exact: false,
    });
    fireEvent.change(inputElement, { target: { value: newGroupName } });

    const buttonElement = screen.getByText("그룹 등록");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/v1/groups", {
        name: newGroupName,
      });
    });

    expect(mockSetGroups).toHaveBeenCalled();
    expect(mockFetchGroupOptions).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/groups");
  });

  it("유효성 검사를 통과하지 못하면 에러 메시지가 렌더링 된다.", async () => {
    const errorMessage = "이미 사용하고 있는 그룹 이름입니다.";

    validateGroupName.mockReturnValue({
      isValid: false,
      error: errorMessage,
    });

    renderWithRouter(<CreateGroup />);

    const inputElement = screen.getByLabelText("새로운 그룹 이름", {
      exact: false,
    });
    fireEvent.change(inputElement, { target: { value: "중복된 그룹 이름" } });

    const buttonElement = screen.getByText("그룹 등록");
    fireEvent.click(buttonElement);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "다른 이름" } });
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it("서버의 유효성 검사를 통과하지 못하면 에러 메시지가 렌더링 된다.", async () => {
    const errorMessage = "이미 사용하고 있는 그룹 이름입니다.";

    validateGroupName.mockReturnValue({ isValid: true });
    axios.post.mockRejectedValue({
      response: {
        status: 409,
        data: errorMessage,
      },
    });

    renderWithRouter(<CreateGroup />);

    const inputElement = screen.getByLabelText("새로운 그룹 이름", {
      exact: false,
    });
    fireEvent.change(inputElement, { target: { value: "중복된 그룹 이름" } });

    const buttonElement = screen.getByText("그룹 등록");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
