import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import Button from "../../components/ui/Button";
import Table from "../../components/table/Table";
import Group from "./Group";
import Header from "./Header";

const GROUP_LIST = ["group1", "group2", "group3"];

export default function Template() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (id) => {
    setSelectedGroup((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mx-auto mt-12 min-w-224 max-w-240">
      <Header />
      <div>
        <div>
          {GROUP_LIST.map((name, index) => (
            <Group
              key={name}
              name={name}
              isFirstGroup={index === 0}
              isLastGroup={index === GROUP_LIST.length - 1}
              isActive={selectedGroup === name}
              onSelect={() => handleGroupSelect(name)}
            >
              <Table />
            </Group>
          ))}
        </div>
        <div className="flex flex-row-reverse my-4">
          <Button
            text="New Template"
            textColor="text-primary"
            borderColor="border-primary"
          >
            <FiPlusCircle />
          </Button>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
