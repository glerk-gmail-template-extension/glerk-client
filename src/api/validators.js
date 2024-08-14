export const validateGroupName = (groups, name) => {
  if (name.length <= 0 || name.length > 30) {
    return {
      isValid: false,
      error: "그룹 이름은 1~30자 사이여야 합니다.",
    };
  }

  if (groups.some((group) => group.name === name)) {
    return {
      isValid: false,
      error:
        "이미 사용하고 있는 그룹 이름입니다. \n다른 그룹 이름을 입력해 주세요.",
    };
  }

  return { isValid: true };
};

export const validateTemplate = ({ name, hashtag, groupId, subject }) => {
  const messages = {
    name: "",
    hashtag: "",
    groupId: "",
    subject: "",
  };

  if (!name) {
    messages.name = "템플릿 이름을 입력해 주세요.";
  }

  if (name?.length > 50) {
    messages.name = "템플릿 이름은 1~50자 사이여야 합니다.";
  }

  if (!hashtag || hashtag === "#") {
    messages.hashtag = "해시태그를 입력해 주세요.";
  }

  if (hashtag?.length > 50) {
    messages.hashtag = "해시태그는 1~50자 사이여야 합니다.";
  }

  if (subject?.length > 50) {
    messages.subject = "제목은 50자를 초과할 수 없습니다.";
  }

  if (!groupId) {
    messages.groupId = "그룹을 선택해 주세요.";
  }

  return messages;
};
