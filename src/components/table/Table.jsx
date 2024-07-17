import { FaRegTrashCan } from "react-icons/fa6";

import Button from "../ui/Button";
import Row from "./Row";

export default function Table() {
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
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
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </tbody>
      </table>
      <div className="flex flex-row-reverse mt-2">
        <Button
          text="Delete Templates"
          textColor="text-red"
          borderColor="border-red"
        >
          <FaRegTrashCan />
        </Button>
      </div>
    </div>
  );
}
