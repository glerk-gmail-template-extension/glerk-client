import { Link } from "react-router-dom";
import { LuFolderPlus, LuFolderSearch } from "react-icons/lu";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/form/SearchInput";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex">
        <div className="flex p-1 mr-4 border rounded-lg border-stroke">
          <div className="self-center ml-2">
            <LuFolderSearch />
          </div>
          <select
            defaultValue="All"
            className="text-sm block w-36 p-2.5 outline-none"
          >
            <option value="All">All</option>
            <option value="Group1">Group1</option>
            <option value="Group2">Group2</option>
            <option value="Group3">Group3</option>
          </select>
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
