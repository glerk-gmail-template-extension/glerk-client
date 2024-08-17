import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { FiPlusCircle, FiArrowLeftCircle } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuFolder } from "react-icons/lu";

import useForm from "../../../hooks/useForm";

import Button from "../../../components/ui/Button";
import FormInput from "../../../components/form/FormInput";
import Editor from "../../../components/form/Editor";
import LabelSelectBox from "../../../components/form/LabelSelectBox";
import EmailListInput from "../../../components/form/EmailListInput";
import IconButton from "../../../components/ui/IconButton";
import VariableArea from "../../../components/editor/VariableArea";

import { validateTemplate } from "../../../api/validators";
import { groupOptionsAsyncAtom } from "../../../lib/atoms";

export default function Template({
  onSubmit,
  templateId,
  fetchInitialValues,
  groupId,
}) {
  const popoverRef = useRef(null);
  const variableButtonRef = useRef(null);
  const [showVariableArea, setShowVariableArea] = useState(false);
  const [groupOptions] = useAtom(groupOptionsAsyncAtom);
  const isUpdateForm = !!templateId;

  const { errors, touched, obSubmit, getFieldProps } = useForm({
    initialValues: {
      name: "",
      hashtag: "",
      subject: "",
      body: "",
      sender: "",
      recipients: [],
      ccList: [],
      bccList: [],
      labels: [],
      groupId: groupId || groupOptions[0]?.id,
    },
    validate: validateTemplate,
    onSubmit,
    fetchInitialValues,
  });

  const hashtagProps = getFieldProps("hashtag");

  const handleHashtagChange = (event) => {
    const { name, value } = event.target;

    if (value.startsWith("#")) {
      hashtagProps.onChange(event);
    } else {
      hashtagProps.onChange({
        target: {
          name,
          value: `#${value}`,
        },
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !showVariableArea ||
        !popoverRef.current ||
        !variableButtonRef.current
      ) {
        return;
      }

      if (
        !popoverRef.current.contains(event.target) &&
        !variableButtonRef.current.contains(event.target)
      ) {
        setShowVariableArea(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVariableArea]);

  const { onChange: handleSubjectChange, value: subject } =
    getFieldProps("subject");
  const subjectInputRef = useRef(null);

  const handleVariableAreaOpen = () => {
    setShowVariableArea(!showVariableArea);
  };

  const handleVariableAdd = (variable) => {
    const { selectionStart: start, selectionEnd: end } =
      subjectInputRef.current;

    if (variable.trim() !== "") {
      const customSubjectVar = `[{${variable.trim()}}]`;

      if (start === 0 && end === 0) {
        handleSubjectChange({
          target: {
            name: "subject",
            value: subject + customSubjectVar,
          },
        });
      } else {
        const newSubject =
          subject.substring(0, start) +
          customSubjectVar +
          subject.substring(end);

        handleSubjectChange({
          target: {
            name: "subject",
            value: newSubject,
          },
        });
      }
    }

    setShowVariableArea(false);
  };

  return (
    <>
      <header className="flex justify-end mb-4">
        {isUpdateForm && (
          <Link to={`/templates/edit/${templateId}/delete`}>
            <Button
              text="템플릿 삭제"
              textColor="text-red"
              borderColor="border-red"
            >
              <FaRegTrashCan />
            </Button>
          </Link>
        )}
      </header>
      <h2 className="mt-4 mb-8 text-2xl font-light tracking-tight font-roboto">
        Template
      </h2>
      <form onSubmit={obSubmit}>
        <div className="flex justify-between mb-4">
          <div className="w-5/12">
            <FormInput
              label="템플릿 이름"
              {...getFieldProps("name")}
              validationMessage={touched.name && errors.name}
              isRequired
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-5/12">
            <FormInput
              label="해시태그"
              name={hashtagProps.name}
              value={hashtagProps.value}
              onBlur={hashtagProps.onBlur}
              onChange={handleHashtagChange}
              validationMessage={touched.hashtag && errors.hashtag}
              isRequired
            />
          </div>
          <div className="w-5/12">
            <div className="inline-block w-64">
              <LabelSelectBox
                label="그룹"
                options={groupOptions}
                {...getFieldProps("groupId")}
                isRequired
              >
                <LuFolder />
              </LabelSelectBox>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="mt-10 mb-8 text-2xl font-light tracking-tight font-roboto">
          Mail
        </h2>
        <div className="flex w-10/12 mb-4">
          <FormInput
            ref={subjectInputRef}
            label="메일 제목"
            {...getFieldProps("subject")}
            validationMessage={touched.subject && errors.subject}
          />
          <div className="relative self-center">
            <div
              ref={variableButtonRef}
              className="inline-block ml-2 text-primary"
            >
              <IconButton tooltip="변수 추가" onClick={handleVariableAreaOpen}>
                <span className="select-none">{"{...}"}</span>
              </IconButton>
            </div>
            {showVariableArea && (
              <VariableArea
                ref={popoverRef}
                onVariableAdd={handleVariableAdd}
              />
            )}
          </div>
        </div>
        <div className="flex w-10/12 mb-8">
          <EmailListInput
            key="recipients"
            label="수신자 이메일"
            {...getFieldProps("recipients")}
          />
        </div>
        <div className="flex w-10/12 mb-8">
          <EmailListInput
            key="ccList"
            label="CC 이메일"
            {...getFieldProps("ccList")}
          />
        </div>
        <div className="flex w-10/12 mb-8">
          <EmailListInput
            key="bccList"
            label="BCC 이메일"
            {...getFieldProps("bccList")}
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-dark-gray">메일 본문</p>
          <Editor {...getFieldProps("body")} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Link to="/groups">
            <Button text="돌아가기">
              <FiArrowLeftCircle />
            </Button>
          </Link>
          <Button
            text={isUpdateForm ? "템플릿 수정" : "템플릿 저장"}
            textColor="text-white"
            backgroundColor={isUpdateForm ? "bg-yellow" : "bg-primary"}
            borderColor={isUpdateForm ? "border-yellow" : "border-primary"}
            hoverBackgroundColor={
              isUpdateForm ? "hover:bg-dark-yellow" : "hover:bg-dark-primary"
            }
            type="submit"
          >
            <FiPlusCircle />
          </Button>
        </div>
      </form>
    </>
  );
}
