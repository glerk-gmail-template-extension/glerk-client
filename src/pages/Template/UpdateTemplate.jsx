import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import Template from "./Form";

import axios from "../../api/axiosConfig";
import { toastMessageAtom } from "../../lib/atoms";

export default function UpdateTemplate() {
  const { templateId } = useParams();
  const setToastMessage = useSetAtom(toastMessageAtom);
  const navigate = useNavigate();

  const handleSubmit = async (template) => {
    await axios.put(`/v1/templates/${templateId}`, template);

    setToastMessage({
      message: "수정 완료되었습니다.",
      isWarning: false,
    });

    navigate("/groups");
  };

  const fetchInitialValues = () => axios.get(`/v1/templates/${templateId}`);

  return (
    <>
      <Template
        onSubmit={handleSubmit}
        templateId={templateId}
        fetchInitialValues={fetchInitialValues}
      />
      <Outlet />
    </>
  );
}
