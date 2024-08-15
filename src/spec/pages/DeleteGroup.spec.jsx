import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSetAtom } from "jotai";
import { BrowserRouter, useNavigate } from "react-router-dom";

import DeleteGroup from "../../pages/Group/Modal/DeleteGroup";

import axios from "../../api/axiosConfig";

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
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
      delete: vi.fn(),
    },
  };
});

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("DeleteGroup 컴포넌트 단위 테스트", () => {
  const mockNavigate = vi.fn();
  const mockSetGroupList = vi.fn();
  const mockSetToastMessage = vi.fn();
  const mockFetchGroupOptions = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useNavigate.mockReturnValue(mockNavigate);
    useSetAtom
      .mockReturnValueOnce(mockSetGroupList)
      .mockReturnValueOnce(mockSetToastMessage)
      .mockReturnValueOnce(mockFetchGroupOptions);
  });

  it("그룹 삭제 모달이 올바르게 렌더링 되어야 한다.", () => {
    renderWithRouter(<DeleteGroup />);

    const headerElement = screen.getByText("그룹 삭제");
    expect(headerElement).toBeInTheDocument();
  });

  it("삭제 버튼을 누르면 서버로 삭제가 요청된다.", async () => {
    axios.delete.mockResolvedValue({ data: 1 });

    renderWithRouter(<DeleteGroup />);

    const buttonElement = screen.getByRole("button", { name: "삭제" });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("/v1/groups/1");
    });

    expect(mockFetchGroupOptions).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/groups");
  });

  it("잘못된 요청을 할 경우 삭제되지 않고 토스트 메시지가 렌더링 된다.", async () => {
    axios.delete.mockRejectedValue({
      response: {
        status: 404,
        data: "존재하지 않는 그룹",
      },
    });

    renderWithRouter(<DeleteGroup />);

    const buttonElement = screen.getByRole("button", { name: "삭제" });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("/v1/groups/1");
    });

    expect(mockSetToastMessage).toHaveBeenCalledWith({
      message: "존재하지 않는 그룹",
      isWarning: true,
    });
  });
});
