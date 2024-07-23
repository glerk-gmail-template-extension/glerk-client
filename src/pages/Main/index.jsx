import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { FiPlusCircle } from "react-icons/fi";

import Group from "../Group/GroupItem";
import Header from "../Group/Header";
import Table from "../../components/table/Table";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";

import { groupsAsyncAtom } from "../../lib/atoms";

export default function Main() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupList, setGroupList] = useAtom(groupsAsyncAtom);

  useEffect(() => {
    setGroupList();
  }, []);

  const handleGroupSelect = (id) => {
    setSelectedGroup((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Header />
      <div>
        <div>
          {groupList.map((group, index) => (
            <Group
              key={group.id}
              id={group.id}
              name={group.name}
              isLastGroup={index === groupList.length - 1}
              isActive={selectedGroup === group.id}
              onGroupSelect={() => handleGroupSelect(group.id)}
              totalCount={group.templates.length}
            >
              <Table groupId={group.id} templates={group.templates} />
            </Group>
          ))}
          {groupList.length === 0 && <EmptyState />}
        </div>
        <div className="flex flex-row-reverse my-4">
          <Link to="/templates/new">
            <Button
              text="New Template"
              textColor="text-primary"
              borderColor="border-primary"
            >
              <FiPlusCircle />
            </Button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
