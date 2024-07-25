import { useLocation, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import Template from "./Form";

import { toastMessageAtom } from "../../lib/atoms";
import axios from "../../api/axiosConfig";

export default function CreateTemplate() {
  const setToastMessage = useSetAtom(toastMessageAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (template) => {
    await axios.post("/v1/templates", template);

    setToastMessage({
      message: "등록 완료되었습니다.",
      isWarning: false,
    });

    navigate("/groups");
  };

  return <Template onSubmit={handleSubmit} groupId={location.state?.groupId} />;
}
