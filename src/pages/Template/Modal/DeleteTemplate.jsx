import { useNavigate, useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { FaRegTrashCan } from "react-icons/fa6";

import ModalContainer from "../../../components/modal/ModalContainer";
import ContentWrapper from "../../../components/modal/ContentWrapper";
import Button from "../../../components/ui/Button";

import axios from "../../../api/axiosConfig";
import { toastMessageAtom } from "../../../lib/atoms";

export default function DeleteTemplate() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const setToastMessage = useSetAtom(toastMessageAtom);

  const handleDeleteTemplateClick = async () => {
    try {
      await axios.delete(`/v1/templates/${templateId}`);

      navigate("/groups");
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 404 || status === 403) {
          setToastMessage({ message: error.response.data, isWarning: true });
        }
      }
    }
  };

  return (
    <ModalContainer>
      <ContentWrapper title="템플릿 삭제" url={`/templates/edit/${templateId}`}>
        <div className="grid items-end gap-6 px-8 mb-6">
          <div className="pt-5 text-dark-gray">
            <p>템플릿을 삭제하시겠습니까?</p>
            <p>이 작업을 수행하면 템플릿이 영구적으로 삭제됩니다.</p>
            <br />
            <p>
              계속 하길 원하신다면 <span className="font-semibold">삭제</span>{" "}
              버튼을 클릭해 주세요.
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <Button
              text="삭제"
              backgroundColor="bg-red"
              textColor="text-white"
              hoverBackgroundColor="hover:bg-dark-red"
              onClick={handleDeleteTemplateClick}
            >
              <FaRegTrashCan />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
}
