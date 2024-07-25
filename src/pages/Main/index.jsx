import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";

import Group from "../Group/GroupItem";
import Header from "../Group/Header";
import Table from "../../components/table/Table";
import EmptyState from "../../components/ui/EmptyState";

import { groupsAsyncAtom, groupOptionsAsyncAtom } from "../../lib/atoms";

export default function Main() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupOptions, fetchGroupOptions] = useAtom(groupOptionsAsyncAtom);
  const [groupList, fetchGroupList] = useAtom(groupsAsyncAtom);

  useEffect(() => {
    fetchGroupList();
    fetchGroupOptions();
  }, []);

  const handleGroupSelect = (id) => {
    setSelectedGroup((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Header groupOptions={groupOptions} />
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
      </div>
      <Outlet />
    </>
  );
}
