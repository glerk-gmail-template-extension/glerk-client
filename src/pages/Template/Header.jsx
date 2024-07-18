import { Link } from "react-router-dom";
import { LuFolderPlus, LuFolderSearch } from "react-icons/lu";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/form/SearchInput";
import SelectBox from "../../components/form/SelectBox";

const SELECT_OPTIONS = [
  { value: "all", text: "All" },
  { value: "1", text: "Group1" },
  { value: "2", text: "Group2" },
  { value: "3", text: "Group3" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex">
        <div className="inline-block w-40">
          <SelectBox
            defaultValue={SELECT_OPTIONS[0].value}
            options={SELECT_OPTIONS}
          >
            <LuFolderSearch />
          </SelectBox>
        </div>
        <div className="inline-block w-72">
          <SearchInput placeholder="Search Templates..." />
        </div>
      </div>
      <Link to="/templates/groups/new">
        <Button text="New Group">
          <LuFolderPlus />
        </Button>
      </Link>
    </header>
  );
}
