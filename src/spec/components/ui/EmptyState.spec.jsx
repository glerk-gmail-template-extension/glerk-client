import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";

describe("EmptyState 컴포넌트 단위 테스트", () => {
  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it("그룹 내 저장한 템플릿이 없을 경우 템플릿 추가 안내 문구가 보인다.", () => {
    renderWithRouter(<EmptyState groupId="1" />);

    const headerElement = screen.getByText("템플릿이 아직 없습니다.");
    const paragraphElement = screen.getByText("새로운 템플릿을 추가해 보세요.");
    expect(headerElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/templates/new");
  });

  it("저장한 그룹이 없을 경우 그룹 추가 안내 문구가 보인다.", () => {
    renderWithRouter(<EmptyState />);

    const headerElement = screen.getByText("그룹이 아직 없습니다.");
    const paragraphElement = screen.getByText("새로운 그룹을 추가해 보세요.");
    expect(headerElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/groups/new");
  });
});
