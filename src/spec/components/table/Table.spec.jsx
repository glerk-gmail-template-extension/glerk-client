import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import Table from "../../../components/table/Table";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Table 컴포넌트 단위 테스트", () => {
  const mockTemplates = [
    { id: "1", name: "Template 1", createdAt: "2024-08-01T00:00:00.000Z" },
    { id: "2", name: "Template 2", createdAt: "2024-08-02T00:00:00.000Z" },
    { id: "3", name: "Template 3", createdAt: "2024-08-03T00:00:00.000Z" },
  ];

  const renderComponent = (props = {}) => {
    return render(
      <MemoryRouter>
        <Table groupId="group1" templates={mockTemplates} {...props} />
      </MemoryRouter>,
    );
  };

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("테이블 헤더가 올바르게 렌더링 되어야 한다.", () => {
    renderComponent();

    expect(screen.getByText("Template name")).toBeInTheDocument();
    expect(screen.getByText("Created on")).toBeInTheDocument();
  });

  it("테이블의 행의 갯수가 올바르게 렌더링 되어야 한다.", () => {
    renderComponent();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockTemplates.length + 1);
  });

  it("전체 선택 체크박스를 클릭하면 모든 템플릿이 선택되어야 한다.", () => {
    renderComponent();

    const selectAllCheckbox = screen.getByLabelText("Select all checkboxes");
    fireEvent.click(selectAllCheckbox);

    const individualCheckboxes = screen.getAllByRole("checkbox");
    individualCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it("전체 선택 체크박스를 해제하면 모든 템플릿이 선택 해제되어야 한다.", () => {
    renderComponent();

    const selectAllCheckbox = screen.getByLabelText("Select all checkboxes");
    fireEvent.click(selectAllCheckbox);
    fireEvent.click(selectAllCheckbox);

    const individualCheckboxes = screen.getAllByRole("checkbox");
    individualCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("체크박스를 선택/해제할 경우 올바르게 렌더링 되어야 한다.", () => {
    renderComponent();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(0);

    const checkboxForSelectAll = checkboxes[0];
    const checkboxForFirstTemplate = checkboxes[1];
    const checkboxForSecondTemplate = checkboxes[2];

    fireEvent.click(checkboxForFirstTemplate);
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(1);

    fireEvent.click(checkboxForSecondTemplate);
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(2);

    fireEvent.click(checkboxForFirstTemplate);
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(1);

    fireEvent.click(checkboxForSelectAll);
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(
      checkboxes.length,
    );

    fireEvent.click(checkboxForSelectAll);
    expect(checkboxes.filter((cb) => cb.checked).length).toBe(0);
  });

  it("템플릿 선택 시 삭제 버튼이 보여야 한다.", () => {
    renderComponent();

    const firstCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(firstCheckbox);

    expect(screen.getByText("템플릿 삭제")).toBeInTheDocument();
  });

  it("선택된 템필릿이 없을 경우 삭제 버튼이 보이지 않는다.", () => {
    renderComponent();

    expect(screen.queryByText("템플릿 삭제")).not.toBeInTheDocument();
  });

  it("등록된 템플릿이 없을 경우 템플릿 등록 문구가 보인다.", () => {
    renderComponent({ templates: [] });

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("템플릿 등록")).toBeInTheDocument();
  });

  it("템플릿 삭제 버튼을 클릭하면 삭제 확인 모달 경로로 이동하는 navigate 함수가 호출된다.", () => {
    renderComponent();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    const deleteButton = screen.getByRole("button", { name: /템플릿 삭제/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/groups/group1/delete/templates",
      { state: ["1"] },
    );
  });
});
