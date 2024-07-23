import { useSetAtom } from "jotai";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaCircleExclamation, FaCircleInfo } from "react-icons/fa6";

import { toastMessageAtom } from "../../lib/atoms";

export default function ToastMessage({ message, isWarning = true }) {
  const setToastMessage = useSetAtom(toastMessageAtom);

  const handleCloseClick = () => {
    setToastMessage({ message: null, isWarning: true });
  };

  return (
    <div
      id="toast-default"
      className={`fixed z-50 flex items-center w-full max-w-xs p-4 text-gray-500 transform -translate-x-1/2 rounded-lg shadow left-1/2 top-5 ${isWarning ? "bg-light-orange" : "bg-light-sky"}`}
      role="alert"
    >
      {isWarning ? (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 rounded-lg">
          <FaCircleExclamation />
          <span className="sr-only">Warning icon</span>
        </div>
      ) : (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-sky-500">
          <FaCircleInfo />
          <span className="sr-only">Info icon</span>
        </div>
      )}
      <div className="text-sm font-medium whitespace-pre-wrap ms-3">
        {message}
      </div>
      <button
        type="button"
        onClick={handleCloseClick}
        className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-white inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <HiOutlineXMark size={25} />
      </button>
    </div>
  );
}
