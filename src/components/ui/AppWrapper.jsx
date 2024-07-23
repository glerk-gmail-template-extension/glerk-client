import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAtom } from "jotai";

import App from "../../App";
import ToastMessage from "./ToastMessage";

import { toastMessageAtom, isLoggedInAtom } from "../../lib/atoms";

export default function AppWrapper() {
  const [toastMessage] = useAtom(toastMessageAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const location = useLocation();
  const isAuthPath = ["/signup", "/login"].some(
    (url) => url === location.pathname,
  );

  return (
    <div className="relative">
      {isAuthPath && <Outlet />}
      {!isAuthPath && (isLoggedIn ? <App /> : <Navigate to="/signup" />)}
      {toastMessage.message && (
        <ToastMessage
          message={toastMessage.message}
          isWarning={toastMessage.isWarning}
        />
      )}
    </div>
  );
}
