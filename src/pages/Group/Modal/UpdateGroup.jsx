import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { LuFolderEdit } from "react-icons/lu";

import ModalContainer from "../../../components/modal/ModalContainer";
import ContentWrapper from "../../../components/modal/ContentWrapper";
import LabelInput from "../../../components/form/LabelInput";
import Button from "../../../components/ui/Button";

import axios from "../../../api/axiosConfig";
import { validateGroupName } from "../../../api/validators";
import { groupsAtom, groupOptionsAsyncAtom } from "../../../lib/atoms";

export default function UpdateGroup() {
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);
  const { groupId } = useParams();
  const [groups, setGroups] = useAtom(groupsAtom);
  const fetchGroupOptions = useSetAtom(groupOptionsAsyncAtom);
  const [groupName, setGroupName] = useState(
    groups.find((group) => group.id === Number(groupId))?.name || "",
  );

  const handleUpdateClick = async () => {
    const result = validateGroupName(groups, groupName);

    if (!result.isValid) {
      setValidationMessage(result.error);
      return;
    }

    try {
      const { data } = await axios.put(`/v1/groups/${groupId}`, {
        name: groupName,
      });

      setGroups((prev) =>
        prev.map((group) => {
          if (group.id !== data.id) {
            return group;
          }

          return data;
        }),
      );

      fetchGroupOptions();
      navigate("/groups");
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404 || status === 409) {
          setValidationMessage(error.response.data);
        }
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
      <ContentWrapper title="Update Group" url="/groups">
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-10">
            <LabelInput
              label="그룹 이름"
              name="group"
              value={groupName}
              onChange={handleInputChange}
              isRequired
              validationMessage={validationMessage}
            />
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="그룹 수정"
              backgroundColor="bg-blue"
              textColor="text-white"
              hoverBackgroundColor="hover:bg-dark-blue"
              onClick={handleUpdateClick}
            >
              <LuFolderEdit />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
