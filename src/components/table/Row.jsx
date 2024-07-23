import { Link } from "react-router-dom";

export default function Row({ id, name, createdAt, checked, onSelect }) {
  const createdOn = new Date(createdAt).toLocaleDateString();

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onSelect(id)}
            className="w-4 h-4"
          />
        </div>
      </td>
      <th scope="row" className="font-medium text-dark-gray">
        <Link to={`/templates/edit/${id}`}>
          <div className="px-6 py-4 truncate select-none">{name}</div>
        </Link>
      </th>
      <td>
        <div className="px-6 py-4 select-none">{createdOn}</div>
      </td>
    </tr>
  );
}
