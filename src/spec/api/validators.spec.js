import { describe, expect, it } from "vitest";

import { validateGroupName, validateTemplate } from "../../api/validators";

describe("그룹 유효성 검사", () => {
  it("그룹 이름은 1~30자 사이여야 합니다.", () => {
    const groups = [];
    const name = "";

    const { isValid } = validateGroupName(groups, name);

    expect(isValid).toBe(false);
  });

  it("그룹 이름은 중복으로 저장할 수 없습니다.", () => {
    const groups = [{ name: "group" }];
    const name = "group";

    const { isValid } = validateGroupName(groups, name);
    expect(isValid).toBe(false);
  });

  it("그룹 이름 유효성 검사 성공", () => {
    const groups = [{ name: "service" }];
    const name = "group";

    const { isValid } = validateGroupName(groups, name);
    expect(isValid).toBe(true);
  });
});

describe("템플릿 유효성 검사", () => {
  it("템플릿 이름, 해시태그, 그룹은 필수값 입니다.", () => {
    const { name, hashtag, groupId } = validateTemplate({
      name: "",
      hashtag: "",
      groupId: "",
      subject: "",
    });

    expect(name).toBe("템플릿 이름을 입력해 주세요.");
    expect(hashtag).toBe("해시태그를 입력해 주세요.");
    expect(groupId).toBe("그룹을 선택해 주세요.");
  });

  it("템플릿 이름은 1~50자 사이여야 합니다.", () => {
    const { name } = validateTemplate({
      name: "A".repeat(51),
      hashtag: null,
      groupId: null,
      subject: null,
    });

    expect(name).toBe("템플릿 이름은 1~50자 사이여야 합니다.");
  });

  it("해시태그는 1~50자 사이여야 합니다.", () => {
    const { hashtag } = validateTemplate({
      name: null,
      hashtag: "A".repeat(51),
      groupId: null,
      subject: null,
    });

    expect(hashtag).toBe("해시태그는 1~50자 사이여야 합니다.");
  });

  it("제목은 50자를 초과할 수 없습니다.", () => {
    const { subject } = validateTemplate({
      name: null,
      hashtag: null,
      groupId: null,
      subject: "A".repeat(51),
    });

    expect(subject).toBe("제목은 50자를 초과할 수 없습니다.");
  });

  it("템플릿 유효성 검사 성공", () => {
    const messages = validateTemplate({
      name: "문의 답변",
      hashtag: "#answer",
      groupId: 1,
      subject: "",
    });

    const expectedMessages = {
      name: "",
      hashtag: "",
      groupId: "",
      subject: "",
    };

    expect(messages).toEqual(expectedMessages);
  });
});
