import { Link } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { LuFolderPlus, LuFolderSearch } from "react-icons/lu";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/form/SearchInput";
import SelectBox from "../../components/form/SelectBox";

import {
  groupsAsyncAtom,
  searchCriteriaAtom,
  groupOptionsAtom,
} from "../../lib/atoms";

export default function Header() {
  const [searchCriteria, setSearchCriteria] = useAtom(searchCriteriaAtom);
  const [groupOptions] = useAtom(groupOptionsAtom);
  const searchGroups = useSetAtom(groupsAsyncAtom);
  const allOptions = [{ id: 0, name: "All" }, ...groupOptions];

  const handleOptionSelect = (event) => {
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      groupId: Number(event.target.value),
    }));

    searchGroups();
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      searchGroups();
    }
  };

  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex">
        <div className="inline-block w-40">
          <SelectBox
            name="groupId"
            value={searchCriteria.groupId}
            options={allOptions}
            onChange={handleOptionSelect}
          >
            <LuFolderSearch />
          </SelectBox>
        </div>
        <div className="inline-block w-72">
          <SearchInput
            name="templateName"
            value={searchCriteria.templateName}
            onChange={(event) => {
              setSearchCriteria((prevCriteria) => ({
                ...prevCriteria,
                templateName: event.target.value,
              }));
            }}
            onKeyDown={handleEnterKeyDown}
            placeholder="Search Templates..."
          />
        </div>
      </div>
      <Link to="/groups/new">
        <Button text="New Group">
          <LuFolderPlus />
        </Button>
      </Link>
    </header>
  );
}
