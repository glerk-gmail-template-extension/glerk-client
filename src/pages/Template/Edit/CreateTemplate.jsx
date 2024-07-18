import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { LuFolder } from "react-icons/lu";

import Button from "../../../components/ui/Button";
import Input from "../../../components/form/Input";
import SelectBox from "../../../components/form/SelectBox";
import Editor from "../../../components/form/Editor";

const SELECT_OPTIONS = [
  { value: "1", text: "Group1" },
  { value: "2", text: "Group2" },
  { value: "3", text: "Group3" },
];

export default function CreateTemplate() {
  return (
    <>
      <header className="flex justify-between mb-10">
        <h1 className="text-2xl font-light tracking-tight font-roboto">
          New Template
        </h1>
        <div className="flex gap-2">
          <Link to="/templates">
            <Button text="Cancel">
              <FaRegCircleXmark />
            </Button>
          </Link>
          <Link to="/templates">
            <Button
              text="Save"
              textColor="text-white"
              backgroundColor="bg-primary"
              borderColor="border-primary"
              hoverBackgroundColor="hover:bg-dark-primary"
            >
              <FiPlusCircle />
            </Button>
          </Link>
        </div>
      </header>
      <form>
        <div className="flex justify-between mb-10">
          <div className="w-5/12">
            <Input label="Template Name" isRequired />
          </div>
          <div className="w-5/12">
            <Input label="Hashtag" isRequired />
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-5/12">
            <Input label="Subject" />
          </div>
          <div className="w-5/12">
            <div className="inline-block w-64">
              <SelectBox
                options={SELECT_OPTIONS}
                defaultValue={SELECT_OPTIONS[0].value}
              >
                <LuFolder />
              </SelectBox>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4">Body</h2>
          <Editor />
        </div>
      </form>
    </>
  );
}
