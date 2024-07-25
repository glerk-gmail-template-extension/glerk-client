import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

import Row from "./Row";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

export default function Table({ groupId, templates }) {
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([]);
  const allTemplateIds = templates.map((template) => template.id);
  const isAllSelected = selectedTemplateIds.length === templates.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTemplateIds(allTemplateIds);
    } else {
      setSelectedTemplateIds([]);
    }
  };

  const handleTemplateSelect = (id) => {
    setSelectedTemplateIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((templateId) => templateId !== id);
      }

      return [...prev, id];
    });
  };

  const navigate = useNavigate();
  const handleDeleteTemplatesClick = () => {
    navigate(`/groups/${groupId}/delete/templates`, {
      state: selectedTemplateIds,
    });

    setSelectedTemplateIds([]);
  };

  return (
    <div>
      {templates.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all checkboxes"
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Template name
              </th>
              <th scope="col" className="px-6 py-3">
                Created on
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <Row
                key={template.id}
                id={template.id}
                name={template.name}
                createdAt={template.createdAt}
                checked={selectedTemplateIds.includes(template.id)}
                onSelect={handleTemplateSelect}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState />
      )}
      <div className="flex flex-row-reverse mt-2">
        {selectedTemplateIds.length > 0 && (
          <Button
            text="템플릿 삭제"
            textColor="text-red"
            borderColor="border-red"
            onClick={handleDeleteTemplatesClick}
          >
            <FaRegTrashCan />
          </Button>
        )}
      </div>
    </div>
  );
}
