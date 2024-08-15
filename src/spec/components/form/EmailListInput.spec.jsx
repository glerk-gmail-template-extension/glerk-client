import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";

import EmailListInput from "../../../components/form/EmailListInput";

import axios from "../../../api/axiosConfig";

vi.mock("../../../api/axiosConfig", () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe("EmailListInput 컴포넌트 단위 테스트", () => {
  const mockLabel = "수신자 이메일";
  const mockName = "recipients";
  const mockValue = ["test@example.com", "hello@example.com"];

  it("컴포넌트가 주어진 정보에 맞게 올바르게 렌더링 되어야 한다.", () => {
    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText(mockLabel)).toBeInTheDocument();

    mockValue.forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it("새로운 이메일을 입력하고 엔터를 누른 경우 새로운 이메일이 추가되어야 한다.", () => {
    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "new@example.com" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    [...mockValue, "new@example.com"].forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it("삭제 버튼을 누를 경우 올바르게 삭제 되어야 한다.", () => {
    const email = "test1@example.com";

    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={[email]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText(email)).toBeInTheDocument();

    const deleteButtonElement = screen.getByRole("button", {
      name: "delete email",
    });
    fireEvent.click(deleteButtonElement);

    waitForElementToBeRemoved(() => screen.queryByText(email))
      .then(() => {
        expect(screen.queryByText(email)).not.toBeInTheDocument();
      })
      .catch((err) => console.log(err));
  });

  it("Backspace를 누를 경우 저장된 이메일 중 마지막 이메일이 삭제 되어야 한다.", () => {
    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    mockValue.forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });

    const inputElement = screen.getByRole("textbox");
    fireEvent.keyDown(inputElement, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8,
    });

    expect(screen.getByText(mockValue[0])).toBeInTheDocument();
    expect(screen.queryByText(mockValue[1])).not.toBeInTheDocument();
  });

  it("이메일 자동완성 리스트를 요청하면 반환 값이 화면에 렌더링 된다.", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ email: "suggestion@example.com" }],
    });

    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "hello" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/v1/autocomplete?email=hello");
    });

    expect(screen.getByText("suggestion@example.com")).toBeInTheDocument();
  });

  it("이메일 자동완성 리스트의 요소를 방향키로 선택할 수 있다.", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { email: "suggestion1@example.com" },
        { email: "suggestion2@example.com" },
      ],
    });

    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "hello" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/v1/autocomplete?email=hello");
    });

    expect(screen.getByText("suggestion1@example.com")).toBeInTheDocument();

    fireEvent.keyDown(inputElement, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    expect(screen.getByText("suggestion1@example.com")).toHaveClass(
      "bg-gray-200",
    );

    fireEvent.keyDown(inputElement, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    expect(screen.getByText("suggestion2@example.com")).toHaveClass(
      "bg-gray-200",
    );

    fireEvent.keyDown(inputElement, {
      key: "ArrowUp",
      code: "ArrowUp",
      charCode: 38,
    });

    expect(screen.getByText("suggestion1@example.com")).toHaveClass(
      "bg-gray-200",
    );
  });

  it("이메일 자동완성 리스트의 요소를 방향키로 선택한 후 엔터를 누르면 이메일이 추가 된다.", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { email: "suggestion1@example.com" },
        { email: "suggestion2@example.com" },
      ],
    });

    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "hello" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/v1/autocomplete?email=hello");
    });

    expect(screen.getByText("suggestion1@example.com")).toBeInTheDocument();

    fireEvent.keyDown(inputElement, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    expect(screen.getByText("suggestion1@example.com")).toHaveClass(
      "bg-gray-200",
    );

    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(screen.getByText("suggestion1@example.com")).toBeInTheDocument();
  });

  it("이메일 자동완성 리스트의 요소를 방향키로 선택한 후 esc를 누르면 이메일이 추가되지 않는다.", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { email: "suggestion1@example.com" },
        { email: "suggestion2@example.com" },
      ],
    });

    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "hello" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/v1/autocomplete?email=hello");
    });

    expect(screen.getByText("suggestion1@example.com")).toBeInTheDocument();

    fireEvent.keyDown(inputElement, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    expect(screen.getByText("suggestion1@example.com")).toHaveClass(
      "bg-gray-200",
    );

    fireEvent.keyDown(inputElement, {
      key: "Escape",
      code: "Escape",
      charCode: 27,
    });

    expect(
      screen.queryByText("suggestion1@example.com"),
    ).not.toBeInTheDocument();
  });

  it("이메일 형식이 아닌 경우 이메일이 추가되지 않는다.", () => {
    render(
      <EmailListInput
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.input(inputElement, { target: { value: "new" } });
    fireEvent.blur(inputElement);

    expect(screen.queryByText("new")).not.toBeInTheDocument();
  });
});
