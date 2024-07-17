import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";

import ModalContainer from "../../components/modal/ModalContainer";
import ContentWrapper from "../../components/modal/ContentWrapper";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

export default function DeleteGroup() {
  return (
    <ModalContainer>
      <ContentWrapper>
        <div className="flex justify-between px-8 pt-6 pb-3 border-b">
          <h1 className="text-xl font-semibold">Delete Group</h1>
          <Link to="/templates">
            <IconButton tooltip="Close">
              <HiOutlineXMark size={25} />
            </IconButton>
          </Link>
        </div>
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-5 text-dark-gray">
            <p>Are you sure you want to delete this group?</p>
            <p>
              This action will permanently delete the group and all templates
              within it.
            </p>
            <br />
            <p>
              This cannot be undone. Click{" "}
              <span className="font-semibold">Delete</span> to confirm the
              deletion.
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="Delete"
              backgroundColor="bg-red"
              textColor="text-white"
              hoverBackgroundColor="bg-red"
            >
              <FaRegTrashCan />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
