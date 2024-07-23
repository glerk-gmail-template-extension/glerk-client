import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { LuFolderPlus, LuFolderSearch } from "react-icons/lu";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/form/SearchInput";
import SelectBox from "../../components/form/SelectBox";

import { groupsAtom } from "../../lib/atoms";

export default function Header() {
  const [groups] = useAtom(groupsAtom);

  const groupOptions = [
    { id: 0, name: "All" },
    ...groups.map((group) => ({ id: group.id, name: group.name })),
  ];

  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex">
        <div className="inline-block w-40">
          <SelectBox defaultValue={groupOptions[0]?.id} options={groupOptions}>
            <LuFolderSearch />
          </SelectBox>
        </div>
        <div className="inline-block w-72">
          <SearchInput placeholder="Search Templates..." />
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
