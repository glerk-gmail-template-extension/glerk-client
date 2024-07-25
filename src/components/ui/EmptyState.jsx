import { HiOutlineDocumentPlus, HiOutlineFolderPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function EmptyState({ groupId }) {
  const url = groupId ? "/templates/new" : "/groups/new";

  return (
    <Link to={url} state={{ groupId }}>
      <button className="w-full">
        <div className="flex flex-col items-center justify-center h-64 rounded-lg bg-gray-50 active:bg-gray-100">
          <div className="mb-4 text-gray-400">
            {groupId ? (
              <HiOutlineDocumentPlus size={60} />
            ) : (
              <HiOutlineFolderPlus size={60} />
            )}
          </div>
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            {groupId ? "템플릿이 아직 없습니다." : "그룹이 아직 없습니다."}
          </h3>
          <p className="text-sm text-gray-500">
            {groupId
              ? "새로운 템플릿을 추가해 보세요."
              : "새로운 그룹을 추가해 보세요."}
          </p>
        </div>
      </button>
    </Link>
  );
}
