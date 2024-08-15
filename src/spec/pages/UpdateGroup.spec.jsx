import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAtom, useSetAtom } from "jotai";
import { BrowserRouter, useNavigate } from "react-router-dom";

import UpdateGroup from "../../pages/Group/Modal/UpdateGroup";

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
    useParams: vi.fn(() => {
      return { groupId: 1 };
    }),
  };
});

vi.mock("../../api/axiosConfig", () => {
  return {
    default: {
      put: vi.fn(),
    },
  };
});

vi.mock("../../api/validators", () => ({
  validateGroupName: vi.fn(),
}));

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("UpdateGroup 컴포넌트 단위 테스트", () => {
  const mockNavigate = vi.fn();
  const mockSetGroups = vi.fn();
  const mockFetchGroupOptions = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useAtom.mockReturnValue([
      [
        { id: 1, name: "기존 이름" },
        { id: 2, name: "기존 이름2" },
      ],
      mockSetGroups,
    ]);
    useSetAtom.mockReturnValue(mockFetchGroupOptions);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("그룹 이름 입력 필드가 올바르게 렌더링 되어야 한다.", () => {
    renderWithRouter(<UpdateGroup />);

    const inputElement = screen.getByLabelText("그룹 이름", { exact: false });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("기존 이름");
  });

  it("중복되지 않은 그룹 이름으로 수정할 수 있다.", async () => {
    const anotherGroupName = "다른 그룹";
    validateGroupName.mockReturnValue({ isValid: true });
    axios.put.mockResolvedValue({ data: { id: 1, name: anotherGroupName } });

    renderWithRouter(<UpdateGroup />);

    const inputElement = screen.getByLabelText("그룹 이름", { exact: false });
    expect(inputElement).toHaveValue("기존 이름");

    fireEvent.change(inputElement, { target: { value: anotherGroupName } });

    const buttonElement = screen.getByText("그룹 수정");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith("/v1/groups/1", {
        name: anotherGroupName,
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

    renderWithRouter(<UpdateGroup />);

    const inputElement = screen.getByLabelText("그룹 이름", { exact: false });
    fireEvent.change(inputElement, { target: { value: "중복된 그룹 이름" } });

    const buttonElement = screen.getByText("그룹 수정");
    fireEvent.click(buttonElement);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "다른 이름" } });
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it("서버의 유효성 검사를 통과하지 못하면 에러 메시지가 렌더링 된다.", async () => {
    const errorMessage = "이미 사용하고 있는 그룹 이름입니다.";

    validateGroupName.mockReturnValue({ isValid: true });
    axios.put.mockRejectedValue({
      response: {
        status: 409,
        data: errorMessage,
      },
    });

    renderWithRouter(<UpdateGroup />);

    const inputElement = screen.getByLabelText("그룹 이름", { exact: false });
    fireEvent.change(inputElement, { target: { value: "중복된 그룹 이름" } });

    const buttonElement = screen.getByText("그룹 수정");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
