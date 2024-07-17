import { useState } from "react";
import { Link } from "react-router-dom";
import { LuFolderPlus } from "react-icons/lu";
import { HiOutlineXMark } from "react-icons/hi2";

import ModalContainer from "../../components/modal/ModalContainer";
import ContentWrapper from "../../components/modal/ContentWrapper";

import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

export default function CreateGroup() {
  const [validationMessage, setValidationMessage] = useState(null);

  return (
    <ModalContainer>
      <ContentWrapper>
        <div className="flex justify-between px-8 pt-6 pb-3 border-b">
          <h1 className="text-xl font-semibold">New Group</h1>
          <Link to="/templates">
            <IconButton>
              <HiOutlineXMark size={25} />
            </IconButton>
          </Link>
        </div>
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-10">
            <Input label="New Group Name" message={validationMessage} />
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
