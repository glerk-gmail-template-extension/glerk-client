import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { LuFolderPlus } from "react-icons/lu";

import ModalContainer from "../../../components/modal/ModalContainer";
import ContentWrapper from "../../../components/modal/ContentWrapper";
import LabelInput from "../../../components/form/LabelInput";
import Button from "../../../components/ui/Button";

import axios from "../../../api/axiosConfig";
import { validateGroupName } from "../../../api/validators";
import { groupOptionsAsyncAtom, groupsAtom } from "../../../lib/atoms";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useAtom(groupsAtom);
  const fetchGroupOptions = useSetAtom(groupOptionsAsyncAtom);

  const handleCreateClick = async () => {
    const result = validateGroupName(groups, groupName);

    if (!result.isValid) {
      setValidationMessage(result.error);
      return;
    }

    try {
      const { data } = await axios.post("/v1/groups", { name: groupName });
      setGroups((prev) => [...prev, data]);
      await fetchGroupOptions();

      navigate("/groups");
    } catch (error) {
      const { status } = error.response;
      if (status === 409) {
        setValidationMessage(error.response.data.name);
      }
    }
  };

  const handleInputChange = (event) => {
    setGroupName(event.target.value);

    if (validationMessage && groupName) {
      setValidationMessage(null);
    }
  };

  return (
    <ModalContainer>
      <ContentWrapper title="New Group" url="/groups">
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-10">
            <LabelInput
              label="새로운 그룹 이름"
              name="group"
              value={groupName}
              onChange={handleInputChange}
              isRequired
              validationMessage={validationMessage}
            />
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="그룹 등록"
              backgroundColor="bg-blue"
              textColor="text-white"
              hoverBackgroundColor="hover:bg-dark-blue"
              onClick={handleCreateClick}
            >
              <LuFolderPlus />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
