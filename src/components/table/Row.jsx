import { Link } from "react-router-dom";

export default function Row() {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4" />
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
        <Link to="/templates/edit/1">Template name</Link>
      </th>

      <td className="px-6 py-4">2024. 07. 17.</td>
    </tr>
  );
}
