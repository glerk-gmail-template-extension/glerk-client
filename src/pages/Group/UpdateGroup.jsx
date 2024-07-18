import { useState } from "react";
import { LuFolderEdit } from "react-icons/lu";

import ModalContainer from "../../components/modal/ModalContainer";
import ContentWrapper from "../../components/modal/ContentWrapper";
import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";

export default function UpdateGroup() {
  const [validationMessage, setValidationMessage] = useState(null);

  return (
    <ModalContainer>
      <ContentWrapper title="Update Group" url="/templates">
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-10">
            <Input
              label="New Group Name"
              validationMessage={validationMessage}
            />
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="Update"
              backgroundColor="bg-blue"
              textColor="text-white"
              hoverBackgroundColor="hover:bg-dark-blue"
            >
              <LuFolderEdit />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
