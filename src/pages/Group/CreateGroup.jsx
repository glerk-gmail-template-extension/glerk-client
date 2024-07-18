import { useState } from "react";
import { LuFolderPlus } from "react-icons/lu";

import ModalContainer from "../../components/modal/ModalContainer";
import ContentWrapper from "../../components/modal/ContentWrapper";
import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";

export default function CreateGroup() {
  const [validationMessage, setValidationMessage] = useState(null);

  return (
    <ModalContainer>
      <ContentWrapper title="New Group" url="/templates">
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-10">
            <Input
              label="New Group Name"
              validationMessage={validationMessage}
            />
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="Create"
              backgroundColor="bg-blue"
              textColor="text-white"
              hoverBackgroundColor="bg-blue"
            >
              <LuFolderPlus />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
